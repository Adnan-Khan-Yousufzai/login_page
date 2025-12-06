# Demo Login & Signup Pages

This workspace contains a small demo of a responsive, styled login and signup page built with plain HTML, CSS, and JavaScript.

Files:
- `index.html` — Login page (uses `index.css` and `script.js`).
- `signup.html` — Signup page (uses `signup.css` and `signup.js`).
- `index.css` — Styling for the login page.
- `signup.css` — Styling for the signup page (includes strength meter styling).
- `script.js` — Login page client-side behaviors (validation, show/hide password).
- `signup.js` — Signup page behaviors (validation, strength meter, show/hide password).

How to run:
1. Open either `index.html` or `signup.html` in your browser (double-click or use the browser's Open File).
2. The pages are static; no server is required.

Notes:
- Form submissions are intercepted for demo purposes and do not send data to a server.
- To integrate with a backend, replace the submit handlers in `script.js` / `signup.js` with a `fetch()` call to your API.
- The CSS uses modern features (CSS variables, gradients, and `backdrop-filter`). For best visuals use a modern browser.
