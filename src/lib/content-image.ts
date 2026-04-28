const EXTERNAL_IMAGE_PATTERN = /^(?:[a-z]+:)?\/\//i;

export const normalizeContentImagePath = (path: string) => {
  const trimmedPath = path.trim();
  if (!trimmedPath) return "";

  if (
    EXTERNAL_IMAGE_PATTERN.test(trimmedPath) ||
    trimmedPath.startsWith("/") ||
    trimmedPath.startsWith("data:")
  ) {
    return trimmedPath;
  }

  return `/${trimmedPath.replace(/^\.?\//, "")}`;
};
