import Dock from "../components/dock";
import About from "../components/about";
import Skills from "../components/skills";
import Experience from "../components/experience";
import Education from "../components/education";
import Contact from "../components/contact";
import Projects from "../components/projects";
import { getDictionary } from "../dictionaries";

// Server Component. The language comes from the URL, so nothing here has to
// run on the client to decide what to render.
export default async function Home({ params }) {
  const { lang } = await params;
  const l = getDictionary(lang);

  return (
    <div className="flex justify-center pt-5 text-fg">
      <div className="flex w-10/12 lg:w-5/12 flex-col h-content gap-y-10">
        {/* Projects are the verifiable proof, so they come before the skill
            chips and the degrees rather than after them. The dock order has
            to keep mirroring this, or the scroll spy walks backwards. */}
        <main key={lang} className="page-enter flex flex-col gap-y-10">
          <About l={l} />
          <Contact l={l} />
          <Experience l={l} />
          <Projects l={l} />
          <Skills l={l} />
          <Education l={l} />
        </main>
        <Dock key={lang} l={l} lang={lang} />

        <footer id="footer">
          <p className="text-xs text-center italic py-4">
            {l.footer.content} {new Date().getFullYear()}.
          </p>
        </footer>
      </div>
    </div>
  );
}
