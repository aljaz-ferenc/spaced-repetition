import React, { useEffect, useState } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { getCardsByDeck, getCardsToReview } from "../firebase/firebase";
import Card from "../components/Card";
import "./Review.css";

export default function Review() {
  const [cards, setCards] = useState([]);
  const [nextAvailableTime, setNextAvailableTime] = useState(null);
  const [deckIsEmpty, setDeckIsEmpty] = useState(false);
  const [deckWasReviewed, setDeckWasReviewed] = useState(false);
  const params = useParams("deck").deck;

  const filteredCards = useLoaderData().filter((card) => card.deck === params);
  useEffect(() => {
    setCards(filteredCards);
  }, []);

  function checkAnswer(wasCorrect) {
    if (wasCorrect) {
      setTimeout(() => {
        const newCards = cards.filter((card) => cards.indexOf(card) !== 0);
        setCards(newCards);
      }, 250);
    } else {
      let reviewAgain;
      reviewAgain = cards[0];
      setTimeout(() => {
        const newCards = cards.filter((card) => cards.indexOf(card) !== 0);
        setCards([...newCards, reviewAgain]);
      }, 250);
    }
  }

  useEffect(() => {
    if (cards.length === 0) {
      nextScheduled();
    }
  }, [cards]);

  function nextScheduled() {
    getCardsByDeck(params).then((cards) => {
      const times = cards.map((card) => card.reviewTime);
      if (times === []) {
        setDeckIsEmpty(true);
      } else {
        const nextTime = new Date(Math.min(...times));
        if (nextTime == "Invalid Date") {
          setNextAvailableTime(null);
        } else {
          setNextAvailableTime(
            `${nextTime.toDateString()} at ${String(
              nextTime.getHours()
            ).padStart(2, "0")}:${String(nextTime.getMinutes()).padStart(
              2,
              "0"
            )}`
          );
          setDeckIsEmpty(false);
        }
      }
    });
  }

  return (
    <div className="review">
      <h1 className="h1">{params.toUpperCase()}</h1>
      {cards.length === 0 && nextAvailableTime !== null && (
        <p className="h4 mt-5">
          No cards to review at the moment. Next review is scheduled on
          {` ${nextAvailableTime}`}.
        </p>
      )}
      {cards.length > 0 && (
        <Card
          card={cards[0]}
          cardsLength={cards.length}
          checkAnswer={checkAnswer}
        />
      )}
      {cards.length === 0 && !nextAvailableTime && (
        <p className="h4 mt-5">
          This deck is empty. Add new cards <Link to="/create-cards">here</Link>
          .
        </p>
      )}
      {deckIsEmpty && <p>Add cards to the deck.</p>}
    </div>
  );
}

export async function reviewLoader() {
  const cards = await getCardsToReview();
  return cards;
}
