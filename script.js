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
  const loggedInUser = localStorage.getItem('loggedInUser');
  const userNameDisplay = document.getElementById('user-name-display');
  const logoutMenu = document.getElementById('logout-menu');
  const logoutBtn = document.getElementById('logout-btn');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // === User Greeting + Logout ===
  if (loggedInUser) {
    const user = JSON.parse(localStorage.getItem(loggedInUser));

    if (userNameDisplay && user) {
      userNameDisplay.textContent = `${user.firstName}`;
      userNameDisplay.style.display = 'inline';

      userNameDisplay.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent click from bubbling to document
      logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Hide logout menu if clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('user-dropdown');
      if (!dropdown.contains(e.target)) {
        logoutMenu.style.display = 'none';
      }
    });

      // Logout logic
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        location.reload();
      });
    }
  }

  // === Buddy Character Logic ===
  if (toggleBtn && buddyCharacter && buddySprite) {
    let isBuddyVisible = false;
    let isTalking = false;

    // Hide it by default
    buddyCharacter.classList.add('slide-away');
    buddyCharacter.style.display = 'none';
    toggleBtn.textContent = 'Bring Out Buddy';

    // Reset the idle animation every 10 seconds if not talking
    setInterval(() => {
      if (buddyCharacter.offsetParent !== null && !isTalking) {
        buddySprite.src = '/asset/sprites/Skye_Idle.gif';
      }
    }, 10000);

    toggleBtn.addEventListener('click', () => {
      if (isBuddyVisible) {
        // Hide the buddy
        buddyCharacter.classList.remove('slide-back');
        buddyCharacter.classList.add('slide-away');

        setTimeout(() => {
          buddyCharacter.style.display = 'none';
          isBuddyVisible = false;
          toggleBtn.textContent = 'Bring Out Buddy';
        }, 500);
      } else {
        // Show the buddy
        buddyCharacter.style.display = 'flex';
        void buddyCharacter.offsetWidth;

        buddyCharacter.classList.remove('slide-away');
        buddyCharacter.classList.add('slide-back');

        isBuddyVisible = true;
        toggleBtn.textContent = 'Put Away Buddy';
      }
    });

    buddySprite.addEventListener('click', () => {
      const hour = new Date().getHours();
      const timeLines =
        hour >= 6 && hour < 12
          ? ["Good morning.\nReady to shop?"]
          : hour >= 12 && hour < 18
            ? ["Have anything interesting\nthis afternoon?"]
            : ["It's late."];

      const baseLines = [
        "What are you going\nto be buying now?",
        "Hmm. Limited Offers\nare available today.",
        "The shop has new stuff.",
        "...", "Hm?", "Huh...",
        "This work is an inspiration\nto mimic the original.",
        "Got pancakes? Asking\nfor a friend.",
        "Ever heard of\na Jet2Holiday?"
      ];

      const lines = [...timeLines, ...baseLines];
      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      isTalking = true;
      buddySprite.src = '../asset/sprites/Skye_Talking.gif';
      typeDialogue(randomLine);
      setTimeout(() => {
        buddySprite.src = '../asset/sprites/Skye_Idle.gif';
        isTalking = false;
      }, 3000);
    });
  }

  // === Dialogue Typing Effect ===
  function typeDialogue(text, speed = 30) {
    if (dialogueBox.isTyping) return;
    dialogueBox.isTyping = true;

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
        dialogueBox.isTyping = false;
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

  // === Add to Cart ===
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const name = productCard.querySelector('h3').textContent;
      const price = productCard.querySelector('p').textContent.replace('Price: ', '');
      const img = productCard.querySelector('img').src;

      const item = { name, price, img };
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

      currentCart.push(item);
      localStorage.setItem('cart', JSON.stringify(currentCart));

      if (itemCount) itemCount.textContent = currentCart.length;

      if (pesoTotal) {
        let subtotal = 0;
        currentCart.forEach(item => {
          const priceNumber = parseFloat(item.price.replace(/[₱,]/g, '')) || 0;
          subtotal += priceNumber;
        });
        pesoTotal.textContent = subtotal.toFixed(2);
      }
    });
  });

  // === Cart Mini Display (Subtotal & Count) ===
  if (itemCount) itemCount.textContent = cart.length;

  if (pesoTotal) {
    let subtotal = 0;
    cart.forEach(item => {
      const priceNumber = parseFloat(item.price.replace(/[₱,]/g, '')) || 0;
      subtotal += priceNumber;
    });
    pesoTotal.textContent = subtotal.toFixed(2);
  }

  // === Cart Page Rendering ===
  if (cartItemsContainer && cartTotalDisplay) {
    let total = 0;

    cart.forEach((item, index) => {
      const cleanPrice = item.price.replace(/[^\d.]/g, '');
      const priceNumber = parseFloat(cleanPrice) || 0;
      total += priceNumber;

      const itemElement = document.createElement('div');
      itemElement.classList.add('product-card');
      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    cartTotalDisplay.textContent = `₱${total.toFixed(2)}`;

    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
      }
    });
  }

});

// === Checkout ===

function checkout() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    alert("You need to log in before checking out!");
    window.location.href = "login.html";
    return;
  }

  alert("Thank you for your purchase!");
  localStorage.removeItem('cart');
  window.location.reload();
}
