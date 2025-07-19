// === Registration & Login ===
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  const isRegistration = document.title.includes('Register');
  const isLogin = document.title.includes('Login');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isRegistration) {

      const email = document.getElementById('email').value;
      const pw = document.getElementById('password').value;
      const confirmPw = document.getElementById('confirm-password').value;

      if (pw !== confirmPw) {
        alert("Passwords do not match!");
        return;
      }

      const user = {
        firstName: document.getElementById('first-name').value,
        middleName: document.getElementById('middle-name').value,
        lastName: document.getElementById('last-name').value,
        gender: document.getElementById('gender').value,
        birthday: document.getElementById('birthday').value,
        email: email,
        password: pw,
        pgocode: document.getElementById('pgocode').value
      };

      localStorage.setItem(email, JSON.stringify(user));
      alert("Registration successful!");
      window.location.href = "login.html";
    }

    if (isLogin) {
      const email = document.getElementById('email').value;
      const pw = document.getElementById('password').value;

      const storedUser = localStorage.getItem(email);

      if (!storedUser) {
        alert("No account found with that email.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.password === pw) {
        alert(`Welcome back, Trainer ${user.firstName}!`);
        localStorage.setItem('loggedInUser', email);
        window.location.href = "../index.html";
      } else {
        alert("Incorrect password.");
      }
      
    }
  });
});