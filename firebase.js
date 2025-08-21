const firebaseConfig = {
  apiKey: "AIzaSyD4JaJelN4LbkbLfGVJVbCAY6gK9sPAN3I",
  authDomain: "tableau-de-bord-intelligent.firebaseapp.com",
  projectId: "tableau-de-bord-intelligent",
  storageBucket: "tableau-de-bord-intelligent.appspot.com",
  messagingSenderId: "226539421183",
  appId: "1:226539421183:web:7386e6a4274f1c9fde3bca",
  measurementId: "G-7K0EN05CJ7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
