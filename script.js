"use strict";

// The existing site records our start at midnight UTC on 12 March 2025.
const togetherSince = Date.parse("2025-03-12T00:00:00Z");
const londonDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
function calendarParts(date) {
  return Object.fromEntries(
    londonDate.formatToParts(date).map((part) => [part.type, part.value]),
  );
}
function updateCounter() {
  const seconds = Math.max(0, Math.floor((Date.now() - togetherSince) / 1000));
  const values = {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
  for (const [id, value] of Object.entries(values)) {
    document.getElementById(id).textContent =
      id === "days" ? String(value) : String(value).padStart(2, "0");
  }
}
updateCounter();
setInterval(() => {
  if (!document.hidden) {
    updateCounter();
    refreshDailyContent();
  }
}, 1000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateCounter();
    refreshDailyContent();
  }
});

const letters = {
  main: {
    title: "My Golu,",
    label: "NO SPECIAL OCCASION. JUST LOVE.",
    paragraphs: [
      "I don’t need a date in the calendar to tell you this. I love you.",
      "My Golu. My Biscof. Two little names for the person who means so much to me.",
      "You walked into my life and quietly made everything better. You were there, and suddenly the ordinary things felt worth noticing.",
      "I love your softness. I love how you care. I love the way you make me feel like I am enough, exactly as I am, without pretending.",
      "Since 12 March 2025, we’ve been making a story of our own. The good morning messages. The late-night conversations. Laughing at absolutely nothing. Those are the things I want more of.",
      "So here is a little place you can come back to whenever you like. A reminder that you are loved on the quiet days too.",
      "Every year, every version, every ordinary day. I would choose you all over again.",
    ],
  },
  miss: {
    title: "A little closer,",
    label: "OPEN WHEN YOU MISS ME",
    paragraphs: [
      "My Golu, if I could step out of this screen and sit beside you, I would.",
      "Until then, imagine me holding your hand. No big speech. Just the two of us, with nowhere else we need to be.",
      "You are my favourite person to do absolutely nothing with. Even the quiet feels better with you in it.",
      "I’m looking forward to the next time I get to see your face. Until then, keep a little of my love with you.",
    ],
  },
  hard: {
    title: "Come as you are.",
    label: "OPEN WHEN IT’S BEEN A LONG DAY",
    paragraphs: [
      "My Golu, you don’t have to be cheerful for me. You don’t have to have the right words either.",
      "Take a breath. Unclench your shoulders. Leave a little of today outside the door.",
      "I love the tired you, the quiet you, the you who hasn’t quite figured it out yet. You don’t have to earn that by having a good day.",
      "If you want to talk, I want to listen. If you want quiet, we can have that too. I’m in your corner.",
    ],
  },
  smile: {
    title: "A serious confession.",
    label: "OPEN WHEN YOU NEED A SMILE",
    paragraphs: [
      "My Biscof, I made an entire website because apparently saying “I like you” wasn’t quite dramatic enough.",
      "For the record, I like you a ridiculous amount. Enough to write little notes and hide them behind buttons. There is no known cure.",
      "You are still my favourite notification, my favourite distraction, and the person I want to tell the most unimportant things to.",
      "If you’re smiling even a little, this page has done its job. If not, please imagine me looking very pleased with this terrible attempt at being charming.",
    ],
  },
  forever: {
    title: "Still you. Always you.",
    label: "ONE LAST THING",
    paragraphs: [
      "My Golu, there isn’t a clever surprise behind this one. Just the thing I wanted to say from the start.",
      "I love you. I love the life we are making in all those small moments between the big ones.",
      "There are so many ordinary days ahead of us. I hope we fill them with kindness, ridiculous laughter, and plenty of time for each other.",
      "Thank you for being you. That is already more than enough.",
    ],
  },
};
const dialog = document.getElementById("letter-dialog");
let letterTrigger = null;
function openLetter(key, trigger) {
  const letter = letters[key];
  if (!letter || dialog.open) return;
  letterTrigger = trigger;
  document.getElementById("letter-title").textContent = letter.title;
  document.getElementById("letter-eyebrow").textContent = letter.label;
  const content = document.getElementById("letter-content");
  content.replaceChildren(
    ...letter.paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    }),
  );
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("letter-open");
  document.getElementById("close-letter").focus({ preventScroll: true });
}
document.querySelectorAll("[data-letter]").forEach((button) => {
  button.addEventListener("click", () =>
    openLetter(button.dataset.letter, button),
  );
});
for (const id of ["close-letter", "fold-letter"]) {
  document.getElementById(id).addEventListener("click", () => dialog.close());
}
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("letter-open");
  letterTrigger?.focus({ preventScroll: true });
});

// Each photo works by touch, mouse, Enter, or Space.
document.querySelectorAll("[data-photo]").forEach((card, index) => {
  const front = card.querySelector(".photo-front");
  const back = card.querySelector(".photo-back");
  const initialLabel = card.getAttribute("aria-label");
  card.addEventListener("click", () => {
    const flipped = card.getAttribute("aria-pressed") !== "true";
    card.setAttribute("aria-pressed", String(flipped));
    front.setAttribute("aria-hidden", String(flipped));
    back.setAttribute("aria-hidden", String(!flipped));
    card.setAttribute(
      "aria-label",
      flipped
        ? `Photo ${index + 1}: ${back.querySelector(".photo-note").textContent} Turn back to the photo.`
        : initialLabel,
    );
  });
});

const notes = [
  "You are my favourite reason to look forward to tomorrow.",
  "I don’t need perfect days. I just want days with you.",
  "Your presence is my favourite kind of comfort.",
  "You make my world feel lighter just by being in it.",
  "I love your laugh. It changes my whole day.",
  "With you, even the quiet moments feel full.",
  "You have the kind of heart that makes people feel cared for.",
  "I love how you turn ordinary moments into memories.",
  "You are the person I want to tell the little things to.",
  "I feel lucky that I get to love you out loud.",
  "My favourite plans usually have you in them.",
  "Thank you for being you. That is already more than enough.",
  "Some days, happiness is just your name lighting up my phone.",
  "I’d pick our wonderfully ordinary moments, over and over.",
  "Being beside you is a very good place to be.",
  "You are my favourite thought on the way home.",
  "I love the way you care about the little things.",
  "There is a little of you in everything that makes me smile.",
  "I still get that feeling when I know I’m about to see you.",
  "Of all the people in the world, I’m so glad it was you.",
  "I want more late nights, more laughter, and more us.",
  "You make an ordinary Tuesday feel like something worth keeping.",
  "I love you in the small ways, all day long.",
  "The best part of a good day is getting to tell you about it.",
  "You make being myself feel easy.",
  "I hope you know how much your kindness stays with me.",
  "No special occasion. No grand reason. Just a little more love for you.",
  "I would do it all again, if it brought me back to you.",
  "There’s no one else I’d rather do absolutely nothing with.",
  "All those little moments with you add up to my favourite story.",
  "I love who you are, and I’m glad I get to keep knowing you.",
];
let currentDay = "";
let noteIndex = 0;
function refreshDailyContent() {
  const now = new Date();
  const parts = calendarParts(now);
  const key = `${parts.year}-${parts.month}-${parts.day}`;
  if (key === currentDay) return;
  currentDay = key;
  const today = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
  );
  noteIndex = Math.floor(today / 86400000) % notes.length;
  document.getElementById("daily-note").textContent = notes[noteIndex];
  document.getElementById("note-date").textContent =
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      timeZone: "Europe/London",
    }).format(now) + " · A new note every day";
  let anniversary = Date.UTC(Number(parts.year), 2, 12);
  if (anniversary < today)
    anniversary = Date.UTC(Number(parts.year) + 1, 2, 12);
  const daysUntil = Math.round((anniversary - today) / 86400000);
  document.getElementById("anniversary-note").textContent =
    daysUntil === 0
      ? "It’s our anniversary today. I’d choose you all over again."
      : `${daysUntil} ${daysUntil === 1 ? "day" : "days"} until our next anniversary. A lifetime of little moments to go.`;
}
refreshDailyContent();
document.getElementById("another-note").addEventListener("click", () => {
  noteIndex = (noteIndex + 1) % notes.length;
  document.getElementById("daily-note").textContent = notes[noteIndex];
  document.getElementById("note-status").textContent = notes[noteIndex];
});

const dateIdeas = [
  {
    id: "dinner",
    mood: "cosy",
    label: "JUST THE TWO OF US",
    title: "Dinner, made together.",
    description:
      "Pick a recipe neither of us has tried. Music on, phones away. Dessert is compulsory.",
  },
  {
    id: "film",
    mood: "cosy",
    label: "NOWHERE ELSE TO BE",
    title: "Our own little cinema.",
    description:
      "One film each, a blanket, and far too many snacks. The difficult part is agreeing which film goes first.",
  },
  {
    id: "breakfast",
    mood: "cosy",
    label: "A VERY SLOW MORNING",
    title: "Breakfast with no rush.",
    description:
      "Something warm to drink, something good to eat, and absolutely no reason to hurry.",
  },
  {
    id: "letters",
    mood: "cosy",
    label: "A KEEPSAKE FOR LATER",
    title: "Letters to future us.",
    description:
      "Write each other a little letter. Seal them, choose a day to open them, and leave future us something to smile about.",
  },
  {
    id: "walk",
    mood: "out",
    label: "TAKE THE LONG WAY",
    title: "A walk with no destination.",
    description:
      "Comfortable shoes, your hand in mine, and a stop for something sweet. Getting a little lost is part of the plan.",
  },
  {
    id: "sunset",
    mood: "out",
    label: "STAY A LITTLE LONGER",
    title: "Let’s catch the sunset.",
    description:
      "Find a quiet spot with a view. Bring a warm drink and watch the sky change together.",
  },
  {
    id: "bookshop",
    mood: "out",
    label: "SOMETHING CHOSEN BY YOU",
    title: "A bookshop afternoon.",
    description:
      "Pick a book for each other, then find a café and explain your choices. Judging by the cover is allowed.",
  },
  {
    id: "explore",
    mood: "out",
    label: "A TINY ADVENTURE",
    title: "Somewhere new, with you.",
    description:
      "Choose a neighbourhood we haven’t explored. Find a little café, take one photo, and make a new “remember when”.",
  },
];
const storageKey = "always-you-date-v1";
let selectedDate = dateIdeas[0];
let savedDateId = null;
let storageAvailable = true;
try {
  const saved = localStorage.getItem(storageKey);
  const idea = dateIdeas.find((item) => item.id === saved);
  if (idea) {
    savedDateId = idea.id;
    selectedDate = idea;
    document.querySelector(`input[name="mood"][value="${idea.mood}"]`).checked =
      true;
  }
} catch {
  storageAvailable = false;
}
const saveButton = document.getElementById("save-date");
const savedMessage = document.getElementById("saved-message");
function renderDate() {
  document.getElementById("date-kicker").textContent = selectedDate.label;
  document.getElementById("date-title").textContent = selectedDate.title;
  document.getElementById("date-description").textContent =
    selectedDate.description;
  const isSaved = savedDateId === selectedDate.id;
  saveButton.setAttribute("aria-pressed", String(isSaved));
  saveButton.querySelector("span").textContent = isSaved
    ? "Idea kept"
    : "Keep this idea";
  savedMessage.textContent = isSaved
    ? "Kept on this device for our next little date."
    : "A little idea for whenever we have time.";
  if (!storageAvailable)
    savedMessage.textContent =
      "Saving is unavailable here. You can still pick an idea together.";
}
function pickDate() {
  const mood = document.querySelector('input[name="mood"]:checked').value;
  const options = dateIdeas.filter(
    (idea) =>
      (mood === "surprise" || idea.mood === mood) &&
      idea.id !== selectedDate.id,
  );
  selectedDate = options[Math.floor(Math.random() * options.length)];
  renderDate();
}
document.getElementById("pick-date").addEventListener("click", pickDate);
document
  .querySelectorAll('input[name="mood"]')
  .forEach((input) => input.addEventListener("change", pickDate));
saveButton.addEventListener("click", () => {
  const nextId = savedDateId === selectedDate.id ? null : selectedDate.id;
  try {
    if (nextId) localStorage.setItem(storageKey, nextId);
    else localStorage.removeItem(storageKey);
    savedDateId = nextId;
    storageAvailable = true;
    renderDate();
    if (!nextId)
      savedMessage.textContent = "Idea removed. We can always pick another.";
  } catch {
    storageAvailable = false;
    savedMessage.textContent =
      "This browser couldn’t save the idea. Take a screenshot to keep it.";
  }
});
renderDate();

// A keyboard surprise also has a visible, touch-friendly equivalent in the footer.
let secretSequence = "";
document.addEventListener("keydown", (event) => {
  if (
    document.querySelector("dialog[open]") ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.key.length !== 1
  )
    return;
  if (event.target.matches('input, textarea, select, [contenteditable="true"]'))
    return;
  secretSequence = (secretSequence + event.key.toLowerCase()).slice(-4);
  if (secretSequence === "golu") {
    secretSequence = "";
    openLetter("forever", document.activeElement);
  }
});

const dreamDialog = document.getElementById("dream-dialog");
let dreamTrigger = null;
document.querySelectorAll("[data-dream]").forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.querySelector("img");
    const fullImage = document.getElementById("dream-full-image");
    fullImage.src = source.getAttribute("src");
    fullImage.alt = source.alt;
    document.getElementById("dream-title").textContent =
      button.querySelector(".dream-title").textContent;
    document.getElementById("dream-description").textContent =
      button.querySelector(".dream-caption").textContent;
    dreamTrigger = button;
    dreamDialog.showModal();
    dreamDialog.scrollTop = 0;
    document.body.classList.add("letter-open");
    document.getElementById("close-dream").focus({ preventScroll: true });
  });
});
document
  .getElementById("close-dream")
  .addEventListener("click", () => dreamDialog.close());
dreamDialog.addEventListener("click", (event) => {
  const bounds = dreamDialog.getBoundingClientRect();
  if (
    event.target === dreamDialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dreamDialog.close();
});
dreamDialog.addEventListener("close", () => {
  document.body.classList.remove("letter-open");
  dreamTrigger?.focus({ preventScroll: true });
});
