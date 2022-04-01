import { user, signInFunction } from "./firebase";
import "hijri-date";
import hijriDate from "hijri-date";
const userBtn = document.querySelector(".user-settings");
const userSettings = document.querySelector(".log-list");
const date = document.querySelector(".date-hijri");

document.body.addEventListener("click", function (e) {
  if (
    !e.target.classList.contains("material-icons") &&
    userSettings.style.display == "flex"
  ) {
    userSettings.style.display = "none";
  }
  if (
    e.target.id != "user-img" &&
    document.querySelector(".log-out").style.display == "block"
  ) {
    document.querySelector(".log-out").style.display = "none";
  }
});

userBtn.addEventListener("click", function () {
  userSettings.style.display = "flex";
});

const readyBtn = document.querySelector("#ready");
const planBtn = document.querySelector("#plan");

readyBtn.addEventListener("click", function () {
  if (user == undefined) {
    signInFunction().then(() => {
      readyBtn.click();
    });
  } else {
    console.log("Let's get ready for ramadan");
  }
});
// planBtn.addEventListener("click", function () {
//   if (user == undefined) {
//     signInFunction().then(() => {
//       planBtn.click();
//     });
//   } else {
//     console.log("Let's focus on ramadan");
//   }
// });
let today = new hijriDate();
date.textContent = `${today.year} - ${today.month} - ${today.date}`;
