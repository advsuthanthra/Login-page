
// Import modern modular Firebase SDK functions
//import { initializeApp } from "https://gstatic.com";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Replace this object with your official project credentials from the Firebase Console
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBH5JYKydnAD7BDUXMp8jxQWmTbokISQos",
    authDomain: "login-page-913ee.firebaseapp.com",
    projectId: "login-page-913ee",
    storageBucket: "login-page-913ee.firebasestorage.app",
    messagingSenderId: "861653744843",
    appId: "1:861653744843:web:88ef33e159c8d2c283af4e"
  };

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);

// Initialize app and structural references
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
const errorText = document.getElementById('errorMessage');

// Login form interceptor
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorText.textContent = ""; // Clear any previous errors

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Execution of Firebase authentication function
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`Success! Logged in as: ${user.email}`);
            // window.location.href = "dashboard.html"; // Optional redirect
        })
        .catch((error) => {
            // Error code filter mapping
            if (error.code === 'auth/invalid-credential') {
                errorText.textContent = "Invalid login credentials match.";
            } else {
                errorText.textContent = error.message;
            }
        });
});
