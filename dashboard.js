// Page Dashboard: vérifie la session et remplit l'UI
const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (!user) {
    // Pas connecté -> retour login
    window.location.href = './index.html';
    return;
  }
  document.getElementById('userEmail').textContent = user.email || user.displayName || 'Utilisateur';
});

document.getElementById('btnLogout')?.addEventListener('click', async () => {
  await auth.signOut();
  window.location.href = './index.html';
});
