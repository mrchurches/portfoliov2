import { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaFileDownload, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import useGTM from "../hooks/useGTM";

export default function Contact({l,darkMode}){
    const { trackEvent } = useGTM();
    const [showCopied, setShowCopied] = useState(false);

    const socialIcons = {
        FaLinkedin: FaLinkedin,
        IoLogoGithub: SiGithub,
        BiLogoGmail: BiLogoGmail,
        FaWhatsapp: FaWhatsapp,
        IoDocumentSharp: FaFileDownload,
    };

    const getContactType = (icon) => {
        const types = {
            FaLinkedin: "LinkedIn",
            IoLogoGithub: "GitHub",
            BiLogoGmail: "Email",
            FaWhatsapp: "WhatsApp",
            IoDocumentSharp: "CV"
        };
        return types[icon] || icon;
    };

    const handleContactClick = (link, icon) => {
        const contactType = getContactType(icon);

        trackEvent("contact_click", {
            contact_type: contactType,
            contact_link: link
        });

        if (icon === "BiLogoGmail") {
            const email = link.replace("mailto:", "");
            navigator.clipboard.writeText(email);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
            return;
        }
    };

    return (
        <section id="contact" className="flex flex-col wrap gap-y-4 items-center lg:items-start relative">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {l.contact.social.map(({ link, icon }, i) => {
            const Icon = socialIcons[icon];
            const isEmail = icon === "BiLogoGmail";

            return (
              <li className="flex gap-x-1 hover:text-slate-100 relative" key={i}>
                <a
                  href={isEmail ? "#" : link}
                  target={isEmail ? "_self" : "_blank"}
                  onClick={(e) => {
                    if (isEmail) {
                      e.preventDefault();
                    }
                    handleContactClick(link, icon);
                  }}
                  title={getContactType(icon)}
                >
                  {Icon && <Icon size="1.5em"/>}
                </a>
              </li>
            );
          })}
        </ul>
        {showCopied && (
          <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs ${
            darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
          } transition-opacity duration-200`}>
            Email copiado!
          </div>
        )}
      </section>
    );
}