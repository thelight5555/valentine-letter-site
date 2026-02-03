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
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    finalMessage.classList.remove('hidden');
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