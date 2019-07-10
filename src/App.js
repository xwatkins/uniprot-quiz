import React, { useState } from "react";
import questions from "./questions.json";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(new Map());

  const reset = () => {
    setIndex(0);
    setScore(new Map());
  };

  const submitAnswer = answer => {
    setIndex(index + 1);
    const scoreMap = new Map(score);
    scoreMap.set(answer, scoreMap.get(answer) ? scoreMap.get(answer) + 1 : 1);
    setScore(scoreMap);
  };

  const getQuizAnswer = () =>
    [...score.entries()].reduce((a, e) => (e[1] > a[1] ? e : a))[0];

  const currentQuestion = questions[index];
  return (
    <div className="App">
      {index < questions.length ? (
        <div>
          <h2>{currentQuestion.question}</h2>
          <ul>
            {currentQuestion.answers.map(answer => (
              <li key={answer.type} onClick={() => submitAnswer(answer.type)}>
                {answer.answer}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h4>You are {getQuizAnswer()}</h4>
          <button onClick={() => reset()}>Start Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;
