import test from "node:test";
import assert from "node:assert/strict";
import {
  createDeck,
  MatchGame,
  wheelTarget,
  truthCards,
  wavelengthQuestions,
  rouletteCards,
} from "../game-data.mjs";

test("decks exhaust each cycle and avoid repeating at cycle boundaries", () => {
  const draw = createDeck([0, 1, 2, 3], () => 0);
  let previous;
  for (let cycle = 0; cycle < 10; cycle++) {
    const cards = Array.from({ length: 4 }, draw);
    assert.equal(new Set(cards).size, 4);
    assert.notEqual(cards[0], previous);
    previous = cards.at(-1);
  }
  assert.throws(() => createDeck([]));
  const single = createDeck(["one"]);
  assert.equal(single(), "one");
  assert.equal(single(), "one");
});

test("both moods supply full games and match the visible wheel order", () => {
  const categories = [
    "A compliment",
    "A kiss",
    "A dance",
    "A whisper",
    "A moment",
    "A surprise",
  ];
  for (const mood of ["sweet", "flirty"]) {
    for (const kind of ["truth", "dare"]) {
      assert.ok(truthCards[mood][kind].length >= 10);
      assert.equal(
        new Set(truthCards[mood][kind]).size,
        truthCards[mood][kind].length,
      );
    }
    assert.ok(wavelengthQuestions[mood].length >= 5);
    for (const question of wavelengthQuestions[mood]) {
      assert.equal(question.options.length, 2);
      assert.ok(question.question.length && question.options.every(Boolean));
    }
    assert.deepEqual(
      rouletteCards[mood].map((card) => card.category),
      categories,
    );
  }
});

test("answers require a handover and score only once", () => {
  const game = new MatchGame(wavelengthQuestions.sweet.slice(0, 5));
  assert.equal(game.choose(3), false);
  assert.equal(game.next(), false);
  assert.equal(game.handover(), false);
  assert.equal(game.choose(0), true);
  assert.equal(game.phase, "handover");
  assert.equal(game.choose(0), false);
  assert.equal(game.answered, 0);
  assert.equal(game.handover(), true);
  assert.equal(game.choose(0), true);
  assert.equal(game.matches, 1);
  assert.equal(game.answered, 1);
  assert.equal(game.choose(0), false);
  assert.equal(game.skip(), false);
  assert.equal(game.matches, 1);
  assert.equal(game.next(), true);
  assert.equal(game.phase, "first");
  assert.equal(game.first, null);
  assert.equal(game.second, null);
});

test("skips clear pending answers and do not inflate the final score", () => {
  const game = new MatchGame(wavelengthQuestions.sweet.slice(0, 5));
  game.choose(0);
  game.skip();
  assert.equal(game.first, null);
  game.choose(0);
  game.handover();
  game.choose(1);
  game.next();
  game.choose(1);
  game.handover();
  game.choose(1);
  game.next();
  game.skip();
  game.skip();
  assert.equal(game.phase, "complete");
  assert.equal(game.answered, 2);
  assert.equal(game.matches, 1);
  assert.equal(game.skip(), false);
  assert.equal(game.next(), false);
  assert.equal(game.choose(0), false);
});

test("all skipped and all matched games finish after five questions", () => {
  for (const skip of [true, false]) {
    const game = new MatchGame(wavelengthQuestions.flirty.slice(0, 5));
    for (let i = 0; i < 5; i++) {
      if (skip) game.skip();
      else {
        game.choose(1);
        game.handover();
        game.choose(1);
        game.next();
      }
    }
    assert.equal(game.phase, "complete");
    assert.equal(game.matches, skip ? 0 : 5);
    assert.equal(game.answered, skip ? 0 : 5);
  }
});

test("each spin makes three turns and lands on the chosen sector centre", () => {
  let rotation = 0;
  for (const index of [0, 5, 2, 3, 1, 4, 0, 5]) {
    const next = wheelTarget(rotation, index);
    assert.ok(next - rotation >= 1080);
    assert.ok(next - rotation < 1440);
    assert.equal((next + (index + 0.5) * 60) % 360, 0);
    rotation = next;
  }
});
