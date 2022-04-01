// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwaV38vg8ZQcSNmBUQTt2I6jXWBVjWTew",
  authDomain: "ramadan-2ad94.firebaseapp.com",
  projectId: "ramadan-2ad94",
  storageBucket: "ramadan-2ad94.appspot.com",
  messagingSenderId: "557453950403",
  appId: "1:557453950403:web:c4e4e1af194a095a501176",
  measurementId: "G-TYBFBXNN2B",
};
const signIn = document.querySelector("#sign-in");
const logOut = document.querySelector("#log-out");
export let user = undefined;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let imgcontainer = document.querySelector("#user-img");
imgcontainer.addEventListener("click", function () {
  document.querySelector(".log-out").style.display = "block";
});
signIn.addEventListener("click", async function () {
  signInFunction();
});
export function signInFunction() {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      user = result.user;
      imgcontainer.src = user.photoURL;
      imgcontainer.title = user.displayName;
      document.querySelector(".user-page").style.display = "flex";
      document.querySelector(".user-settings").style.display = "none";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage);
    });
}
logOut.addEventListener("click", function () {
  signOutFunction();
});
function signOutFunction() {
  signOut(auth)
    .then(() => {
      user = undefined;
      document.querySelector(".user-page").style.display = "none";
      document.querySelector(".user-settings").style.display = "flex";
    })
    .catch((error) => {
      console.log(error);
    });
}
