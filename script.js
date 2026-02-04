// Grab elements
const envelopeScreen = document.getElementById('envelope-screen');
const envelope = document.getElementById('envelope');
const letterScreen = document.getElementById('letter-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const finalMessage = document.getElementById('final-message');

// Secret elements
const secretHeart = document.getElementById('secret-heart');
const secretModal = document.getElementById('secret-modal');
const closeSecret = document.getElementById('close-secret');
const scavengerHearts = document.querySelectorAll('.scavenger-heart');

// Floating photos around the letter card
// Each photo has a data-message attribute with a unique love note. When a photo is clicked,
// the modal text is updated with the corresponding message and the modal is shown.
const floatingPhotos = document.querySelectorAll('.floating-photo');
if (floatingPhotos && floatingPhotos.length > 0) {
  floatingPhotos.forEach((photo) => {
    photo.addEventListener('click', () => {
      const message = photo.getAttribute('data-message');
      if (secretModal) {
        const contentParagraph = secretModal.querySelector('p');
        if (message && contentParagraph) {
          contentParagraph.textContent = message;
        }
      }
      showSecret();
    });
  });
}

// Track found scavenger hearts
let foundHearts = 0;
const totalHearts = scavengerHearts ? scavengerHearts.length : 0;

// Messages for the No button when it dodges
const noMessages = [
  'Are you sure?',
  'You might mean Yes!',
  'Nice try!',
  'I think you meant "Yes"'
];
let noIndex = 0;

// Countdown timer initialization
const countdownElement = document.getElementById('countdown-timer');
if (countdownElement) {
  // Target date for the romantic getaway (start of 13 Feb 2026)
  const targetDate = new Date('2026-02-13T00:00:00');
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      countdownElement.textContent = 'We are on our romantic getaway!';
      clearInterval(countdownInterval);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// Open envelope to reveal letter
if (envelope) {
  envelope.addEventListener('click', () => {
    envelopeScreen.style.display = 'none';
    letterScreen.classList.remove('hidden');
  });
}

// When "Yes" is clicked, show final message and memory game
if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    // Hide buttons
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    // Show final message
    finalMessage.classList.remove('hidden');
    // Trigger celebration hearts
    createHearts();

    // Show the memory match game when Yes is clicked
    const memoryGame = document.getElementById('memory-game');
    if (memoryGame) {
      memoryGame.classList.remove('hidden');
    }
  });
}

// Make the "No" button evade the cursor on hover
if (noBtn) {
  noBtn.addEventListener('mouseover', () => {
        //// Move the button relative to the whole viewport
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const btnRect = noBtn.getBoundingClientRect();
      const maxX = vw - btnRect.width;
      const maxY = vh - btnRect.height;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      noBtn.style.position = 'fixed';
      noBtn.style.left = `${randomX}px`;
      noBtn.style.top = `${randomY}px`;
      noBtn.style.zIndex = '1000';
    // Update the button text with a playful message
    noBtn.textContent = noMessages[noIndex];
    noIndex = (noIndex + 1) % noMessages.length;
  });
}

// Show the secret modal
function showSecret() {
  if (secretModal) {
    secretModal.classList.remove('hidden');
    // Use flex to center content if it was hidden
    secretModal.style.display = 'flex';
  }
}

// Hide the secret modal
function hideSecret() {
  if (secretModal) {
    secretModal.classList.add('hidden');
    secretModal.style.display = 'none';
  }
}

// Handle click on secret heart trigger
if (secretHeart) {
  secretHeart.addEventListener('click', () => {
    showSecret();
  });
}

// Handle click on close button inside modal
if (closeSecret) {
  closeSecret.addEventListener('click', () => {
    hideSecret();
  });
}

// Allow closing the modal by clicking outside the modal content (on the overlay)
if (secretModal) {
  secretModal.addEventListener('click', (e) => {
    // If the user clicks directly on the overlay (not the content), hide the modal
    if (e.target === secretModal) {
      hideSecret();
    }
  });
}

// Handle scavenger hearts: hide each when clicked and show secret when all are found
if (scavengerHearts && scavengerHearts.length > 0) {
  scavengerHearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      // Hide the clicked heart
      heart.style.display = 'none';
      foundHearts++;
      if (foundHearts >= totalHearts) {
        showSecret();
      }
    });
  });
}

// Create floating hearts animation when yes is clicked
function createHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;
  container.style.display = 'block';
  // Generate multiple heart elements with random positions and delays
  const heartCount = 30;
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    // Set a random horizontal position
    heart.style.left = Math.random() * 100 + '%';
    // Stagger the animations with random delays
    heart.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
    container.appendChild(heart);
    // Remove the heart after its animation completes (randomized extra time)
    setTimeout(() => {
      heart.remove();
    }, 5000 + Math.random() * 2000);
  }
  // Hide the container after animations finish
  setTimeout(() => {
    container.style.display = 'none';
    // Clear any remaining hearts
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }, 7000);
}

// Memory match game logic
(() => {
  const memoryGame = document.getElementById('memory-game');
  const memoryCards = document.querySelectorAll('.memory-card');
  if (!memoryGame || !memoryCards || memoryCards.length === 0) return;
  // Shuffle cards by assigning random order values
  memoryCards.forEach((card) => {
    const randomPos = Math.floor(Math.random() * memoryCards.length);
    card.style.order = randomPos;
  });
  let firstCard = null;
  let lockBoard = false;
  let matchedPairs = 0;
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flipped');
    if (!firstCard) {
      firstCard = this;
      return;
    }
    const secondCard = this;
    if (firstCard.dataset.image === secondCard.dataset.image) {
      matchedPairs++;
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      firstCard = null;
      if (matchedPairs === memoryCards.length / 2) {
        const memoryMessage = document.getElementById('memory-message');
        if (memoryMessage) {
          memoryMessage.classList.remove('hidden');
        }
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        lockBoard = false;
        firstCard = null;
      }, 1000);
    }
  }
  memoryCards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
})();
