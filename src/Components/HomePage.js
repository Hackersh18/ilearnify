// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
// Component Imports
import CTAButton from "./Btn.js"
import Footer from "./Footer.js"
import TimelineSection from "./TimelineSection.js"
import LearningLanguageSection from "./LearningLanguageSection.js"
import InstructorSection from "./InstructorSection.js"
import ExploreMore from "./ExploreMore.js"
import HighlightText from "./HighlightText.js"

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-black">
        {/* Become a Instructor Button */}
        <Link to={"/course"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-black p-1 font-bold text-gray-400 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-black text-white">
              <p>Create your Course</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
    

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future with 
          <HighlightText text={"Curated Learning"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-black">
        ⛳  A mix of learning resources like articles, videos, interactive games, and simulations aligned with the student's interests and learning style <br/>
        ⛳ Difficulty levels and pacing adjust based on student performance. Students can master concepts before moving on.
        <br/>
        ⛳ Tracks progress towards academic goals with clear milestones and rewards for achievement.

        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={true} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>


    <ExploreMore/>

      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for {" "}
              <HighlightText text={"Personal development."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[20px] font-semibold">
              Learnify is a mobile app that creates personalized learning plans for students. It tailors content and resources to individual needs and goals, making learning more engaging and effective.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-grey-300 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home

