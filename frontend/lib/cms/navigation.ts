import defaults from "./pageDefaults.json";

export function adminHref(href: string, isAdmin: boolean): string {
  if (!isAdmin) return href;
  const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (path === "/") return `/admin${href.slice(1)}`;
  if (Object.hasOwn(defaults, path.slice(1))) return `/admin${href}`;
  return href;
}
