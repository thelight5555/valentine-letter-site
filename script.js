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

// When "Yes" is clicked, show final message
if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    // Hide buttons
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    // Show final message
    finalMessage.classList.remove('hidden');
    // Trigger celebration hearts
    createHearts();
  });
}

// Make the "No" button evade the cursor on hover
if (noBtn) {
  noBtn.addEventListener('mouseover', () => {
    const parent = noBtn.parentElement;
    // Ensure the parent has a bounding rectangle to calculate maximum offsets
    const parentRect = parent.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = parentRect.width - btnRect.width;
    const maxY = parentRect.height - btnRect.height;
    // Generate random offsets within the parent's bounds
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

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
