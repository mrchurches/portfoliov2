import { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaFileDownload, FaLinkedin } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import useGTM from "../hooks/useGTM";

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

export default function Contact({ l, darkMode }) {
  const { trackEvent } = useGTM();
  const [showCopied, setShowCopied] = useState(false);

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
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable or denied. The address is visible as text
      // and the link still works, so there is nothing to recover from here.
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col gap-y-4 items-center lg:items-start relative"
    >
      <h2 className="text-xl">
        <strong>{l.contact.title}</strong>
      </h2>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start">
        {l.contact.social.map(({ link, icon }, i) => {
          const Icon = socialIcons[icon];
          const isEmail = icon === "BiLogoGmail";
          const label = isEmail ? link.replace("mailto:", "") : getContactType(icon);

          return (
            <li className="flex items-center gap-x-1.5" key={i}>
              <a
                href={link}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                onClick={() => handleContactClick(link, icon)}
                className="focus-ring flex items-center gap-x-1.5 text-sm hover:text-slate-100"
              >
                {Icon && <Icon size="1.25em" aria-hidden="true" />}
                <span>{label}</span>
              </a>

              {isEmail && (
                <button
                  type="button"
                  onClick={() => handleCopyEmail(link)}
                  aria-label={l.contact.copyLabel}
                  className="focus-ring p-1 text-slate-400 hover:text-slate-100"
                >
                  <MdContentCopy size="1em" aria-hidden="true" />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div role="status" aria-live="polite" className="sr-only">
        {showCopied ? l.contact.copiedLabel : ""}
      </div>

      {showCopied && (
        <div
          aria-hidden="true"
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs ${
            darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
          } transition-opacity duration-200`}
        >
          {l.contact.copiedLabel}
        </div>
      )}
    </section>
  );
}
