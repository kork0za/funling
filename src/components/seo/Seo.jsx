import { useEffect } from "react";
import { site } from "../../content/site";

function setOrCreateMeta(attrKey, attrValue, content) {
  const selector = attrKey === "name"
    ? `meta[name="${attrValue}"]`
    : `meta[property="${attrValue}"]`;

  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrKey, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} • ${site.name}` : site.name;
    const desc = description || site.description;

    const base = (site.baseUrl || "").replace(/\/$/, "");
    const url = base ? `${base}${path}` : path;

    document.title = fullTitle;
    setCanonical(url);

    setOrCreateMeta("name", "description", desc);

    setOrCreateMeta("property", "og:type", "website");
    setOrCreateMeta("property", "og:title", fullTitle);
    setOrCreateMeta("property", "og:description", desc);
    setOrCreateMeta("property", "og:url", url);

    setOrCreateMeta("name", "twitter:card", "summary_large_image");
    setOrCreateMeta("name", "twitter:title", fullTitle);
    setOrCreateMeta("name", "twitter:description", desc);
  }, [title, description, path]);

  return null;
}
