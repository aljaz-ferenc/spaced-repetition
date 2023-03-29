import React, { useEffect, useState } from "react";
import { updateCard } from "../firebase/firebase";
import "./Card.css";

export default function Card({
  checkAnswer,
  card,
}) {
  const [shouldRotate, setShouldRotate] = useState(false);

  function handleShowAnswer() {
    setShouldRotate(true);
  }

  function handleRightAnswer() {
    let time;
    let newState;

    switch (card.state) {
      case 0:
        time = 86400000; //24 hours
        newState = card.state + 1;
        break;
      case 1:
        time = 259200000; //3 days
        newState = card.state + 1;
        break;
      case 2:
        time = 604800000; //7 days
        newState = card.state + 1;
        break;
      case 3:
        time = 1209600000; //14 days
        newState = card.state + 1;
        break;
      case 4:
        time = 3240000000; //30 days
        newState = card.state;
        break;
    }

    //shorter times for testing:

    // switch(card.state){
    //   case 0:
    //     time = 60000 //1 minute
    //     newState = card.state + 1
    //     break
    //   case 1:
    //     time = 120000 //2 minutes
    //     newState = card.state + 1
    //     break
    //   case 2:
    //     time = 240000 //4 minutes
    //     newState = card.state + 1
    //     break
    //   case 3:
    //     time = 480000 //8 minutes
    //     newState = card.state + 1
    //     break
    //   case 4:
    //     time = 1000000 //16 minutes
    //     newState = card.state
    //     break
    // }

    updateCard(card.id, newState, new Date().getTime() + time);
    setShouldRotate(false);
    checkAnswer(true);
  }

  function handleWrongAnswer() {
    updateCard(card.id, 0, 0);
    setShouldRotate(false);
    checkAnswer(false);
  }

  return (
    <>
      <div className={`card1 ${shouldRotate && "rotate"}`}>
        <div className="front">
          <div style={{ fontWeight: "bold" }}>Question:</div>
          <div>{card.question}</div>
        </div>
        <div className="back">
          <div style={{ fontWeight: "bold" }}>Answer:</div>
          <div>{card.answer}</div>
        </div>
      </div>
      {shouldRotate && (
        <div className="answer-result">
          <p>Did you answer correctly?</p>
          <div className="d-flex justify-content-center align-content-center">
            <button
              onClick={handleRightAnswer}
              className="btn btn-success mx-1"
              style={{ width: "10rem" }}
            >
              Yes
            </button>
            <button
              onClick={handleWrongAnswer}
              className="btn btn-danger mx-1"
              style={{ width: "10rem" }}
            >
              No
            </button>
          </div>
        </div>
      )}
      {shouldRotate || (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleShowAnswer}>
            Show Answer
          </button>
        </div>
      )}
    </>
  );
}
