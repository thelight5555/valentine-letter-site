import {
  truthCards,
  wavelengthQuestions,
  rouletteCards,
  shuffle,
  createDeck,
  MatchGame,
  wheelTarget,
} from "./game-data.mjs";

const byId = (id) => document.getElementById(id);
let mood = "sweet";
let currentGame = "truth";
let lastKind = null;
let drawn = 0;
const decks = {};
for (const mode of ["sweet", "flirty"]) {
  for (const kind of ["truth", "dare"])
    decks[`${mode}-${kind}`] = createDeck(truthCards[mode][kind]);
}
function drawTruth(kind) {
  lastKind = kind;
  drawn++;
  byId("truth-kind").textContent =
    `${mood === "sweet" ? "SWEET" : "A LITTLE NAUGHTY"} / ${kind.toUpperCase()}`;
  byId("truth-prompt").textContent = decks[`${mood}-${kind}`]();
  byId("skip-truth").hidden = false;
  byId("truth-count").textContent =
    `${drawn} ${drawn === 1 ? "card" : "cards"} drawn. Your turn, then mine.`;
}
byId("choose-truth").addEventListener("click", () => drawTruth("truth"));
byId("choose-dare").addEventListener("click", () => drawTruth("dare"));
byId("skip-truth").addEventListener("click", () => drawTruth(lastKind));

let match;
function resetMatch() {
  match = new MatchGame(shuffle(wavelengthQuestions[mood]).slice(0, 5));
  renderMatch();
}
function renderMatch() {
  const phase = match.phase;
  const complete = phase === "complete";
  const picking = phase === "first" || phase === "second";
  byId("match-round").textContent = complete
    ? "THAT’S OUR FIVE"
    : `QUESTION ${match.index + 1} OF ${match.questions.length}`;
  byId("match-score").textContent =
    `${match.matches} ${match.matches === 1 ? "match" : "matches"} / ${match.answered} answered`;
  byId("match-turn").textContent = {
    first: "SAJJAD, YOU FIRST",
    handover: "NO PEEKING",
    second: "GOLU, YOUR TURN",
    result: "THE BIG REVEAL",
    complete: "OUR KIND OF CONNECTION",
  }[phase];
  byId("match-question").textContent =
    phase === "handover"
      ? "Over to my favourite person."
      : complete
        ? "A little more in tune."
        : match.question.question;
  byId("match-options").hidden = !picking;
  byId("match-handover").hidden = phase !== "handover";
  byId("match-reveal").hidden = phase !== "result";
  byId("match-finish").hidden = !complete;
  byId("match-skip").hidden = complete || phase === "result";
  // Remove previous answers and selection styling while passing the phone.
  for (const [index, id] of ["match-option-a", "match-option-b"].entries()) {
    byId(id).textContent = picking ? match.question.options[index] : "";
  }
  byId("match-first").textContent =
    phase === "result" ? match.question.options[match.first] : "";
  byId("match-second").textContent =
    phase === "result" ? match.question.options[match.second] : "";
  if (phase === "result") {
    byId("match-verdict").textContent =
      match.first === match.second
        ? "Same thought. Same little butterflies."
        : "Different answers. Twice as many date ideas.";
    byId("match-next").textContent =
      match.index === match.questions.length - 1
        ? "See our result"
        : "Next question";
  }
  if (complete) {
    byId("match-summary").textContent =
      match.answered === 0
        ? "All five skipped. No pressure. We can play whenever we fancy it."
        : `${match.matches} out of ${match.answered} answers matched. ${match.matches === match.answered ? "Apparently we do read each other’s minds." : "A little alike, a little different. Still my favourite combination."}`;
  }
}
function focusMatch() {
  const target = {
    first: "match-option-a",
    handover: "match-ready",
    second: "match-option-a",
    result: "match-next",
    complete: "match-replay",
  }[match.phase];
  byId(target).focus({ preventScroll: true });
}
["match-option-a", "match-option-b"].forEach((id, index) =>
  byId(id).addEventListener("click", () => {
    if (match.choose(index)) {
      renderMatch();
      focusMatch();
    }
  }),
);
byId("match-ready").addEventListener("click", () => {
  if (match.handover()) {
    renderMatch();
    focusMatch();
  }
});
byId("match-next").addEventListener("click", () => {
  if (match.next()) {
    renderMatch();
    focusMatch();
  }
});
byId("match-skip").addEventListener("click", () => {
  if (match.skip()) {
    renderMatch();
    focusMatch();
  }
});
["match-replay", "match-reset"].forEach((id) =>
  byId(id).addEventListener("click", () => {
    resetMatch();
    focusMatch();
  }),
);
resetMatch();

let rotation = 0;
let spinTimer = null;
let pendingSpin = null;
const spinDecks = {
  sweet: createDeck([0, 1, 2, 3, 4, 5]),
  flirty: createDeck([0, 1, 2, 3, 4, 5]),
};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function finishSpin() {
  if (pendingSpin === null) return;
  clearTimeout(spinTimer);
  spinTimer = null;
  const { index, mode } = pendingSpin;
  pendingSpin = null;
  const card = rouletteCards[mode][index];
  byId("roulette-category").textContent = card.category.toUpperCase();
  byId("roulette-result").textContent = card.text;
  byId("roulette-status").textContent =
    "Fancy something else? Spin again. No forfeits.";
  byId("spin-wheel").disabled = false;
  byId("spin-wheel").firstChild.textContent = "Spin again ";
}
function cancelSpin() {
  clearTimeout(spinTimer);
  spinTimer = null;
  pendingSpin = null;
  byId("spin-wheel").disabled = false;
  // Snap to the current target when leaving, so nothing completes off-screen.
  byId("romance-wheel").style.transition = "none";
}
byId("spin-wheel").addEventListener("click", () => {
  if (pendingSpin !== null) return;
  const index = spinDecks[mood]();
  pendingSpin = { index, mode: mood };
  rotation = wheelTarget(rotation, index);
  byId("romance-wheel").style.transition = reducedMotion.matches
    ? "none"
    : "transform 2.4s cubic-bezier(.12,.65,.18,1)";
  byId("romance-wheel").style.transform = `rotate(${rotation}deg)`;
  byId("spin-wheel").disabled = true;
  byId("roulette-category").textContent = "A LITTLE ANTICIPATION";
  byId("roulette-result").textContent =
    "Let’s see what the evening has in mind…";
  byId("roulette-status").textContent = "Choosing a little moment for us.";
  if (reducedMotion.matches) finishSpin();
  else spinTimer = setTimeout(finishSpin, 2450);
});
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) finishSpin();
});
function resetRoulette() {
  cancelSpin();
  byId("roulette-category").textContent = "YOUR NEXT LITTLE MOMENT";
  byId("roulette-result").textContent = "A small spin. A very good excuse.";
  byId("roulette-status").textContent =
    "Six ways to make an ordinary evening better.";
  byId("spin-wheel").firstChild.textContent = "Spin for us ";
}

document.querySelectorAll('input[name="game-mood"]').forEach((input) =>
  input.addEventListener("change", () => {
    mood = input.value;
    byId("flirty-gallery").hidden = mood !== "flirty";
    lastKind = null;
    drawn = 0;
    byId("truth-kind").textContent =
      mood === "sweet" ? "JUST BETWEEN US" : "A LITTLE NAUGHTY";
    byId("truth-prompt").textContent =
      mood === "sweet"
        ? "A truth to tell, or a dare to try?"
        : "A little bolder. A little closer. Truth or dare?";
    byId("skip-truth").hidden = true;
    byId("truth-count").textContent = "No scores. Just us.";
    byId("game-mood-description").textContent =
      mood === "sweet"
        ? "Soft questions, little gestures, and a bit of butterflies."
        : "Cheeky questions, whispered compliments, and first-date butterflies.";
    resetMatch();
    resetRoulette();
  }),
);
document.querySelectorAll('input[name="couple-game"]').forEach((input) =>
  input.addEventListener("change", () => {
    if (currentGame === "roulette" && pendingSpin !== null) resetRoulette();
    currentGame = input.value;
    for (const name of ["truth", "match", "roulette"])
      byId(`${name}-panel`).hidden = name !== currentGame;
  }),
);
