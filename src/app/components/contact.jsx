import { BiLogoGmail } from "react-icons/bi";
import { FaFileDownload, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

export default function Contact({l,darkMode}){
    // "contact": {
    //     "title": "Contacto",
    //     "social":[
    //         {"icon":"FaLinkedin","link":"https://www.linkedin.com/in/laureano-iglesias/"},
    //         {"icon":"IoLogoGithub","link":"https://github.com/mrchurches"},
    //         {"icon":"BiLogoGmail","link":"mailto:laureanoiglesias34@gmail.com"},
    //         {"icon":"FaWhatsapp","link":"https://api.whatsapp.com/send/?phone=5401125120795&text=Hola%20me%20interesa%20tu%20perfil!"},
    //         {"icon":"IoDocumentSharp","link":"https://docs.google.com/document/d/1GH7O1GYF3634YkAL4LiKTZPJcjdQaUoxNTGCOJoSVnU/edit?usp=sharing"}
    //     ]
    // },
    const socialIcons = {
        FaLinkedin: FaLinkedin,
        IoLogoGithub: SiGithub,
        BiLogoGmail: BiLogoGmail,
        FaWhatsapp: FaWhatsapp,
        IoDocumentSharp: FaFileDownload,
    };


    return (
        <section id="contact" className="flex flex-col wrap gap-y-4">
        {/* <h2 className="text-lg font-bold">{l.contact.title}</h2> */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {l.contact.social.map(({ link, icon }) => {
            const Icon = socialIcons[icon];
            return (
              <li className="flex gap-x-1 hover:text-slate-100">
                <a href={link} target="_blank">
                  {Icon && <Icon size="1.5em"/>}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    );
}