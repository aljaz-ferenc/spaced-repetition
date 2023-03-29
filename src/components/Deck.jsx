import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Deck.css";

export default function Deck({ title, cards }) {
  const [cardsInDeck, setCardsInDeck] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date().getTime();
    if (cards) {
      setCardsInDeck(cards);
    }
  }, [cards]);

  function handleSelectDeck() {
    navigate(`review/${title}`);
  }

  return (
    <div className="deck">
      <h3 className="deck__head">{title}</h3>
      <div className="deck__body">
        <p>Cards ready to review:</p>
        {cardsInDeck && <p className="h4">{cardsInDeck.length}</p>}
      </div>
      <div className="deck__footer">
        <button
          onClick={handleSelectDeck}
          style={{ width: "100%", height: "100%" }}
          className="btn btn-primary rounded-0"
        >
          Review
        </button>
      </div>
    </div>
  );
}
