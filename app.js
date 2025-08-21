// Firebase Auth logic for the Canva-styled login
const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const googleProvider = new firebase.auth.GoogleAuthProvider();
const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

// UI helpers
const statusBox = document.getElementById('statusBox');
const loading = document.getElementById('loadingModal');
function showStatus(text) {
  if (!statusBox) return;
  statusBox.textContent = text;
  statusBox.classList.remove('hidden');
}
function clearStatus() {
  if (!statusBox) return;
  statusBox.textContent = '';
  statusBox.classList.add('hidden');
}
function showLoading() {
  if (loading) { loading.classList.remove('hidden'); loading.classList.add('flex'); }
}
function hideLoading() {
  if (loading) { loading.classList.add('hidden'); loading.classList.remove('flex'); }
}

// Toggle password
document.getElementById('togglePwd')?.addEventListener('click', () => {
  const input = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    eyeIcon.innerHTML = '<path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"/><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>';
  } else {
    input.type = 'password';
    eyeIcon.innerHTML = '<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>';
  }
});

// Forgot password
document.getElementById('btnForgot')?.addEventListener('click', async () => {
  const email = (document.getElementById('email')?.value || '').trim();
  if (!email) return showStatus("Entrez d'abord votre email pour recevoir un lien de réinitialisation.");
  try {
    await auth.sendPasswordResetEmail(email);
    showStatus("📧 Lien de réinitialisation envoyé à " + email);
  } catch (err) {
    showStatus("Erreur: " + err.message);
  }
});

// Email/password login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearStatus();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const companyType = document.getElementById('companyType').value;
  if (!email || !password || !companyType) return showStatus('Veuillez remplir tous les champs.');

  try {
    showLoading();
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = './dashboard.html';
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      // Create account automatically for demo
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        window.location.href = './dashboard.html';
      } catch (e2) {
        showStatus('Erreur: ' + e2.message);
      }
    } else {
      showStatus('Erreur: ' + err.message);
    }
  } finally {
    hideLoading();
  }
});

// Google login
document.getElementById('btnGoogle')?.addEventListener('click', async () => {
  clearStatus();
  try {
    showLoading();
    await auth.signInWithPopup(googleProvider);
    window.location.href = './dashboard.html';
  } catch (err) {
    showStatus('Google: ' + err.message);
  } finally {
    hideLoading();
  }
});

// Microsoft login
document.getElementById('btnMicrosoft')?.addEventListener('click', async () => {
  clearStatus();
  try {
    showLoading();
    await auth.signInWithPopup(microsoftProvider);
    window.location.href = './dashboard.html';
  } catch (err) {
    showStatus('Microsoft: ' + err.message);
  } finally {
    hideLoading();
  }
});

// Auto-redirect if already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    // Already connected -> go to dashboard
    // Comment the next line if you prefer to stay on login
    // window.location.href = './dashboard.html';
  }
});
