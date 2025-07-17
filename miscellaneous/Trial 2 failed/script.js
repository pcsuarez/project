const pokeball = document.getElementById('pokeball');

pokeball.addEventListener('click', () => {
  pokeball.classList.add('spin');

  pokeball.addEventListener('animationend', () => {
    pokeball.classList.remove('spin');
  }, { once: true });
});

function updateNavItems() {
  const nav = document.querySelector('.main-nav');
  const more = document.querySelector('.nav-more');
  const dropdown = more.querySelector('.dropdown');
  
  // Get all nav links except "more"
  const navItems = Array.from(nav.children).filter(
    el => el !== more && el.tagName === 'A'
  );

  const topBar = document.querySelector('.top-bar');
  const rightStuff = document.querySelector('.top-right');

  const availableWidth = topBar.offsetWidth - rightStuff.offsetWidth - more.offsetWidth - 60;

  // Reset dropdown and put all items back before "more"
  dropdown.innerHTML = '';
  navItems.forEach(item => nav.insertBefore(item, more));

  let totalWidth = 0;
  let moved = false;

  for (let i = 0; i < navItems.length; i++) {
    totalWidth += navItems[i].offsetWidth;
    if (totalWidth > availableWidth) {
      dropdown.appendChild(navItems[i]);
      moved = true;
    }
  }

  more.style.display = moved ? 'inline-flex' : 'none';
}

document.querySelector('.nav-more').addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent outside click handler from instantly closing it
  const dropdown = e.currentTarget.querySelector('.dropdown');
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('click', (e) => {
  const more = document.querySelector('.nav-more');
  if (!more.contains(e.target)) {
    more.querySelector('.dropdown').style.display = 'none';
  }
});

window.addEventListener('resize', updateNavItems);
window.addEventListener('load', updateNavItems);
