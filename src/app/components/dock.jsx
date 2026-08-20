"use client";
import Link from "next/link";
import useAnalytics from "../hooks/useAnalytics";
import { otherLocale } from "../dictionaries";

/**
 * Bottom dock. Replaces the old top navbar rather than coexisting with it:
 * two navigation surfaces for a five-anchor site cost 146px of an iPhone SE.
 *
 * The five decorative spans are siblings, never nested. An element carrying
 * backdrop-filter becomes a backdrop root, so a frost layer wrapping a lens
 * layer would clip the lens to the frost's own output.
 */
export default function Dock({ l, lang }) {
  const { trackEvent } = useAnalytics();
  const target = otherLocale(lang);

  const handleNavClick = (item) => {
    trackEvent("navigation_click", { section: item.title, path: item.path });
  };

  return (
    <nav aria-label={l.a11y.mainNav} className="dock">
      <span aria-hidden="true" className="dock__layer dock__frost" />
      <span aria-hidden="true" className="dock__layer dock__lens" />
      <span aria-hidden="true" className="dock__layer dock__tint" />
      <span aria-hidden="true" className="dock__layer dock__rim" />
      <span aria-hidden="true" className="dock__layer dock__sheen" />

      <ul className="dock__items">
        {l.nav.map((item) => (
          <li key={item.path}>
            <a
              href={`/${lang}${item.path.slice(1)}`}
              onClick={() => handleNavClick(item)}
              className={`dock__link focus-ring ${item.primary ? "dock__link--primary" : ""}`}
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
            className="dock__link focus-ring"
          >
            {target.toUpperCase()}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
