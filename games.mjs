import {
  truthCards,
  wavelengthQuestions,
  rouletteCards,
  shuffle,
  createDeck,
  MatchGame,
  wheelTarget,
  minuteCards,
  MinuteTimer,
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
    `${mood === "sweet" ? "SWEET" : "AFTER DARK · 18+"} / ${kind.toUpperCase()}`;
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

const minuteDeck = createDeck(minuteCards);
const minuteTimer = new MinuteTimer();
let minuteInterval = null;
function renderMinute() {
  const seconds = Math.ceil(minuteTimer.remaining(performance.now()) / 1000);
  byId("minute-clock").textContent =
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  if (seconds === 0 && minuteTimer.running) {
    minuteTimer.pause(performance.now());
    clearInterval(minuteInterval);
    minuteInterval = null;
    byId("minute-status").textContent =
      "Our minute is up. Stay close, or choose another card.";
  }
  byId("minute-start").textContent = minuteTimer.running
    ? "Pause our minute"
    : seconds === 0
      ? "Start again"
      : seconds < 60
        ? "Continue our minute"
        : "Start our minute";
}
function pauseMinute(message) {
  const wasRunning = minuteTimer.running;
  minuteTimer.pause(performance.now());
  clearInterval(minuteInterval);
  minuteInterval = null;
  renderMinute();
  if (wasRunning && message) byId("minute-status").textContent = message;
}
function resetMinute(newCard = false) {
  clearInterval(minuteInterval);
  minuteInterval = null;
  minuteTimer.reset();
  if (newCard) {
    const card = minuteDeck();
    byId("minute-title").textContent = card.title.toUpperCase();
    byId("minute-prompt").textContent = card.text;
  }
  byId("minute-status").textContent =
    "No points. No pressure. Just a little time for us.";
  renderMinute();
}
byId("minute-start").addEventListener("click", () => {
  if (mood !== "flirty" || currentGame !== "minute") return;
  if (minuteTimer.running) {
    pauseMinute("Paused. Continue whenever you both feel ready.");
    return;
  }
  if (minuteTimer.remaining(performance.now()) === 0) minuteTimer.reset();
  minuteTimer.start(performance.now());
  byId("minute-status").textContent =
    "Your minute starts now. You can pause or skip at any time.";
  minuteInterval = setInterval(renderMinute, 200);
  renderMinute();
});
byId("minute-reset").addEventListener("click", () => resetMinute());
byId("minute-skip").addEventListener("click", () => resetMinute(true));
document.addEventListener("visibilitychange", () => {
  if (document.hidden)
    pauseMinute("Paused while you were away. Continue when you’re ready.");
});
resetMinute(true);

function selectGame(name) {
  if (name === "minute" && mood !== "flirty") name = "truth";
  if (currentGame === "roulette" && pendingSpin !== null) resetRoulette();
  if (currentGame === "minute")
    pauseMinute("Paused while you choose another game.");
  currentGame = name;
  for (const game of ["truth", "match", "roulette", "minute"])
    byId(`${game}-panel`).hidden = game !== name;
  document.querySelector(`input[name="couple-game"][value="${name}"]`).checked =
    true;
}
function applyMood(nextMood) {
  mood = nextMood;
  const adult = mood === "flirty";
  document.querySelector(`input[name="game-mood"][value="${mood}"]`).checked =
    true;
  byId("games-shell").dataset.mood = mood;
  byId("flirty-gallery").hidden = !adult;
  byId("after-dark-banner").hidden = !adult;
  byId("minute-game-choice").hidden = !adult;
  if (!adult && currentGame === "minute") selectGame("truth");
  resetMinute(true);
  lastKind = null;
  drawn = 0;
  byId("truth-kind").textContent = adult
    ? "AFTER DARK · 18+"
    : "JUST BETWEEN US";
  byId("truth-prompt").textContent = adult
    ? "A little bolder. A little closer. Truth or dare?"
    : "A truth to tell, or a dare to try?";
  byId("skip-truth").hidden = true;
  byId("truth-count").textContent = "No scores. Just us.";
  byId("game-mood-description").textContent = adult
    ? "For adults: bolder flirting, shared moments and romantic daydreams."
    : "Soft questions, little gestures, and a bit of butterflies.";
  resetMatch();
  resetRoulette();
}
const adultDialog = byId("adult-dialog");
document.querySelectorAll('input[name="game-mood"]').forEach((input) =>
  input.addEventListener("change", () => {
    if (input.value === "flirty") {
      document.querySelector('input[name="game-mood"][value="sweet"]').checked =
        true;
      byId("adult-entry").reset();
      adultDialog.showModal();
      document.body.classList.add("adult-open");
      byId("adult-confirm").focus();
    } else applyMood("sweet");
  }),
);
byId("adult-entry").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!byId("adult-confirm").checked) return;
  applyMood("flirty");
  adultDialog.close();
});
byId("adult-cancel").addEventListener("click", () => adultDialog.close());
adultDialog.addEventListener("close", () => {
  document.body.classList.remove("adult-open");
  document
    .querySelector(`input[name="game-mood"][value="${mood}"]`)
    .focus({ preventScroll: true });
});
byId("leave-after-dark").addEventListener("click", () => {
  applyMood("sweet");
  document.querySelector('input[name="game-mood"][value="sweet"]').focus();
});
document
  .querySelectorAll('input[name="couple-game"]')
  .forEach((input) =>
    input.addEventListener("change", () => selectGame(input.value)),
  );
// Match the initial UI even when a browser restores radio values after reload.
applyMood("sweet");
selectGame("truth");
