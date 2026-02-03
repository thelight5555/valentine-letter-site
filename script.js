// Grab elements
const envelopeScreen = document.getElementById('envelope-screen');
const envelope = document.getElementById('envelope');
const letterScreen = document.getElementById('letter-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const finalMessage = document.getElementById('final-message');

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