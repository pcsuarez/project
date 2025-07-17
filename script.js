document.addEventListener('DOMContentLoaded', () => {
  let basketCount = 0;
  let totalCoins = 0;

  const userInfo = document.querySelector('.user-info');
  const cartPopup = document.querySelector('.cart-popup');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  function updateUserInfo() {
    if (userInfo) {
      userInfo.textContent = `${totalCoins} PokéCoins | Basket (${basketCount})`;
    }
  }

  updateUserInfo();

  if (userInfo && cartPopup) {
    userInfo.addEventListener('click', () => {
      cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    });
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const name = productCard.querySelector('h3').innerText;
      const priceText = productCard.querySelector('p').innerText;
      const price = parseInt(priceText.replace(/\D/g, ''), 10);

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

  const pokeball = document.querySelector('.pokeball-icon');
  if (pokeball) {
    pokeball.addEventListener('click', () => {
      pokeball.classList.add('spin');
      setTimeout(() => {
        pokeball.classList.remove('spin');
      }, 3000);
    });
  }

  const toggleBtn = document.getElementById('toggle-character');
  const buddyCharacter = document.querySelector('.buddy-character');
  const buddySprite = document.getElementById('buddy-sprite');
  let idleToggle = true;

  if (toggleBtn && buddyCharacter && buddySprite) {
    setInterval(() => {
      if (!buddyCharacter.classList.contains('hidden')) {
        buddySprite.src = idleToggle ? 'asset/Skye_Idle.gif' : 'asset/Skye_Idle2.gif';
        idleToggle = !idleToggle;
      }
    }, 10000);

    toggleBtn.addEventListener('click', () => {
      buddyCharacter.classList.toggle('hidden');
      toggleBtn.textContent = buddyCharacter.classList.contains('hidden') ? 'Bring Out Buddy' : 'Put Away Buddy';
    });

    buddySprite.addEventListener('click', () => {
      console.log('Buddy clicked!');
      buddySprite.src = 'asset/Skye_Talking.gif';
      setTimeout(() => {
        buddySprite.src = 'asset/Skye_Idle.gif';
      }, 5000);
    });
  }
});
