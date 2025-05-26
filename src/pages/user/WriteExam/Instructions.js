import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      {/* Instructions Section - Takes available space but allows scrolling if needed */}
      <div className="flex-1 max-w-4xl mx-auto w-full overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Instructions
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>Exam must be completed in {examData.duration} seconds.</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>Exam will be submitted automatically after {examData.duration} seconds.</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>Once submitted, you cannot change your answers.</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>Do not refresh the page.</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>You can use the "Previous" and "Next" buttons to navigate between questions.</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>Total marks of the exam is {examData.totalMarks}.</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>Passing marks of the exam is {examData.passingMarks}.</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Buttons Section - Fixed at bottom */}
      <div className="flex-shrink-0 max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="w-full sm:w-auto px-8 py-3  text-white font-semibold rounded-lg min-w-[120px] primary-outlined-btn"
            onClick={() => navigate('/')}
          >
            CLOSE
          </button>
          
          <button
            className="w-full sm:w-auto px-8 py-3 font-semibold rounded-lg  min-w-[120px] primary-contained-btn"
            onClick={() => {
              startTimer();
              setView("questions");
            }}
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;