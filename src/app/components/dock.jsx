"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import useAnalytics from "../hooks/useAnalytics";
import { otherLocale } from "../dictionaries";

/**
 * Bottom dock. Replaces the old top navbar rather than coexisting with it:
 * two navigation surfaces for a four-destination site cost 146px of an
 * iPhone SE.
 *
 * The five decorative spans are siblings, never nested. An element carrying
 * backdrop-filter becomes a backdrop root, so a frost layer wrapping a lens
 * layer would clip the lens to the frost's own output.
 *
 * The indicator is a single element that slides and stretches between items
 * instead of each item painting its own hover background. That is what makes
 * the movement read as one piece of glass travelling along the bar. It does
 * not carry a backdrop-filter of its own: stacking glass on glass is exactly
 * what Apple's own guidance warns against, and it would refract the frost
 * layer's output rather than the page.
 */
export default function Dock({ l, lang }) {
  const { trackEvent } = useAnalytics();
  const target = otherLocale(lang);

  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [indicator, setIndicator] = useState(null);

  const shown = hovered === null ? active : hovered;

  const measure = useCallback(() => {
    const el = itemRefs.current[shown];
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [shown]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Labels change width when the font loads and when the language changes.
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  // Scroll spy. The margins collapse the viewport to a thin band across the
  // middle, so the section crossing that band is the one you are reading.
  useEffect(() => {
    const sections = l.nav
      .map((item, index) => {
        const id = item.path.split("#")[1];
        const node = id ? document.getElementById(id) : null;
        return node ? { node, index } : null;
      })
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const match = sections.find((section) => section.node === visible[0].target);
        if (match) setActive(match.index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(({ node }) => observer.observe(node));
    return () => observer.disconnect();
  }, [l]);

  return (
    <nav aria-label={l.a11y.mainNav} className="dock">
      <span aria-hidden="true" className="dock__layer dock__frost" />
      <span aria-hidden="true" className="dock__layer dock__lens" />
      <span aria-hidden="true" className="dock__layer dock__tint" />
      <span aria-hidden="true" className="dock__layer dock__rim" />
      <span aria-hidden="true" className="dock__layer dock__sheen" />

      <ul className="dock__items" ref={listRef} onMouseLeave={() => setHovered(null)}>
        {indicator && (
          <span
            aria-hidden="true"
            className="dock__indicator"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
            }}
          />
        )}

        {l.nav.map((item, index) => (
          <li key={item.path}>
            <a
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              href={`/${lang}${item.path.slice(1)}`}
              aria-current={active === index ? "true" : undefined}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              onClick={() => {
                setActive(index);
                trackEvent("navigation_click", { section: item.title, path: item.path });
              }}
              className={`dock__link focus-ring ${item.primary ? "dock__link--primary" : ""} ${
                active === index ? "is-active" : ""
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}

        <li aria-hidden="true" className="dock__divider" />

        <li>
          <Link
            href={`/${target}`}
            hrefLang={target}
            aria-label={l.a11y.switchLanguage}
            onClick={() => trackEvent("language_change", { from: lang, to: target })}
            className="dock__link dock__link--lang focus-ring"
          >
            {target.toUpperCase()}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
