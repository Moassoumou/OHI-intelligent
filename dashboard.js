const auth = firebase.auth();
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = './index.html';
    return;
  }
  document.getElementById('userEmail').textContent = user.email || user.displayName || 'Utilisateur';
});
document.getElementById('btnLogout')?.addEventListener('click', async () => {
  await auth.signOut();
  window.location.href = './index.html';
});
