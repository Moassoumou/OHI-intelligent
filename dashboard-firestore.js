// dashboard-firestore.js

// Récupère Firebase déjà initialisé dans firebase.js
const auth = firebase.auth();
const db   = firebase.firestore();

let currentUID = null;

// Vérifie l’état de connexion
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html"; // pas connecté → retour login
    return;
  }
  currentUID = user.uid;
  document.getElementById("userEmail").textContent = user.email;
  listenOhiRealtime();
});

// Déconnexion
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await auth.signOut();
});

// Ajout d’un OHI
document.getElementById("addOhiForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const deadline = document.getElementById("deadline").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;

  await db.collection("users").doc(currentUID).collection("ohi").add({
    title,
    deadline,
    description,
    priority,
    progress: 0,
    completed: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  e.target.reset();
});

// Écoute en temps réel
function listenOhiRealtime() {
  db.collection("users").doc(currentUID).collection("ohi")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const container = document.getElementById("ohiList");
      container.innerHTML = "";
      snapshot.forEach((doc) => {
        const ohi = doc.data();
        const div = document.createElement("div");
        div.className = "p-4 bg-white shadow rounded-xl";

        div.innerHTML = `
          <h3 class="font-semibold text-lg">${ohi.title}</h3>
          <p class="text-gray-600">${ohi.description || ""}</p>
          <p class="text-sm text-gray-500">📅 ${ohi.deadline || "Sans date"} | 🔥 ${ohi.priority}</p>
          <p class="text-sm">Avancement : ${ohi.progress || 0}%</p>
          <div class="mt-2 flex gap-2">
            <button onclick="markComplete('${doc.id}')" class="bg-green-500 text-white px-3 py-1 rounded">Terminé</button>
            <button onclick="deleteOhi('${doc.id}')" class="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
          </div>
        `;
        container.appendChild(div);
      });
    });
}

// Marquer comme terminé
async function markComplete(docId) {
  await db.collection("users").doc(currentUID).collection("ohi").doc(docId).update({
    progress: 100,
    completed: true,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Supprimer un OHI
async function deleteOhi(docId) {
  await db.collection("users").doc(currentUID).collection("ohi").doc(docId).delete();
}
