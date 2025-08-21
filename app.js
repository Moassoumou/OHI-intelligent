// Auth UI (page de connexion)
const auth = firebase.auth();

// Persistance locale (rester connecté)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

const statusEl = document.getElementById('status');
function setStatus(msg){ if(statusEl){ statusEl.textContent = msg; } }

// Email / Mot de passe
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = './dashboard.html';
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      // Optionnel : créer le compte automatiquement
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        window.location.href = './dashboard.html';
      } catch (e2) {
        setStatus('Erreur: ' + e2.message);
      }
    } else {
      setStatus('Erreur: ' + err.message);
    }
  }
});

// Google
document.getElementById('btnGoogle')?.addEventListener('click', async () => {
  try {
    await auth.signInWithPopup(googleProvider);
    window.location.href = './dashboard.html';
  } catch (err) {
    setStatus('Google: ' + err.message);
  }
});

// Microsoft
document.getElementById('btnMicrosoft')?.addEventListener('click', async () => {
  try {
    await auth.signInWithPopup(microsoftProvider);
    window.location.href = './dashboard.html';
  } catch (err) {
    setStatus('Microsoft: ' + err.message);
  }
});

// Si déjà connecté, aller directement au dashboard
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = './dashboard.html';
  }
});
