// All prompts stay on this device. There are no answer forms or network calls.
export const truthCards = {
  sweet: {
    truth: [
      "What tiny thing do I do that makes your day better?",
      "Which ordinary moment with me would you happily live twice?",
      "When did you first catch yourself smiling because of me?",
      "What would our perfect, completely lazy Sunday look like?",
      "Which of my messages would you keep forever?",
      "What is one thing you want us to try together this year?",
      "What is your favourite way for me to show that I care?",
      "Which little habit of mine secretly makes you smile?",
      "What is one thing about us you hope never changes?",
      "Describe our next adventure in three words.",
    ],
    dare: [
      "Give me three compliments. None of them can be about my looks.",
      "Choose a song and ask me for one slow dance.",
      "Hold my hand and tell me one thing you are looking forward to with me.",
      "Draw a tiny portrait of me in thirty seconds. Artistic talent is optional.",
      "Recreate the expression you make when my name lights up your phone.",
      "Invent a ridiculously affectionate new pet name for me.",
      "Describe me as if you were introducing your favourite person to the world.",
      "Make up a two-line poem about us. Bad rhymes are very welcome.",
      "Give me a hug for as long as we both feel like staying there.",
      "Plan a tiny date for us using only things we already have at home.",
    ],
  },
  flirty: {
    truth: [
      "Which look of mine makes it hardest for you to concentrate?",
      "What is the cheekiest compliment you have wanted to give me?",
      "Would you rather I steal a kiss or surprise you with a very bold compliment?",
      "What was the exact moment I gave you butterflies?",
      "Which of my outfits would you choose for our next date?",
      "What is the most shamelessly flirty message you would send me right now?",
      "If you had to win me over again tonight, what would your opening line be?",
      "What is one thing I do without realising that you find irresistible?",
      "Would you rather I make the first move or leave you guessing with a smile?",
      "What is your idea of a perfect goodnight kiss?",
    ],
    dare: [
      "Lean a little closer and whisper your boldest compliment.",
      "Ask me for a kiss as if this were our very first date.",
      "Hold eye contact for fifteen seconds. The first to smile gives a compliment.",
      "Give me your most shameless pick-up line. Commit to the terrible delivery.",
      "Invite me to dance close for the chorus of a song we both like.",
      "Choose a pet name and say it in your most outrageously flirty voice.",
      "If we both fancy it, steal one gentle kiss. Then tell me what you like about me.",
      "Pretend we have just met. You have thirty seconds to charm me.",
      "Whisper one romantic thing you would usually be too shy to say.",
      "Give me a look that says “come here” without saying a word.",
    ],
  },
};

export const wavelengthQuestions = {
  sweet: [
    {
      question: "Our perfect evening starts with…",
      options: ["Dinner made together", "A walk with no destination"],
    },
    {
      question: "Our next tiny escape?",
      options: ["A cabin and a blanket", "A little hotel by the sea"],
    },
    {
      question: "The love note you would rather find?",
      options: ["A handwritten letter", "A surprise voice message"],
    },
    {
      question: "A free morning, just us. We choose…",
      options: ["Breakfast in bed", "A café and a long walk"],
    },
    {
      question: "Our kind of adventure?",
      options: ["Somewhere completely new", "Our favourite place, again"],
    },
    {
      question: "The photo we would frame?",
      options: ["A dressed-up portrait", "A laughing, blurry moment"],
    },
    {
      question: "A little surprise that wins?",
      options: ["Flowers for no reason", "Your favourite snack, remembered"],
    },
    {
      question: "A rainy day together needs…",
      options: ["A film and too many snacks", "Music and cooking together"],
    },
  ],
  flirty: [
    {
      question: "The move that gives more butterflies?",
      options: ["A whispered compliment", "A kiss out of nowhere"],
    },
    {
      question: "Our date-night dress code?",
      options: ["Dressed up to distract each other", "Cosy enough to stay in"],
    },
    {
      question: "Who makes the first move tonight?",
      options: ["Sajjad", "Golu"],
    },
    {
      question: "A better excuse to get closer?",
      options: ["One slow dance", "One blanket, two people"],
    },
    {
      question: "The cheekier message?",
      options: [
        "“I keep thinking about your smile.”",
        "“You. Me. A date. No excuses.”",
      ],
    },
    {
      question: "Which is harder to resist?",
      options: ["A confident “come here”", "A shy smile across the room"],
    },
    {
      question: "The kiss we would replay?",
      options: ["A first-date kiss", "A “missed you all day” kiss"],
    },
    {
      question: "The better kind of trouble?",
      options: ["Terrible pick-up lines", "A very long goodnight"],
    },
  ],
};

export const rouletteCards = {
  sweet: [
    {
      category: "A compliment",
      text: "Tell each other one thing you admire that you haven’t said out loud lately.",
    },
    {
      category: "A kiss",
      text: "Offer a little kiss on the forehead. A warm hug is a lovely swap.",
    },
    {
      category: "A dance",
      text: "Choose one song. Slow dance through the chorus, even if neither of us can dance.",
    },
    {
      category: "A whisper",
      text: "Whisper a favourite memory of us. Keep it just between the two of us.",
    },
    {
      category: "A moment",
      text: "Hold hands for a minute. No phones, no plans. Just being here together.",
    },
    {
      category: "A surprise",
      text: "Take turns planning a tiny surprise date. The budget is whatever we already have at home.",
    },
  ],
  flirty: [
    {
      category: "A compliment",
      text: "Say the compliment you usually keep in your head. This time, look me in the eye.",
    },
    {
      category: "A kiss",
      text: "If we both fancy it, share a kiss like it’s the end of our first date.",
    },
    {
      category: "A dance",
      text: "Pick our most romantic song and invite me a little closer for one slow dance.",
    },
    {
      category: "A whisper",
      text: "Lean in and whisper exactly what you find so distracting about me.",
    },
    {
      category: "A moment",
      text: "Fifteen seconds of eye contact. No talking. Smiling is almost certainly unavoidable.",
    },
    {
      category: "A surprise",
      text: "One minute to charm me all over again. Start with your cheekiest line and see where the laughter takes us.",
    },
  ],
};

export function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Finish every card before reshuffling; never repeat across a cycle boundary.
export function createDeck(items, random = Math.random) {
  if (!items.length) throw new Error("A deck needs at least one card.");
  let remaining = [];
  let previous;
  return () => {
    if (!remaining.length) {
      remaining = shuffle(items, random);
      if (remaining.length > 1 && remaining.at(-1) === previous) {
        [remaining[0], remaining[remaining.length - 1]] = [
          remaining.at(-1),
          remaining[0],
        ];
      }
    }
    previous = remaining.pop();
    return previous;
  };
}

export class MatchGame {
  constructor(questions) {
    if (!questions.length) throw new Error("A game needs questions.");
    this.questions = [...questions];
    this.index = 0;
    this.matches = 0;
    this.answered = 0;
    this.first = null;
    this.second = null;
    this.phase = "first";
  }
  get question() {
    return this.questions[this.index];
  }
  choose(index) {
    if (
      (this.phase !== "first" && this.phase !== "second") ||
      (index !== 0 && index !== 1)
    )
      return false;
    if (this.phase === "first") {
      this.first = index;
      this.phase = "handover";
    } else {
      this.second = index;
      this.answered++;
      if (this.first === this.second) this.matches++;
      this.phase = "result";
    }
    return true;
  }
  handover() {
    if (this.phase !== "handover") return false;
    this.phase = "second";
    return true;
  }
  next() {
    if (this.phase !== "result") return false;
    return this.advance();
  }
  skip() {
    if (this.phase === "complete" || this.phase === "result") return false;
    return this.advance();
  }
  advance() {
    this.index++;
    this.first = null;
    this.second = null;
    this.phase = this.index >= this.questions.length ? "complete" : "first";
    return true;
  }
}

// Sectors run clockwise from the top; the pointer lands at a sector's centre.
export function wheelTarget(previousRotation, index, count = 6) {
  const destination = (360 - (index + 0.5) * (360 / count)) % 360;
  const current = ((previousRotation % 360) + 360) % 360;
  return previousRotation + 1080 + ((destination - current + 360) % 360);
}
