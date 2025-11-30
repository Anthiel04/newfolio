import { useLocale } from "next-intl";
import { About } from "../../components/About/About";
import { Contact } from "../../components/Contact/Contact";
import { Hero } from "../../components/Hero/Hero";
import { Projects } from "../../components/Projects/Projects";
import { Stats } from "../../components/Stats";
import HorizontalScroll from "../../components/Transitions/HorizontalScroll";
import { ShowcaseTransition } from "../../components/Transitions/ShowcaseTransition";
import { SlideText } from "../../components/Transitions/SlideText";

export default function Home() {
  const locale = useLocale();
  return (
    <div>
      <HorizontalScroll key={locale}>
        <Hero />
        <About />
      </HorizontalScroll>
      <SlideText />
      <Projects />
      <ShowcaseTransition />
      <Contact />
      <Stats/>
    </div>
  );
}
