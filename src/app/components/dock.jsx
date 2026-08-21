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
 * The order of l.nav has to mirror the order of the sections in the page. If
 * it does not, the scroll spy walks backwards through the dock while the
 * reader is scrolling steadily forwards.
 */
export default function Dock({ l, lang }) {
  const { trackEvent } = useAnalytics();
  const target = otherLocale(lang);

  const dockRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const previousLeft = useRef(null);
  // While an anchor click is smooth-scrolling, every section between here and
  // the destination crosses the spy band. Without this the indicator stops at
  // each one on the way past.
  const navigatingTo = useRef(null);
  const navTimeout = useRef(null);

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [indicator, setIndicator] = useState(null);

  const shown = hovered === null ? active : hovered;

  const measure = useCallback(() => {
    const el = itemRefs.current[shown];
    if (!el) return;

    const left = el.offsetLeft;
    const previous = previousLeft.current;
    // The two edges are given different delays so the trailing one lags: the
    // pill stretches across the gap and contracts once it arrives, instead of
    // sliding rigidly and appearing to land on each item it passes.
    const dir = previous === null || left === previous ? "none" : left > previous ? "right" : "left";
    previousLeft.current = left;

    setIndicator({ left, width: el.offsetWidth, dir });
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

  useEffect(() => () => clearTimeout(navTimeout.current), []);

  // Switching language is a navigation, so this component remounts and its
  // labels change length. Without a starting value the width would jump.
  // The previous width is parked on the document element, which survives the
  // soft navigation, so the new instance can animate from it.
  useLayoutEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const root = document.documentElement;
    const previous = root.style.getPropertyValue("--dock-width");
    const natural = `${dock.offsetWidth}px`;

    if (previous && previous !== natural) {
      dock.style.width = previous;
      void dock.offsetWidth; // reflow, so the next assignment is a transition
      dock.style.width = natural;
      dock.addEventListener(
        "transitionend",
        () => {
          // Back to auto, so a late font load can still resize it.
          dock.style.width = "";
        },
        { once: true }
      );
    }

    root.style.setProperty("--dock-width", natural);
  }, [lang, l]);

  // Scroll spy. The margins collapse the viewport to a thin band across the
  // middle, so the section crossing that band is the one being read.
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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;

        const match = sections.find((section) => section.node === visible[0].target);
        if (!match) return;

        if (navigatingTo.current !== null) {
          // Ignore everything in transit; release once the destination lands.
          if (match.index === navigatingTo.current) navigatingTo.current = null;
          return;
        }

        setActive(match.index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(({ node }) => observer.observe(node));
    return () => observer.disconnect();
  }, [l]);

  const handleNavClick = (item, index) => {
    navigatingTo.current = index;
    clearTimeout(navTimeout.current);
    // Safety net: if the destination never crosses the band, because it is the
    // last section and too short to reach the middle, release anyway.
    navTimeout.current = setTimeout(() => {
      navigatingTo.current = null;
    }, 1400);

    setActive(index);
    trackEvent("navigation_click", { section: item.title, path: item.path });
  };

  return (
    <nav ref={dockRef} aria-label={l.a11y.mainNav} className="dock">
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
            data-dir={indicator.dir}
            style={{ left: `${indicator.left}px`, width: `${indicator.width}px` }}
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
              onClick={() => handleNavClick(item, index)}
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
