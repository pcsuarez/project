document.addEventListener('DOMContentLoaded', () => {
  
  // === Element Selectors ===
  const toggleBtn = document.getElementById('toggle-character');
  const buddyCharacter = document.querySelector('.buddy-character');
  const buddySprite = document.getElementById('buddy-sprite');
  const dialogueBox = document.getElementById('buddy-dialogue');
  const pokeball = document.querySelector('.pokeball-icon');
  const itemCount = document.getElementById('item-count');
  const pesoTotal = document.getElementById('peso-total');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalDisplay = document.getElementById('cart-total');

  // === Buddy Character Interaction ===
  let isBuddyVisible = true;
  let isTalking = false;

  if (toggleBtn && buddyCharacter && buddySprite) {
    // Idle sprite re-apply every 10s to prevent frozen frame
    setInterval(() => {
      if (buddyCharacter.offsetParent !== null && !isTalking) {
        buddySprite.src = '/asset/sprites/Skye_Idle.gif';
      }
    }, 10000);

    // Toggle buddy visibility
    toggleBtn.addEventListener('click', () => {
      if (isBuddyVisible) {
        buddyCharacter.classList.remove('slide-back');
        buddyCharacter.classList.add('slide-away');
        setTimeout(() => (buddyCharacter.style.display = 'none'), 500);
        toggleBtn.textContent = 'Bring Out Buddy';
      } else {
        buddyCharacter.style.display = 'flex';
        void buddyCharacter.offsetWidth;
        buddyCharacter.classList.remove('slide-away');
        buddyCharacter.classList.add('slide-back');
        toggleBtn.textContent = 'Put Away Buddy';
      }
      isBuddyVisible = !isBuddyVisible;
    });

    // Talking interaction
    buddySprite.addEventListener('click', () => {
      const hour = new Date().getHours();

      const baseLines = [
        "What are you going\nto be buying now?",
        "Hmm. Limited Offers\nare available today.",
        "The shop has new stuff.",
        "...",
        "Huh...",
        "This work is an inspiration\nto mimic the original.",
        "Got pancakes? Asking\nfor a friend."
      ];

      const timeLines =
        hour >= 6 && hour < 12
          ? ["Good morning.\nReady to shop?"]
          : hour >= 12 && hour < 18
          ? ["Have anything interesting\nthis afternoon?"]
          : ["It's late."];

      const lines = [...timeLines, ...baseLines];
      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      isTalking = true;
      buddySprite.src = '/asset/sprites/Skye_Talking.gif';
      typeDialogue(randomLine);

      setTimeout(() => {
        buddySprite.src = '/asset/sprites/Skye_Idle.gif';
        isTalking = false;
      }, 5000);
    });
  }



  // === Dialogue Typing Function ===
  let isTyping = false;
  function typeDialogue(text, speed = 30) {
    if (isTyping) return;
    isTyping = true;

    let index = 0;
    let displayText = "";
    dialogueBox.innerHTML = "";
    dialogueBox.style.display = "block";

    (function type() {
      if (index < text.length) {
        displayText += text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
        dialogueBox.innerHTML = displayText;
        index++;
        setTimeout(type, speed);
      } else {
        isTyping = false;
        setTimeout(() => dialogueBox.style.display = "none", 7000);
      }
    })();
  }

  // === UI Effects ===
  if (pokeball) {
    pokeball.addEventListener('click', () => {
      pokeball.classList.add('spin');
      setTimeout(() => pokeball.classList.remove('spin'), 3000);
    });
  }

  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // === Add to Cart Logic ===
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  let subtotal = 0;
  cart.forEach(item => {
    const priceNumber = parseFloat(item.price.replace(/[₱,]/g, '')) || 0;
    subtotal += priceNumber;
  });

  if (itemCount) itemCount.textContent = cart.length;
  if (pesoTotal) pesoTotal.textContent = subtotal.toFixed(2);



  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const name = productCard.querySelector('h3').textContent;
      const price = productCard.querySelector('p').textContent.replace('Price: ', '');
      const img = productCard.querySelector('img').src;

      const item = { name, price, img };

      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));

      let subtotal = 0;
      cart.forEach(item => {
        const priceNumber = parseFloat(item.price.replace(/[₱,]/g, '')) || 0;
        subtotal += priceNumber;
      });

      if (itemCount) itemCount.textContent = cart.length;
      if (pesoTotal) pesoTotal.textContent = subtotal.toFixed(2);
    });
  });


  // === Render Cart Page Items (if any) ===
  if (cartItemsContainer && cartTotalDisplay) {
    let total = 0;

    cart.forEach(item => {
      const priceNumber = parseFloat(item.price.replace(/[₱]/g, '')) || 0;
      total += priceNumber;

      const itemElement = document.createElement('div');
      itemElement.classList.add('product-card');
      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    cartTotalDisplay.textContent = `Total: ₱${total}`;
  }
});

// === Checkout Function ===
function checkout() {
  alert("Thank you for your purchase!");
  localStorage.removeItem('cart');
  window.location.reload();
}
