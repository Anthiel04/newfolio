import { useLocale } from "next-intl";
import { About } from "../../components/About/About";
import { Contact } from "../../components/Contact/Contact";
import { Hero } from "../../components/Hero/Hero";
import { Projects } from "../../components/Projects/Projects";
import HorizontalScroll from "../../components/Transitions/HorizontalScroll";

export default function Home() {
  const locale = useLocale()
  return (
    <div>
      <HorizontalScroll key={locale}>
        <Hero />
        <About />
      </HorizontalScroll>
      <Projects />
      <Contact />
    </div>
  );
}
