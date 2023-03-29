import React from "react";
import "./HowItWorks.css";
import spacedChart from "../assets/spaced-repetition-graph.jpg";

export default function HowItWorks() {
  return (
    <div className="how-it-works">
      <div>
        <h1>Spaced Repetition</h1>
      </div>
      <div>
        <h3>What is it?</h3>
        <p>
          Spaced repetition is a memory technique that involves reviewing and
          recalling information at optimal spacing intervals until the
          information is learned at a sufficient level. This technique helps
          your brain remember more information as it keeps the material fresh in
          your mind and forces you to use active recall. Spaced repetition can
          be applied to any form of education, from grade school math problems
          all the way up to graduate computer algorithms.
        </p>
      </div>
      <div>
        <h3>The Ebbinghaus forgetting curve</h3>
        <p>
          The Ebbinghaus forgetting curve is a graph that represents the way
          information is forgotten over time. This forgetting curve starts with
          near-perfect recall in the beginning, but as a person continues to
          forget the material, the curve flattens until the bottom line, where
          the person can’t remember anything at all about what was studied.
        </p>
        <p>
          Spaced repetition uses the Ebbinghaus forgetting curve to its
          advantage by recalling information at strategic times and not letting
          the curve reach the bottom. The method forces you to review the
          information before your brain has a chance to forget all information
          due to the forgetting curve.
        </p>
        <p>
          What’s important here, though, is that our memory becomes stronger
          when we revisit information after forgetting some of it: a concept
          called the “theory of disuse“. This means that not only do we avoid
          losing the information by using spaced repetition, but we also
          strengthen these memories by letting ourselves partially forget the
          information and then strengthening it again using recall. This is the
          reason why the curve is flattened more after every review.
        </p>
        <img src={spacedChart} alt="" />
      </div>
      <div>
        <h3>The Leitner System</h3>
        <p>
          In this method, flashcards are sorted into groups according to how
          well the learner knows each one in Leitner's learning box. The
          learners try to recall the solution written on a flashcard. If they
          succeed, they send the card to the next group. If they fail, they send
          it back to the first group. Each succeeding group has a longer period
          of time before the learner is required to revisit the cards.
        </p>
        <p>
          This app mimics the use of flashcards in different boxes and serves
          the cards in increasing intervals: 24 hours, 3 days, 7 days, 14 days,
          and 30 days. The card is returned to the first box if the user didn't
          memorize the answer. If the information was memorized, it is moved to
          the next box. If the information is still memorized after 30 days, it
          is considered to be stored in long-term memory and will be reviewed
          every 30 days indefinetly.
        </p>
        <p>
          All the user has to do is stay diligent in their learning and check
          the app at least once a day to see if any cards are ready to be
          reviewed. The app takes care of the everything else.
        </p>
      </div>
    </div>
  );
}
