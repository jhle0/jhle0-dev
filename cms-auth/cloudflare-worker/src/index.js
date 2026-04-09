const COOKIE_NAME = "decap_oauth_state";
const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

function json(data, init = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init.headers,
    },
    ...init,
  });
}

function html(body, init = {}) {
  return new Response(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      ...init.headers,
    },
    ...init,
  });
}

function getCookie(request, name) {
  const cookie = request.headers.get("cookie");
  if (!cookie) return "";

  const target = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return target ? decodeURIComponent(target.split("=").slice(1).join("=")) : "";
}

function makeCookie(name, value, maxAgeSeconds = 600) {
  return [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
  ].join("; ");
}

function clearCookie(name) {
  return `${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function randomState() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function decodeState(value) {
  try {
    return JSON.parse(atob(value));
  } catch {
    return null;
  }
}

function encodeState(payload) {
  return btoa(JSON.stringify(payload));
}

function resolveTargetOrigin(env, rawSiteId) {
  const requested = String(rawSiteId || env.SITE_ORIGIN || "").trim();

  if (!requested) {
    throw new Error("site_id 값이 없어 CMS origin을 판별할 수 없습니다.");
  }

  const url = new URL(
    requested.startsWith("http://") || requested.startsWith("https://")
      ? requested
      : `https://${requested}`,
  );

  if (env.SITE_ORIGIN && url.origin !== env.SITE_ORIGIN) {
    throw new Error("허용되지 않은 site_id 입니다.");
  }

  return url.origin;
}

function popupResponse(status, payload, targetOrigin) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const escapedMessage = JSON.stringify(message);
  const escapedTargetOrigin = JSON.stringify(targetOrigin);

  return html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Decap CMS Authentication</title>
  </head>
  <body>
    <script>
      (function () {
        var targetOrigin = ${escapedTargetOrigin};
        var message = ${escapedMessage};

        function finish() {
          if (window.opener) {
            window.opener.postMessage(message, targetOrigin);
          }
          window.close();
        }

        function receiveMessage(event) {
          if (event.origin !== targetOrigin) return;
          finish();
          window.removeEventListener("message", receiveMessage, false);
        }

        if (window.opener) {
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", targetOrigin);
          setTimeout(finish, 250);
        }
      })();
    </script>
  </body>
</html>`);
}

async function handleAuth(request, env) {
  if (!env.GITHUB_CLIENT_ID) {
    return json({ error: "GITHUB_CLIENT_ID secret is missing." }, { status: 500 });
  }

  const url = new URL(request.url);
  const state = randomState();
  const targetOrigin = resolveTargetOrigin(env, url.searchParams.get("site_id"));
  const statePayload = {
    state,
    targetOrigin,
    provider: "github",
    createdAt: Date.now(),
  };

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
  authorizeUrl.searchParams.set("scope", env.GITHUB_SCOPE || "public_repo");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("allow_signup", "false");

  return new Response(null, {
    status: 302,
    headers: {
      location: authorizeUrl.toString(),
      "set-cookie": makeCookie(COOKIE_NAME, encodeState(statePayload)),
      "cache-control": "no-store",
    },
  });
}

async function exchangeCodeForToken(code, redirectUri, env) {
  const response = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "user-agent": "jhle0-dev-cms-auth-worker",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    const message = data.error_description || data.error || "GitHub token exchange failed.";
    throw new Error(message);
  }

  return data.access_token;
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const encodedState = getCookie(request, COOKIE_NAME);
  const savedState = decodeState(encodedState);
  const headers = { "set-cookie": clearCookie(COOKIE_NAME) };

  if (!code || !returnedState || !savedState) {
    return popupResponse(
      "error",
      { error: "missing_oauth_params", provider: "github" },
      env.SITE_ORIGIN || "https://jhle0.github.io",
    );
  }

  if (savedState.state !== returnedState) {
    return new Response(
      popupResponse(
        "error",
        { error: "invalid_state", provider: "github" },
        savedState.targetOrigin,
      ).body,
      {
        status: 400,
        headers,
      },
    );
  }

  try {
    const token = await exchangeCodeForToken(code, `${url.origin}/callback`, env);

    return new Response(
      popupResponse("success", { token, provider: "github" }, savedState.targetOrigin).body,
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    return new Response(
      popupResponse(
        "error",
        { error: error instanceof Error ? error.message : "oauth_failed", provider: "github" },
        savedState.targetOrigin,
      ).body,
      {
        status: 500,
        headers,
      },
    );
  }
}

function handleHealth() {
  return json({
    ok: true,
    service: "jhle0-dev-cms-auth",
    endpoints: ["/auth", "/callback", "/health"],
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/auth") {
        return await handleAuth(request, env);
      }

      if (url.pathname === "/callback") {
        return await handleCallback(request, env);
      }

      if (url.pathname === "/health") {
        return handleHealth();
      }

      return new Response("Not found", { status: 404 });
    } catch (error) {
      return json(
        {
          error: error instanceof Error ? error.message : "unexpected_error",
        },
        { status: 500 },
      );
    }
  },
};
