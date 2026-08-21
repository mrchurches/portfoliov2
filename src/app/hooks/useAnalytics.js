"use client";
import { track } from "@vercel/analytics";

/**
 * Thin wrapper over Vercel Web Analytics custom events.
 *
 * Page views work on every plan. Custom events are a paid feature: on the
 * free plan track() is a no-op, so the call sites below stay correct and
 * start reporting the moment the project is upgraded.
 *
 * Property values must be string, number, boolean or null. Anything else is
 * dropped, so undefined is filtered out here rather than at each call site.
 */
export default function useAnalytics() {
  const trackEvent = (name, properties = {}) => {
    const clean = Object.fromEntries(
      Object.entries(properties).filter(([, value]) => value !== undefined && value !== null)
    );
    track(name, clean);
  };

  return { trackEvent };
}
