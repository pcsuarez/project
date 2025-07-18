document.addEventListener('DOMContentLoaded', () => {
  let basketCount = 0;
  let totalCoins = 0;

  const userInfo = document.querySelector('.user-info');
  const cartPopup = document.querySelector('.cart-popup');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const toggleBtn = document.getElementById('toggle-character');
  const buddyCharacter = document.querySelector('.buddy-character');
  const buddySprite = document.getElementById('buddy-sprite');
  const dialogue = document.getElementById('buddy-dialogue');
  const dialogueBox = document.getElementById('buddy-dialogue');


  // === Buddy Character Setup ===
  let idleToggle = true;
  if (toggleBtn && buddyCharacter && buddySprite) {
    setInterval(() => {
      if (!buddyCharacter.classList.contains('hidden')) {
        buddySprite.src = idleToggle ? '../asset/Skye_Idle.gif' : '../asset/Skye_Idle2.gif';
        idleToggle = !idleToggle;
      }
    }, 10000);

    toggleBtn.addEventListener('click', () => {
      buddyCharacter.classList.toggle('hidden');
      toggleBtn.textContent = buddyCharacter.classList.contains('hidden') ? 'Bring Out Buddy' : 'Put Away Buddy';
    });

    buddySprite.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
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

      const cartLines = cart.length === 0
        ? ["Basket's empty."]
        : cart.length < 3
          ? ["Hm..."]
          : ["That's something."];

      const timeLines = hour >= 6 && hour < 12
        ? ["Good morning.\nReady to shop?"]
        : hour >= 12 && hour < 18
          ? ["Have anything interesting\nthis afternoon?"]
          : ["It's late."];

      const lines = [...timeLines, ...cartLines, ...baseLines];
      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      buddySprite.src = '../asset/Skye_Talking.gif';
      typeDialogue(randomLine); 

      setTimeout(() => {
        buddySprite.src = '../asset/Skye_Idle.gif';
      }, 5000);
    });
    
  } 

  let typeIndex = 0;
  let isTyping = false;
  let typeTimeout;

  function typeDialogue(text, speed = 30) {
    if (isTyping) return;
    isTyping = true;
    typeIndex = 0;
    let displayText = "";

    dialogueBox.innerHTML = "";
    dialogueBox.style.display = "block";

    function type() {
      if (typeIndex < text.length) {
        const char = text.charAt(typeIndex);
        displayText += char === "\n" ? "<br>" : char;
        dialogueBox.innerHTML = displayText;
        typeIndex++;
        typeTimeout = setTimeout(type, speed);
      } else {
        isTyping = false;
        setTimeout(() => {
          dialogueBox.style.display = "none";
        }, 7000); // Keep it on screen for a few seconds after typing
      }
    }

    type();
  }


  // === Cart Utilities ===
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartDisplay() {
    const cart = getCart();
    const itemCount = cart.length;
    const coinSum = cart.reduce((total, item) => total + (item.price || 0), 0);

    const itemCountEl = document.getElementById("item-count");
    const coinCountEl = document.getElementById("cart-count");

    if (itemCountEl) itemCountEl.textContent = itemCount;
    if (coinCountEl) coinCountEl.textContent = `${coinSum} PokéCoins |`;
  }

  function updateUserInfo() {
    if (userInfo) {
      userInfo.textContent = `${totalCoins} PokéCoins | Basket (${basketCount})`;
    }
  }

  updateCartDisplay();
  updateUserInfo();

  // Toggle cart popup
  if (userInfo && cartPopup) {
    userInfo.addEventListener('click', () => {
      cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Add to cart
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const name = productCard.querySelector('h3').innerText;
      const priceText = productCard.querySelector('p').innerText;
      const price = parseInt(priceText.replace(/\D/g, ''), 10);

      const item = { name, price };
      addToCart(item);

      basketCount++;
      totalCoins += price;

      const li = document.createElement('li');
      li.textContent = `${name} - ${price} PokéCoins`;
      if (cartItems) cartItems.appendChild(li);

      if (cartTotal) cartTotal.textContent = `Total: ${totalCoins} PokéCoins`;
      updateUserInfo();

      console.log(`Added to basket: ${name} - ${price} PokéCoins`);
    });
  });

  function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    saveCart(cart);
    updateCartDisplay();
  }

  // Load cart items into popup
  const cart = getCart();
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your Poké Basket is empty.</p>";
    } else {
      cart.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
          <strong>${item.name}</strong> - ${item.price} PokéCoins
          <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemEl);
      });
    }
  }

  // Pokéball animation
  const pokeball = document.querySelector('.pokeball-icon');
  if (pokeball) {
    pokeball.addEventListener('click', () => {
      pokeball.classList.add('spin');
      setTimeout(() => pokeball.classList.remove('spin'), 3000);
    });
  }


  function toggleImage(container) {
    const img = container.querySelector('img');
    const currentSrc = img.src;
    const altSrc = img.getAttribute('data-alt');

    img.src = altSrc;
    img.setAttribute('data-alt', currentSrc);
  }

  document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

  
});

