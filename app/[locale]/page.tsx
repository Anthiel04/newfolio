import { useLocale } from "next-intl";
import { About } from "../../components/About/About";
import { Contact } from "../../components/Contact/Contact";
import { CityPlaceholder } from "../../components/Hero/components/CityPlaceholder";
import { Hero } from "../../components/Hero/Hero";
import { Stats } from "../../components/Misc/Stats";
import { Projects } from "../../components/Projects/Projects";
import HorizontalScroll from "../../components/Transitions/HorizontalScroll";
import { ShowcaseTransition } from "../../components/Transitions/ShowcaseTransition";
import { SlideText } from "../../components/Transitions/SlideText";
import { Carousel } from "../../components/ui/carousel";
import { slides } from "../../components/ui/data/slides";

export default function Home() {
  const locale = useLocale();
  return (
    <div>
      <HorizontalScroll key={locale}>
        <Hero />
        <About />
      </HorizontalScroll>
      <CityPlaceholder />

      <SlideText />
      <CityPlaceholder />
      <Projects />
      <CityPlaceholder />
      <section className="my-24">
        <Carousel slides={slides} />
      </section>
      <CityPlaceholder />
      <ShowcaseTransition />
      <CityPlaceholder />
      <Contact />
      <CityPlaceholder />
      <Stats />
      <CityPlaceholder />
    </div>
  );
}
