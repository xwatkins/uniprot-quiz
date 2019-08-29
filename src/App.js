import React, { useState } from "react";
import questions from "./questions.json";
import {
  setup,
  getTicket
} from "ebi-25th-anniversary-uniprot-ticket-drawer-mapping";
import "./App.css";

const pins = new Map([
  ["sausage", 1],
  ["megasausage", 1],
  ["batman", 2],
  ["extravert", 3],
  ["introvert", 4],
  ["conscientious", 5],
  ["openness", 6],
  ["agreeableness", 7]
]);

setup({
  seed: "EBI 25 Anniversary",
  minDrawer: 1,
  maxDrawer: 7,
  minTicket: 10 ** 5,
  maxTicket: 10 ** 6
});

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

  const getQuizAnswer = () => {
    if (score.get("megasausage")) {
      return getTicket(pins.get("megasausage"));
    } else {
      const highScoreEntry = [...score.entries()].reduce((a, e) =>
        e[1] > a[1] ? e : a
      )[0];
      console.log(highScoreEntry);
      return getTicket(pins.get(highScoreEntry));
    }
  };

  const currentQuestion = questions[index];
  return (
    <div className="App">
      {index < questions.length ? (
        <div className="Question">
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
          <h2>{getQuizAnswer()}</h2>
          <button
            onClick={() => {
              window.print();
              reset();
            }}
            style={{
              margin: 0,
              padding: ".5rem",
              color: "#000000",
              background: "#ffffff",
              height: "3rem",
              fontFamily: "Monospace",
              fontSize: "2rem"
            }}
          >
            Print Ticket
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
