import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

const BASE_URL = "https://schuttingvancomposiet.nl";

const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (noindex) setMeta("robots", "noindex, nofollow");

    // OpenGraph
    setMeta("og:title", ogTitle || title, true);
    setMeta("og:description", ogDescription || description, true);
    setMeta("og:type", ogType, true);
    if (ogImage) setMeta("og:image", ogImage, true);
    if (canonical) setMeta("og:url", canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`, true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ogTitle || title);
    setMeta("twitter:description", ogDescription || description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      const href = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    }

    return () => {
      // Cleanup canonical on unmount
      const el = document.querySelector('link[rel="canonical"]');
      if (el) el.remove();
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, noindex]);

  return null;
};

export default SEOHead;
