import React from 'react'
import CTAButton from "./Btn";
import Know_your_progress from "../Assets/Know_your_progress.png";
import Compare_with_others from "../Assets/Compare_with_others.png";
import Plan_your_lessons from "../Assets/Plan_your_lessons.png";
import HighlightText from './HighlightText';

const LearningLanguageSection = () => {
  return (
    <div>
        <div className="text-4xl font-semibold text-center my-10">
            Your swiss knife for
            <HighlightText text={"Learning Anything on your own pace."} />
            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
            Students take an initial assessment that identifies their learning style (visual, auditory, kinesthetic), interests (through quizzes and surveys), and academic goals (through grade level and desired subjects).
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
              <img
                src={Know_your_progress}
                alt=""
                className="object-contain  lg:-mr-32 "
              />
              <img
                src={Compare_with_others}
                alt=""
                className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
              />
              <img
                src={Plan_your_lessons}
                alt=""
                className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
              />
            </div>
          </div>

          <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>
    </div>
  )
}

export default LearningLanguageSection