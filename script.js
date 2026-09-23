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
  sleep: {
    title: "Stay here a little.",
    label: "OPEN WHEN YOU CAN’T SLEEP",
    paragraphs: [
      "My Golu, I wish I could say this quietly beside you, with the lights off and the whole day finally behind us.",
      "We wouldn’t have to talk about anything important. I’d ask what you were thinking, and probably find a completely unnecessary reason to keep holding your hand.",
      "Whatever is still going round in your head can have a little less of you tonight. You don’t need to work everything out before morning.",
      "Imagine a blanket tucked around you and a kiss on your forehead. That’s what I’d leave here if a website could manage it.",
      "Goodnight, my Biscof. I hope tomorrow begins gently for you.",
    ],
  },
  doubt: {
    title: "Borrow my eyes for a minute.",
    label: "OPEN WHEN YOU DOUBT YOURSELF",
    paragraphs: [
      "My Golu, I know a letter won’t silence every unkind thought. But I want my voice in the room too.",
      "I see someone who cares. Someone whose kindness reaches further than she probably realises. You have given me so many reasons to feel glad you’re in my life.",
      "A mistake doesn’t take those things away. Neither does a day when you feel a bit lost, or a plan that didn’t work out.",
      "You don’t need to impress me today. Take the next small step when you’re ready. I’ll still be cheering for the person taking it.",
    ],
  },
  proud: {
    title: "Tell me everything.",
    label: "OPEN WHEN YOU’RE PROUD OF YOURSELF",
    paragraphs: [
      "My Biscof, I hope you’re opening this with that smile I like so much.",
      "Tell me what happened. The long version, please. I want the tiny details, the bit you nearly gave up on, and the moment you realised you’d done it.",
      "Please don’t make it smaller before you tell me. If it matters to you, I want to celebrate it with you.",
      "I’m already picturing a very pleased hug, something sweet to eat, and me finding at least three excuses to say I’m proud of you.",
      "Enjoy this one, Golu. You’re allowed to be delighted with yourself.",
    ],
  },
  hug: {
    title: "Come a little closer.",
    label: "OPEN WHEN YOU NEED A HUG",
    paragraphs: [
      "My Golu, this is a very poor substitute for having you in my arms. I’m sending it anyway.",
      "If we were together, I’d open my arms and let you decide whether you wanted to talk. No questions you had to answer first.",
      "Some days call for advice. Other days call for someone to sit beside you while you find your words. I want to learn which kind of day you’re having.",
      "Until I can give you the real thing, take this little reminder: you can ask me for comfort. You never have to dress it up as something more sensible.",
    ],
  },
  future: {
    title: "There’s room for us there.",
    label: "OPEN WHEN YOU THINK ABOUT OUR FUTURE",
    paragraphs: [
      "My Golu, of course I think about the big things. Lake Como. A question by the water. The possibility of standing beside you on our wedding day.",
      "But I think about the smaller things too. Two mugs in the kitchen. Deciding what to have for dinner. Looking up from an ordinary day and finding you there.",
      "I’d like a camping trip where we bring far too many snacks and discover which one of us is actually capable of putting up a tent. My confidence may exceed my ability.",
      "Those are hopes I love having with you. We can talk about them, change them, and make room for whatever matters to both of us.",
      "There is so much I still want to find out about you. That might be my favourite part of thinking about tomorrow.",
    ],
  },
  disagree: {
    title: "Let’s find our way back.",
    label: "OPEN WHEN WE’VE HAD A DISAGREEMENT",
    paragraphs: [
      "My Golu, if you’ve opened this because we’re a bit out of step, I don’t want a pretty letter to do the job of a proper conversation.",
      "I want to hear what upset you, even if it’s something I find difficult to hear. Your feelings deserve more than me rushing to explain myself.",
      "If I’ve hurt you, I want to understand it and take responsibility for my part. You don’t owe me an instant smile or a quick return to normal.",
      "We can take a little space if we need it, then come back and talk with care. I love you, and I want that to show in how I listen too.",
    ],
  },
  butterflies: {
    title: "You are very distracting.",
    label: "OPEN WHEN YOU WANT A LITTLE FLIRTING",
    paragraphs: [
      "My Biscof, I had every intention of writing something sensible here. Then I thought about your smile.",
      "There is a particular version of you looking at me that makes it quite difficult to remember what I was about to say. I suspect you know exactly what you’re doing.",
      "If you were here, I’d ask for one slow dance. Yes, even without an occasion. Especially without an occasion.",
      "Then I’d probably ask if I could kiss you, which was almost certainly my plan before I mentioned the dancing.",
      "Consider this a little warning: I’m looking forward to our next date an unreasonable amount.",
    ],
  },
  morning: {
    title: "Hello, my favourite person.",
    label: "OPEN WHEN YOU’VE JUST WOKEN UP",
    paragraphs: [
      "Good morning, Golu. Before your day fills up with everyone else’s messages, here’s a small one from me: I’m glad you’re in my life.",
      "I wish I could bring you something warm to drink and ask what you’re looking forward to today. Sleepy answers would be perfectly acceptable.",
      "I hope there’s a little moment today that belongs just to you. A song you love, something delicious, a reason to laugh when you weren’t expecting one.",
      "And if the day turns out to be ordinary, tell me about it anyway. I like knowing the little things that happened in your world.",
    ],
  },
  loved: {
    title: "Yes, you. Exactly you.",
    label: "OPEN WHEN YOU NEED TO HEAR I LOVE YOU",
    paragraphs: [
      "I love you, my Golu. There. No waiting until the last line.",
      "I love getting to know you beyond the lovely photographs and the dressed-up moments. Your opinions, your little expressions, the things you get excited enough to talk about for ages.",
      "You don’t have to be in a romantic mood to be loved. You can be tired, distracted, wearing your most comfortable clothes and wondering what’s for dinner.",
      "My Golu. My Biscof. I gave you those names because ordinary words didn’t quite feel like ours.",
      "Come back to this letter whenever you fancy hearing it again. I love you.",
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
  document.getElementById("sealed-letter").hidden = false;
  document.getElementById("opened-letter").hidden = true;
  dialog.classList.remove("unsealed");
  dialog.setAttribute("aria-labelledby", "sealed-title");
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("letter-open");
  document.getElementById("break-seal").focus({ preventScroll: true });
}
// Reveal the letter immediately; animation is decorative and never delays access.
document.getElementById("break-seal").addEventListener("click", () => {
  document.getElementById("sealed-letter").hidden = true;
  document.getElementById("opened-letter").hidden = false;
  dialog.setAttribute("aria-labelledby", "letter-title");
  dialog.classList.add("unsealed");
  dialog.scrollTop = 0;
  document.getElementById("close-letter").focus({ preventScroll: true });
});
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
// Use one native image dialog for memories and clearly labelled AI daydreams.
document
  .querySelectorAll("[data-dream], [data-memory], [data-flirty]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const isDream = button.hasAttribute("data-dream");
      const isFlirty = button.hasAttribute("data-flirty");
      const card = button.closest(
        isFlirty ? ".flirty-scene" : isDream ? ".dream-chapter" : ".memory",
      );
      const source = button.querySelector("img");
      const fullImage = document.getElementById("dream-full-image");
      fullImage.src = source.getAttribute("src");
      fullImage.alt = source.alt;
      // innerText preserves the spaces around line breaks in editorial headings.
      document.getElementById("dream-title").textContent = card
        .querySelector(
          isFlirty
            ? ".flirty-title"
            : isDream
              ? ".dream-title"
              : ".memory-title",
        )
        .innerText.replace(/\s+/g, " ");
      document.getElementById("dream-description").textContent = card
        .querySelector(
          isFlirty
            ? ".flirty-caption"
            : isDream
              ? ".dream-caption"
              : ".memory-note",
        )
        .innerText.replace(/\s+/g, " ");
      document.getElementById("image-label").textContent = isFlirty
        ? "A LITTLE CHEMISTRY · AI IMAGINED"
        : isDream
          ? "OUR SOMEDAY · AI IMAGINED"
          : "A PAGE FROM OUR STORY";
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
