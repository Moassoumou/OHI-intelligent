const auth = firebase.auth();
const db = firebase.firestore();

// Protection de route + affichage email
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById("userEmail").textContent = user.email || "";
  document.getElementById("logoutBtn").addEventListener("click", () => auth.signOut());
  document.getElementById("addOhiForm").addEventListener("submit", (e) => addOhi(e, user.uid));
  loadOhi(user.uid);
});

// Ajouter un OHI
function addOhi(e, uid) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  db.collection("users").doc(uid).collection("ohi").add({
    title,
    description,
    deadline,
    priority,
    progress: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  e.target.reset();
}

// Charger en temps réel
function loadOhi(uid) {
  db.collection("users").doc(uid).collection("ohi").orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      const list = document.getElementById("ohiList");
      list.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const progress = data.progress || 0;
        const div = document.createElement("div");
        div.className = "bg-white shadow rounded-xl p-4";
        div.innerHTML = `
          <h3 class="text-lg font-bold">${data.title}</h3>
          <p class="text-gray-600">${data.description || ""}</p>
          <p class="text-sm text-gray-500">Deadline: ${data.deadline}</p>
          <p class="text-sm text-gray-500">Priorité: ${data.priority}</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div class="bg-blue-600 h-2 rounded-full" style="width:${progress}%"></div>
          </div>
          <p class="text-xs mt-1">Avancement: ${progress}%</p>
          <div class="flex gap-2 mt-3">
            <button onclick="updateProgress('${uid}','${doc.id}',${progress+10})" class="px-2 py-1 bg-green-500 text-white rounded">+10%</button>
            <button onclick="updateProgress('${uid}','${doc.id}',${progress-10})" class="px-2 py-1 bg-yellow-500 text-white rounded">-10%</button>
            <button onclick="deleteOhi('${uid}','${doc.id}')" class="px-2 py-1 bg-red-500 text-white rounded">Supprimer</button>
          </div>
        `;
        list.appendChild(div);
      });
    });
}

// Mettre à jour progression
function updateProgress(uid, id, newVal) {
  newVal = Math.max(0, Math.min(100, newVal));
  db.collection("users").doc(uid).collection("ohi").doc(id).update({
    progress: newVal,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Supprimer
function deleteOhi(uid, id) {
  db.collection("users").doc(uid).collection("ohi").doc(id).delete();
}
