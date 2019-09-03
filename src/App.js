import React, { useState } from "react";
import questions from "./questions.json";
import {
  setup,
  getTicket
} from "ebi-25th-anniversary-uniprot-ticket-drawer-mapping";
import Axios from "axios";
import "./App.css";

const pins = new Map([
  ["sausage", [1]],
  ["megasausage", [1]],
  ["batman", [2]],
  ["extravert", [3, 4]],
  ["introvert", [5, 6]],
  ["conscientious", [7, 8]],
  ["openness", [9, 10]],
  ["agreeableness", [11, 12]]
]);

export const baseUrl = "http://192.168.4.1:8000";

setup({
  seed: "EBI 25 Anniversary",
  minDrawer: 1,
  maxDrawer: 12,
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
      return getTicket(pins.get("megasausage")[0]);
    } else {
      const highScoreEntry = [...score.entries()].reduce((a, e) =>
        e[1] > a[1] ? e : a
      )[0];
      console.log(
        highScoreEntry,
        pins.get(highScoreEntry)[Math.round(Math.random())]
      );
      const ticket = getTicket(
        pins.get(highScoreEntry)[Math.round(Math.random())]
      );
      try {
        Axios.get(`${baseUrl}/print/${ticket}`);
      } catch (e) {
        console.log(e);
      }
      // Make request here to printer with ticket number
      return ticket;
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
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
