// import { Hero, Courses, Feedback, CTA, Footer } from "./components";
import Hero from "../components/LandingPageComponents/Hero";
import Courses from "../components/LandingPageComponents/Courses";
import Feedback from "../components/LandingPageComponents/Feedback";
// import Cta from "../components/LandingPageComponents/Cta";
import NewCta from "../components/LandingPageComponents/NewCta";
// import Testimoni from "../components/FeedBack/Testimoni";
function LandingPage() {
  return (
    <>
      <Hero />
      <Courses />
      <Feedback />
      {/*  <Testimoni /> */}
      <NewCta />
    </>
  );
}

export default LandingPage;
