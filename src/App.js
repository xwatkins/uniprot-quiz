import React, { useEffect, useState } from "react";
import questions from "./questions.json";

import AquaporinImg from "./images/tarot cards/aquaporin.png";
import BatmanImg from "./images/tarot cards/batman.png";
import Brick1Img from "./images/tarot cards/brick1.png";
import FandangoImg from "./images/tarot cards/fandango.png";
import Glra1Img from "./images/tarot cards/glra1.png";
import rptorImg from "./images/tarot cards/rptor.png";
import SlitRoboImg from "./images/tarot cards/slit_robo.png";
import SorcinImg from "./images/tarot cards/sorcin.png";
import TimelessImg from "./images/tarot cards/timeless.png";
import TmmImg from "./images/tarot cards/tmm.png";
import TwitchinImg from "./images/tarot cards/twitchin.png";
import VngfImg from "./images/tarot cards/vngf.png";

import "./App.css";

const pins = new Map([
  ["sausage", [FandangoImg]],
  ["megasausage", [FandangoImg]],
  ["batman", [BatmanImg]],
  ["extravert", [TmmImg, TwitchinImg]],
  ["introvert", [AquaporinImg, Glra1Img]],
  ["conscientious", [Brick1Img, TimelessImg]],
  ["openness", [rptorImg, SlitRoboImg]],
  ["agreeableness", [SorcinImg, VngfImg]],
]);

// Hack to preload Answer images
const loadImages = () => {
  [
    AquaporinImg,
    BatmanImg,
    Brick1Img,
    FandangoImg,
    Glra1Img,
    rptorImg,
    SlitRoboImg,
    SorcinImg,
    TimelessImg,
    TmmImg,
    TwitchinImg,
    VngfImg,
  ].forEach((src) => {
    const image = new Image();
    image.src = src;
  });
};

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(new Map());

  const reset = () => {
    setIndex(0);
    setScore(new Map());
  };

  const submitAnswer = (answer) => {
    setIndex(index + 1);
    const scoreMap = new Map(score);
    scoreMap.set(answer, scoreMap.get(answer) ? scoreMap.get(answer) + 1 : 1);
    setScore(scoreMap);
  };

  const getQuizAnswer = () => {
    if (score.get("megasausage")) {
      return pins.get("megasausage")[0];
    } else {
      const highScoreEntry = [...score.entries()].reduce((a, e) =>
        e[1] > a[1] ? e : a
      )[0];
      const ticket = pins.get(highScoreEntry)[
        pins.get(highScoreEntry).length > 1 ? Math.round(Math.random()) : 0
      ];
      return <img src={ticket} alt="Your card"></img>;
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const currentQuestion = questions[index];
  return (
    <div className="App">
      <button
        onClick={() => {
          reset();
        }}
        className="reset-button"
      >
        Start again
      </button>
      {index < questions.length ? (
        <div className="Question">
          <h2>{currentQuestion.question}</h2>
          <ul>
            {currentQuestion.answers.map((answer) => (
              <li key={answer.type}>
                <button onClick={() => submitAnswer(answer.type)}>
                  {answer.answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div className="Answer">{getQuizAnswer()}</div>
        </div>
      )}
    </div>
  );
}

export default App;
