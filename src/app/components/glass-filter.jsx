/**
 * The SVG filter the dock's lensing layer references.
 *
 * Mounted once, in the layout, outside the dock's own tree. Three things here
 * are not negotiable:
 *
 * - position/width/height instead of display:none. Firefox does not build a
 *   frame for a display:none svg, which leaves the filter reference invalid
 *   (bugzilla 1887451).
 * - colorInterpolationFilters="sRGB". Without it the displacement map is read
 *   in linearRGB and the warp comes out wrong.
 * - One mount only. The id is global to the document.
 *
 * feTurbulence gives a uniform warp, not a true edge lens. Real lensing needs
 * a generated displacement map, a canvas and a ResizeObserver, for fidelity
 * that only Chromium can show at all.
 */
export default function GlassFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id="dock-refraction"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
