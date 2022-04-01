// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";
import plan from "./index";
export let thePlan = plan;

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
const db = getFirestore(app);
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
      console.log(user);
      imgcontainer.src = user.photoURL;
      imgcontainer.title = user.displayName;
      document.querySelector(".user-page").style.display = "flex";
      document.querySelector(".user-settings").style.display = "none";
      return user.uid;
    })
    .then(async (res) => {
      const reference = doc(db, "Users", res);
      const docSnap = await getDoc(reference);
      if (docSnap.exists()) {
        if (Object.keys(docSnap.data()).length == 0) {
          thePlan = false;
          console.log("Make a plan for him");
        } else {
          console.log(docSnap.data());
          thePlan = true;
          console.log("There is a plan");
        }
      } else {
        await setDoc(doc(db, "Users", res), {});
        thePlan = false;
      }
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
let my_plan;
const planFinish = document.querySelector("#submit-plan");
planFinish.addEventListener("click", async function (e) {
  e.preventDefault();
  let selectedTime = radiocheck(selectedTime);
  let focusOne = document.querySelector(".focus-1").value;
  let focusTwo = document.querySelector(".focus-2").value;

  let youtubePlaylist = checkYoutube(document.querySelector("#youtube"));

  let num = document.querySelector("#khatma").value;

  my_plan = { selectedTime, focusOne, focusTwo, youtubePlaylist, num };
  Object.keys(my_plan).forEach((ele) => {
    if (my_plan[ele] == "" || my_plan[ele] == undefined) {
      delete my_plan[ele];
    }
  });
  console.log(my_plan);
  await setDoc(doc(db, "Users", user.uid), my_plan);
  succed();
});
// function getItems(container) {
//   if (container.value.trim() != "") {
//     return container.value.trim();
//   }
// }
function radiocheck(r) {
  const radiobtns = document.querySelectorAll("input[type = 'radio']");
  for (const radio of radiobtns) {
    console.log(radio.id);
    if (radio.checked) {
      return radio.id;
    }
  }
}

function checkYoutube(r) {
  if (r.value.includes("you") && r.value.includes("play")) {
    return r.value;
  } else {
    r.placeholder = "ضع موقع من اليوتيوب";
  }
}
function succed() {
  let modal = document.createElement("section");
  modal.id = "pass-modal";
  modal.addEventListener("click", function (e) {
    if (e.target.id == "pass-modal") {
      modal.style.display = "none";
    }
  });
  document.body.appendChild(modal);
  let div = document.createElement("div");
  modal.appendChild(div);
  let h = document.createElement("h1");
  h.textContent = "تم بنجاح";
  div.append(h);
  let btn = document.createElement("button");
  btn.textContent = "حسنا";
  btn.id = "done";
  btn.addEventListener("click", function (e) {
    if (e.target.id == "done") {
      modal.style.display = "none";
    }
  });
  div.append(btn);
}
