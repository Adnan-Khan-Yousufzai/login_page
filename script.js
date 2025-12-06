// script.js — handles validation, show/hide password, and demo submit
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const toggle = document.getElementById('togglePassword');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const toast = document.getElementById('toast');

  function showToast(message, timeout = 3000) {
    toast.textContent = message;
    toast.hidden = false;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => (toast.hidden = true), 300);
    }, timeout);
  }

  toggle.addEventListener('click', () => {
    const showing = password.type === 'text';
    password.type = showing ? 'password' : 'text';
    toggle.textContent = showing ? 'Show' : 'Hide';
    toggle.setAttribute('aria-pressed', String(!showing));
  });

  function validateEmail(v) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i.test(v);
  }

  function validate() {
    let ok = true;
    emailError.textContent = '';
    passwordError.textContent = '';

    if (!email.value.trim()) {
      emailError.textContent = 'Email is required'; ok = false;
    } else if (!validateEmail(email.value.trim())) {
      emailError.textContent = 'Enter a valid email'; ok = false;
    }

    if (!password.value) {
      passwordError.textContent = 'Password is required'; ok = false;
    } else if (password.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters'; ok = false;
    }

    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Demo: show a success toast and clear password field
    showToast('Signed in — demo only');
    password.value = '';
  });

  // Live validation
  email.addEventListener('input', () => { if (emailError.textContent) validate(); });
  password.addEventListener('input', () => { if (passwordError.textContent) validate(); });
});
