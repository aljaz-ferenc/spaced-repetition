import React from "react";
import { getAllCards, getDecks } from "../firebase/firebase";
import Deck from "../components/Deck";
import "./Home.css";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const decks = useLoaderData()[0];
  const cards = useLoaderData()[1];

  return (
    <div className="home">
      <h2 className="h1 my-3">Hello, User1234!</h2>
      <h3 className="h2 my-5">What would you like to review?</h3>
      <div className="decks mt-5">
        {decks &&
          decks.map((deck) => (
            <Deck
              cards={cards.filter(
                (card) =>
                  (card.deck === deck) &
                  (card.reviewTime < new Date().getTime())
              )}
              title={deck}
              key={deck}
            />
          ))}
      </div>
    </div>
  );
}

//loader function
export async function homeLoader() {
  const [decks, cards] = await Promise.all([getDecks(), getAllCards()]);
  return [decks, cards];
}
