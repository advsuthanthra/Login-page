


 //window.location.href = "/home.html";

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword }from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBB4u43eeYhyRU4WoFBIoZg01FSVWZlLcQ",
    authDomain: "suthanthra-1bff8.firebaseapp.com",
    projectId: "suthanthra-1bff8",
    storageBucket: "suthanthra-1bff8.appspot.com",
    messagingSenderId: "554578105381",
    appId: "1:554578105381:web:6aa9a28f663cc5a5765bcc"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  window.login = function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        document.getElementById("msg").innerText = "Login Successful ✔";
        document.getElementById("msg").style.color = "green";

        // redirect
        window.location.href = "home.html";
      })
      .catch((error) => {
        document.getElementById("msg").innerText = error.message;
        document.getElementById("msg").style.color = "red";
      });

  };

