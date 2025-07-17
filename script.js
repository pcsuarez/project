
document.addEventListener('DOMContentLoaded', () => {
  let basketCount = 0;
  let totalCoins = 0;

const userInfo = document.querySelector('.user-info');
const cartPopup = document.querySelector('.cart-popup');

userInfo.addEventListener('click', () => {
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
});
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const name = productCard.querySelector('h3').innerText;
            const priceText = productCard.querySelector('p').innerText;
            const price = parseInt(priceText.replace(/\D/g, ''), 10);

            basketCount++;
            totalCoins += price;

            userInfo.textContent = `${totalCoins} PokéCoins | Poké Basket (${basketCount})`;
            
            const li = document.createElement('li');
            li.textContent = `${name} - ${price} PokéCoins`;
            cartItems.appendChild(li);

            cartTotal.textContent = `Total: ${totalCoins} PokéCoins`;

            console.log(`Added to basket: ${name} - ${price} PokéCoins`);
        });
    });
});

const pokeball = document.querySelector('.pokeball-icon');

pokeball.addEventListener('click', () => {
  pokeball.classList.add('spin');

  setTimeout(() => {
    pokeball.classList.remove('spin');
  }, 3000);
});

const toggleBtn = document.getElementById('toggle-character');
const buddyCharacter = document.querySelector('.buddy-character');
const buddySprite = document.getElementById('buddy-sprite');

let idleToggle = true;

setInterval(() => {
  if (!buddyCharacter.classList.contains('hidden')) {
    buddySprite.src = idleToggle ? 'asset/Skye_Idle.gif' : 'asset/Skye_Idle2.gif';
    idleToggle = !idleToggle;
  }
}, 5000);

toggleBtn.addEventListener('click', () => {
  buddyCharacter.classList.toggle('hidden');
  if (buddyCharacter.classList.contains('hidden')) {
    toggleBtn.textContent = 'Bring Out Buddy';
  } else {
    toggleBtn.textContent = 'Put Away Buddy';
  }
});

buddySprite.addEventListener('click', () => {
  console.log('Buddy clicked!');


  buddySprite.src = 'asset/Skye_Talking.gif';
  setTimeout(() => {
    buddySprite.src = 'asset/Skye_Idle.gif';
  }, 5000);
});