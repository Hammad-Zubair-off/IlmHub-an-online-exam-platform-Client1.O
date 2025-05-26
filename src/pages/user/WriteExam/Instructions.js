import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-3xl mx-auto p-2 sm:p-4">
      <div className="w-full bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl text-center font-semibold underline mb-4">Instructions</h1>
        <ul className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Exam must be completed in {examData.duration} seconds.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Exam will be submitted automatically after {examData.duration} seconds.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Once submitted, you cannot change your answers.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Do not refresh the page.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>You can use the <span className="font-bold">"Previous"</span> and <span className="font-bold">"Next"</span> buttons to navigate between questions.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Total marks of the exam is <span className="font-bold">{examData.totalMarks}</span>.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Passing marks of the exam is <span className="font-bold">{examData.passingMarks}</span>.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-row sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 w-full justify-center">
        <button 
          className="primary-outlined-btn px-6 sm:px-8 py-2"
          onClick={() => navigate('/')}
        >
          CLOSE
        </button>
        <button
          className="primary-contained-btn px-6 sm:px-8 py-2"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default Instructions;