(function () {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slugify(value) {
    return String(value ?? "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function formatDate(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  }

  function normalizeTags(rawTags) {
    if (!rawTags || !rawTags.toJS) return [];
    return rawTags
      .toJS()
      .map((tag) => String(tag || "").trim())
      .filter(Boolean);
  }

  function notionPreviewShell({ eyebrow, title, description, meta, hero, body }) {
    const h = window.h;

    return h("article", { className: "preview-doc" }, [
      h("header", { className: "preview-header", key: "header" }, [
        eyebrow
          ? h("p", { className: "preview-eyebrow", key: "eyebrow" }, eyebrow)
          : null,
        h("h1", { className: "preview-title", key: "title" }, title || "제목 없음"),
        description
          ? h("p", { className: "preview-description", key: "description" }, description)
          : null,
        meta?.length
          ? h(
              "ul",
              { className: "preview-meta", key: "meta" },
              meta.map((item, index) =>
                h("li", { className: "preview-meta-item", key: `${item}-${index}` }, item),
              ),
            )
          : null,
        hero
          ? h("img", {
              className: "preview-hero",
              key: "hero",
              src: hero.toString(),
              alt: title || "preview image",
            })
          : null,
      ]),
      h("section", { className: "preview-body", key: "body" }, body),
    ]);
  }

  window.initializeJhle0Cms = function initializeJhle0Cms() {
    if (!window.CMS) return;

    const CMS = window.CMS;
    const createClass = window.createClass;
    const h = window.h;

    const BlogPreview = createClass({
      render: function render() {
        const entry = this.props.entry;
        const title = entry.getIn(["data", "title"]);
        const description = entry.getIn(["data", "description"]);
        const pubDate = entry.getIn(["data", "pubDate"]);
        const updatedDate = entry.getIn(["data", "updatedDate"]);
        const featured = entry.getIn(["data", "featured"]);
        const series = entry.getIn(["data", "series"]);
        const tags = normalizeTags(entry.getIn(["data", "tags"]));
        const heroImage = entry.getIn(["data", "heroImage"]);
        const heroAsset = heroImage ? this.props.getAsset(heroImage) : null;
        const meta = [pubDate, updatedDate ? `updated ${updatedDate}` : "", series, featured ? "featured" : ""]
          .filter(Boolean)
          .concat(tags.map((tag) => `#${tag}`));

        return notionPreviewShell({
          eyebrow: "Blog Post Preview",
          title,
          description,
          meta,
          hero: heroAsset,
          body: this.props.widgetFor("body"),
        });
      },
    });

    const ProjectPreview = createClass({
      render: function render() {
        const entry = this.props.entry;
        const title = entry.getIn(["data", "title"]);
        const description = entry.getIn(["data", "description"]);
        const pubDate = entry.getIn(["data", "pubDate"]);
        const updatedDate = entry.getIn(["data", "updatedDate"]);
        const status = entry.getIn(["data", "status"]);
        const tags = normalizeTags(entry.getIn(["data", "tags"]));
        const heroImage = entry.getIn(["data", "heroImage"]);
        const heroAsset = heroImage ? this.props.getAsset(heroImage) : null;
        const meta = [pubDate, updatedDate ? `updated ${updatedDate}` : "", status]
          .filter(Boolean)
          .concat(tags.map((tag) => `#${tag}`));

        return notionPreviewShell({
          eyebrow: "Project Preview",
          title,
          description,
          meta,
          hero: heroAsset,
          body: this.props.widgetFor("body"),
        });
      },
    });

    CMS.registerPreviewTemplate("blog", BlogPreview);
    CMS.registerPreviewTemplate("projects", ProjectPreview);

    CMS.registerEventListener({
      name: "preSave",
      handler: ({ entry }) => {
        const data = entry.get("data");
        const nextSlug = !data.get("slug") ? slugify(data.get("title")) : "";
        const today = formatDate(new Date());

        return data.withMutations((draft) => {
          if (!draft.get("pubDate")) {
            draft.set("pubDate", today);
          }

          if (nextSlug) {
            draft.set("slug", nextSlug);
          }

          if (!draft.get("updatedDate")) {
            draft.set("updatedDate", today);
          }
        });
      },
    });

    CMS.registerEditorComponent({
      id: "math-block",
      label: "Math Block",
      fields: [
        { name: "formula", label: "수식", widget: "text" },
      ],
      pattern: /^\$\$\s*([\s\S]*?)\s*\$\$$/m,
      fromBlock(match) {
        return {
          formula: (match[1] || "").trim(),
        };
      },
      toBlock(data) {
        return `$$\n${data.formula || ""}\n$$`;
      },
      toPreview(data) {
        return `<pre class="preview-math-block">${escapeHtml(data.formula || "")}</pre>`;
      },
    });

    CMS.registerEditorComponent({
      id: "toggle",
      label: "Toggle",
      fields: [
        { name: "summary", label: "제목", widget: "string" },
        { name: "contents", label: "내용", widget: "markdown" },
      ],
      pattern: /^<details><summary>(.*?)<\/summary>\s*([\s\S]*?)\s*<\/details>$/ms,
      fromBlock(match) {
        return {
          summary: match[1],
          contents: (match[2] || "").trim(),
        };
      },
      toBlock(data) {
        return `<details><summary>${data.summary || ""}</summary>\n\n${data.contents || ""}\n\n</details>`;
      },
      toPreview(data) {
        return `<details><summary>${escapeHtml(data.summary || "")}</summary>${data.contents || ""}</details>`;
      },
    });

    CMS.registerEditorComponent({
      id: "callout",
      label: "Callout",
      fields: [
        { name: "title", label: "제목", widget: "string" },
        { name: "contents", label: "내용", widget: "markdown" },
      ],
      pattern:
        /^<blockquote class="notion-callout">\s*<p><strong>(.*?)<\/strong><\/p>\s*([\s\S]*?)\s*<\/blockquote>$/ms,
      fromBlock(match) {
        return {
          title: match[1],
          contents: (match[2] || "").trim(),
        };
      },
      toBlock(data) {
        return `<blockquote class="notion-callout">\n<p><strong>${data.title || "메모"}</strong></p>\n${data.contents || ""}\n</blockquote>`;
      },
      toPreview(data) {
        return `<blockquote class="notion-callout"><p><strong>${escapeHtml(
          data.title || "메모",
        )}</strong></p>${data.contents || ""}</blockquote>`;
      },
    });

    CMS.registerEditorComponent({
      id: "figure",
      label: "Figure",
      fields: [
        { name: "src", label: "이미지", widget: "image" },
        { name: "alt", label: "대체 텍스트", widget: "string", required: false },
        { name: "caption", label: "캡션", widget: "string", required: false },
      ],
      pattern:
        /^<figure>\s*<img src="(.*?)" alt="(.*?)"\s*\/>\s*(?:<figcaption>(.*?)<\/figcaption>)?\s*<\/figure>$/ms,
      fromBlock(match) {
        return {
          src: match[1],
          alt: match[2],
          caption: match[3] || "",
        };
      },
      toBlock(data) {
        const caption = data.caption ? `\n<figcaption>${data.caption}</figcaption>` : "";
        return `<figure>\n<img src="${data.src || ""}" alt="${data.alt || ""}" />${caption}\n</figure>`;
      },
      toPreview(data) {
        const caption = data.caption
          ? `<figcaption>${escapeHtml(data.caption)}</figcaption>`
          : "";
        return `<figure><img src="${data.src || ""}" alt="${escapeHtml(
          data.alt || "",
        )}" />${caption}</figure>`;
      },
    });
  };
})();
