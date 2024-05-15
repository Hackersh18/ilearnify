import React, { useState } from "react";
import { Link } from "react-router-dom";

function Questions() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      text: "What is your age?",
      options: [
        { id: 0, text: "10-15"},
        { id: 1, text: "15-20"},
        { id: 2, text: "<15"},
        { id: 3, text: ">20"},
      ],
    },
    {
      text: "Click what suits you most?",
      options: [
        { id: 0, text: "10+"},
        { id: 1, text: "UG"},
        { id: 2, text: "PG" },
        { id: 3, text: "Preparing for competitive exams"},
      ],
    },
    {
      text: "Click what suits you most?",
      options: [
        { id: 0, text: "Below Average"},
        { id: 1, text: "Average"},
        { id: 2, text: "More Than Average"},
        { id: 3, text: "Topper" },
      ],
    },
    {
      text: "Daily Hours of study?",
      options: [
        { id: 0, text: "<2", isCorrect: false },
        { id: 1, text: "2-5", isCorrect: true },
        { id: 2, text: "5-8", isCorrect: false },
        { id: 3, text: "8+", isCorrect: false },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = () => {
    // Increment the score

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="question">
      {/* 1. Header  */}
      <h1 className="text-white text-xl m-4">Questions To Tailor your content according to your competence</h1>

      {/* 2. Current Score  */}

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className=" flex flex-col gap-3 final-results m-auto w-[50%] h-auto mt-[64px] p-4 border-[16px] text-white shadow-lg">

          <button className=" bg-blue-400" onClick={() => restartGame()}>Reattempt</button>
         <Link to="/profile"> <button className=" bg-blue-400 w-full"  >MyProfile</button></Link>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card m-auto w-[80%] h-auto bg-blue-300 p-4 border-[16px] text-white shadow-lg">
          {/* Current Question  */}
          <h2 className="text-black">
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text text-black text-2xl">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul className="list-none">
            {questions[currentQuestion].options.map((option) => {
              return (
                <li className="mt-2 bg-blue-700 p-4 border-[3px] border-white text-lg"
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Questions;