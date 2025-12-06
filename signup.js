// signup.js — validation, password strength, show/hide password, demo submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const nameEl = document.getElementById('fullName');
  const email = document.getElementById('suEmail');
  const password = document.getElementById('suPassword');
  const confirm = document.getElementById('confirmPassword');
  const toggle = document.getElementById('toggleSuPassword');
  const strengthBar = document.querySelector('#strength span');
  const toast = document.getElementById('signupToast');

  function showToast(msg, t = 3000){
    toast.textContent = msg; toast.hidden = false; toast.style.opacity = '1';
    setTimeout(()=>{ toast.style.opacity = '0'; setTimeout(()=> toast.hidden = true,300)}, t);
  }

  toggle.addEventListener('click', ()=>{
    const shown = password.type === 'text';
    password.type = shown ? 'password' : 'text';
    toggle.textContent = shown ? 'Show' : 'Hide';
    toggle.setAttribute('aria-pressed', String(!shown));
  });

  function scorePassword(pw){
    let score = 0;
    if (!pw) return 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    if (pw.length >= 12) score += 1;
    return score; // 0..5
  }

  function updateStrength(){
    const s = scorePassword(password.value);
    const pct = Math.min(100, Math.round((s/5)*100));
    strengthBar.style.width = pct + '%';
  }

  function validateEmail(v){
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i.test(v);
  }

  function clearErrors(){
    ['nameError','emailError','passwordError','confirmError','termsError'].forEach(id => {
      const el = document.getElementById(id); if (el) el.textContent = '';
    });
  }

  function validate(){
    clearErrors();
    let ok = true;
    if (!nameEl.value.trim()){ document.getElementById('nameError').textContent = 'Full name is required'; ok = false; }
    if (!email.value.trim()){ document.getElementById('emailError').textContent = 'Email is required'; ok = false; }
    else if (!validateEmail(email.value.trim())){ document.getElementById('emailError').textContent = 'Enter a valid email'; ok = false; }
    if (!password.value){ document.getElementById('passwordError').textContent = 'Password is required'; ok = false; }
    else if (password.value.length < 8){ document.getElementById('passwordError').textContent = 'Use at least 8 characters'; ok = false; }
    if (password.value !== confirm.value){ document.getElementById('confirmError').textContent = 'Passwords do not match'; ok = false; }
    const agree = document.getElementById('agree');
    if (!agree || !agree.checked){ document.getElementById('termsError').textContent = 'You must accept terms'; ok = false; }
    return ok;
  }

  password.addEventListener('input', ()=>{ updateStrength(); if (document.getElementById('passwordError').textContent) validate(); });
  confirm.addEventListener('input', ()=>{ if (document.getElementById('confirmError').textContent) validate(); });
  email.addEventListener('input', ()=>{ if (document.getElementById('emailError').textContent) validate(); });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (!validate()) return;
    showToast('Account created — demo only');
    form.reset(); updateStrength();
  });
});
