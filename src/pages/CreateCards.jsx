import React, { useRef } from "react";
import "./CreateCards.css";
import {
  getCardsByDeck,
  getDecks,
  addDeck,
  deleteDeck,
  addCard,
  removeCard,
} from "../firebase/firebase";
import { useState, useEffect } from "react";
import trashIcon from "../assets/icons/trash.png";
import trashIconRed from "../assets/icons/trash-red.png";

export default function CreateCards() {
  const [decks, setDecks] = useState([]);
  const [deckIsShown, setDeckIsShown] = useState(false);
  const [cardsAreShown, setCardsAreShown] = useState(true);
  const [newDeckIsShown, setNewDeckIsShown] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState();
  const [cards, setCards] = useState([]);
  const [newDeck, setNewDeck] = useState("");
  const [addCardBtnIsShown, setAddCardBtnIsShown] = useState(true);
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [cardInputIsShown, setCardInputIsShown] = useState(false);

  useEffect(() => {
    getDecks().then((decks) => setDecks(decks));
  }, []);

  function handleShowDeckInput(e) {
    e.preventDefault();
    setDeckIsShown(true);
    setCardsAreShown(false);
    setNewDeckIsShown(false);
  }

  function handleShowCardInput(e) {
    e.preventDefault();
    setAddCardBtnIsShown(false);
    setCardInputIsShown(true);
  }

  function handleSelectDeck(e) {
    setSelectedDeck(e.target.value);
    setCardsAreShown(true);
  }

  useEffect(() => {
    if (
      !selectedDeck ||
      selectedDeck === "" ||
      selectedDeck === "Select a deck..."
    )
      return;
    getCardsByDeck(selectedDeck).then((cards) => setCards(cards));
  }, [selectedDeck]);

  function handleAddDeck(e) {
    e.preventDefault();
    if (decks.some((deck) => deck == newDeck)) {
      return;
    } else {
      getCardsByDeck(selectedDeck).then((cards) => setCards(cards));
      setCardsAreShown(false);
      setDeckIsShown(false);
      setNewDeckIsShown(true);
      addDeck(decks, newDeck);
      setDecks((prevDecks) => [...prevDecks, newDeck]);
    }
  }

  function handleDeleteDeck() {
    if (selectedDeck === "select") return;
    deleteDeck(decks, selectedDeck);
    const newDecks = decks.filter((deck) => deck !== selectedDeck);
    setDecks(newDecks);
    setSelectedDeck("select");
  }

  function handleSubmitCard(e) {
    e.preventDefault();
    if (!selectedDeck || questionInput === "" || answerInput === "") return;

    addCard(selectedDeck, questionInput, answerInput, 10).then(
      getCardsByDeck(selectedDeck).then((cards) => setCards(cards))
    );

    setAnswerInput("");
    setQuestionInput("");
    setCardInputIsShown(false);
    setAddCardBtnIsShown(true);
  }

  function handleAddDeckCancel(e) {
    e.preventDefault();
    setDeckIsShown(false);
    setCardsAreShown(true);
    setNewDeckIsShown(true);
    setNewDeck("");
  }

  async function handleRemoveCard(id) {
    removeCard(id);
    getCardsByDeck(selectedDeck).then((cards) => setCards(cards));
  }

  return (
    <div className="create-cards">
      {decks && newDeckIsShown && (
        <select
          className="form-select"
          onChange={handleSelectDeck}
          name="deck"
          id="deck"
        >
          <option value="select">Select a deck...</option>
          {decks.map((deck) => (
            <option key={deck} value={deck}>
              {deck}
            </option>
          ))}
        </select>
      )}
      <div className="new-deck">
        {selectedDeck !== "select" && !deckIsShown && (
          <div>
            <button className="btn btn-primary my-2" onClick={handleDeleteDeck}>
              Delete deck
            </button>
          </div>
        )}

        {newDeckIsShown && (
          <button
            className="btn btn-primary mt-2"
            onClick={handleShowDeckInput}
          >
            Create a new deck
          </button>
        )}

        <div onSubmit={handleSubmitCard} action="">
          {deckIsShown && (
            <form className="form-control">
              <label htmlFor="title">Deck:</label>
              <input
                className="mx-2"
                onChange={(e) => setNewDeck(e.target.value)}
                type="text"
              />
              <button className="btn btn-primary mx-2" onClick={handleAddDeck}>
                Add Deck
              </button>
              <button className="btn btn-primary" onClick={handleAddDeckCancel}>
                Cancel
              </button>
            </form>
          )}
          {selectedDeck != "select" &&
            addCardBtnIsShown &&
            selectedDeck &&
            newDeckIsShown && (
              <button
                className="btn btn-primary mt-4 mb-2"
                onClick={handleShowCardInput}
              >
                Add a card
              </button>
            )}
          {cardInputIsShown && selectedDeck !== "select" && (
            <div className="form-control container my-3">
              <div className="new-question">
                <label className="form-label" htmlFor="card-question">
                  Question
                </label>
                <input
                  className="form-control"
                  required
                  onChange={(e) => setQuestionInput(e.target.value)}
                  value={questionInput}
                  type="text"
                  name="card-question"
                  id="card-question"
                />
              </div>
              <div className="new-answer">
                <label className="form-label" htmlFor="card-answer">
                  Answer
                </label>
                <input
                  className="form-control"
                  required
                  onChange={(e) => setAnswerInput(e.target.value)}
                  value={answerInput}
                  type="text"
                  name="card-answer"
                  id="card-answer"
                />
              </div>
            </div>
          )}
          {selectedDeck != "select" && !addCardBtnIsShown && (
            <button className="btn btn-primary mb-2">Submit card</button>
          )}
          <div>
            {cards &&
              cardsAreShown &&
              cards.map((card, i) => (
                <div key={Math.random()} className="deck-card">
                  <div>{i + 1}</div>
                  <div>
                    <p>
                      <small>Question:</small> {card.question}
                    </p>
                    <p>
                      <small>Answer:</small> {card.answer}
                    </p>
                  </div>
                  <img
                    onClick={() => handleRemoveCard(card.id)}
                    className="trash-icon"
                    src={trashIconRed}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
