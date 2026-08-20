"use client";
import { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaFileDownload, FaLinkedin } from "react-icons/fa";
import { MdCheck, MdContentCopy } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import useAnalytics from "../hooks/useAnalytics";

const socialIcons = {
  FaLinkedin: FaLinkedin,
  IoLogoGithub: SiGithub,
  BiLogoGmail: BiLogoGmail,
  IoDocumentSharp: FaFileDownload,
};

// Stable English identifiers: these are analytics values, not UI copy.
const contactTypes = {
  FaLinkedin: "LinkedIn",
  IoLogoGithub: "GitHub",
  BiLogoGmail: "Email",
  IoDocumentSharp: "CV",
};

export default function Contact({ l }) {
  const { trackEvent } = useAnalytics();
  const [copied, setCopied] = useState(false);

  const getContactType = (icon) => contactTypes[icon] || icon;

  const handleContactClick = (link, icon) => {
    trackEvent("contact_click", {
      contact_type: getContactType(icon),
      contact_link: link,
    });
  };

  const handleCopyEmail = async (link) => {
    const email = link.replace("mailto:", "");

    trackEvent("contact_copy", { contact_type: "Email", contact_link: link });

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be unavailable or denied. The address is visible as text
      // and the link still works, so there is nothing to recover from here.
    }
  };

  return (
    <section id="contact" className="flex flex-col gap-y-4 items-center lg:items-start">
      <h2 className="text-xl">
        <strong>{l.contact.title}</strong>
      </h2>

      <ul className="flex flex-wrap gap-x-5 gap-y-3 justify-center lg:justify-start">
        {l.contact.social.map(({ link, icon }, i) => {
          const Icon = socialIcons[icon];
          const isEmail = icon === "BiLogoGmail";
          const label = isEmail ? link.replace("mailto:", "") : getContactType(icon);

          return (
            <li
              key={i}
              className={isEmail && copied ? "contact__item is-copied" : "contact__item"}
            >
              {/* Glass capsule that lights up over the whole item, icon
                  included, instead of a coloured box floating above it. */}
              {isEmail && <span aria-hidden="true" className="contact__glass" />}

              <a
                href={link}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                onClick={() => handleContactClick(link, icon)}
                className="focus-ring flex items-center gap-x-1.5 text-sm hover:text-fg-strong relative"
              >
                {Icon && <Icon size="1.25em" aria-hidden="true" />}
                <span>{label}</span>
              </a>

              {isEmail && (
                <button
                  type="button"
                  onClick={() => handleCopyEmail(link)}
                  aria-label={copied ? l.contact.copiedLabel : l.contact.copyLabel}
                  className="focus-ring p-1 text-fg-muted hover:text-fg-strong relative"
                >
                  {copied ? (
                    <MdCheck size="1em" aria-hidden="true" />
                  ) : (
                    <MdContentCopy size="1em" aria-hidden="true" />
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div role="status" aria-live="polite" className="sr-only">
        {copied ? l.contact.copiedLabel : ""}
      </div>
    </section>
  );
}
