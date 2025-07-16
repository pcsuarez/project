
const nav = document.querySelector('.main-nav');
const navLinksContainer = nav.querySelector('.nav-links');
const moreDropdown = nav.querySelector('.more-dropdown');
const moreBtn = moreDropdown.querySelector('.more-btn');
const moreMenu = moreDropdown.querySelector('.more-menu');

moreBtn.addEventListener('click', () => {
  moreMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!moreDropdown.contains(e.target)) {
    moreMenu.classList.remove('show');
  }
});

document.querySelector('.more-btn').click()

function updateNav() {
  // Move all links back first
  while (moreMenu.firstChild) {
    navLinksContainer.appendChild(moreMenu.firstChild);
  }

  const allLinks = Array.from(navLinksContainer.children);
  let navWidth = nav.offsetWidth;
  let moreWidth = moreDropdown.offsetWidth;
  let totalWidth = moreWidth;

  // This moves links to the dropdown
    for (let i = 0; i < allLinks.length; i++) {
    totalWidth += allLinks[i].offsetWidth + 20;
    if (totalWidth > navWidth) {
        while (i < allLinks.length) {
        moreMenu.appendChild(allLinks.pop());
        }
        break;
    }
    }


  // Show or hide the "More" button
  moreBtn.style.display = moreMenu.children.length > 0 ? 'inline-block' : 'none';
}

console.log({
  navWidth: nav.offsetWidth,
  totalWidth,
  moreBtnWidth: moreBtn.offsetWidth
});


// Ensure everything is loaded
window.addEventListener('DOMContentLoaded', updateNav);
window.addEventListener('resize', updateNav);
