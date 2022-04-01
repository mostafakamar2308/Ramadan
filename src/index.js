import { user, signInFunction, thePlan } from "./firebase";
import gsap from "gsap";
import "hijri-date";
import hijriDate from "hijri-date";
const userBtn = document.querySelector(".user-settings");
const userSettings = document.querySelector(".log-list");
const date = document.querySelector(".date-hijri");
const mainMenu = document.querySelector(".logo");
export let plan;

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
    gsap.to("main", { duration: 0.5, opacity: 0, display: "none" });
    gsap.to(".quran-tab", { duration: 0.5, opacity: 0, display: "none" });
    gsap.to(".sebha-page", { duration: 0.5, opacity: 0, display: "none" });
    gsap.fromTo(
      ".plan",
      { y: 1000, opacity: 0, display: "none" },
      { duration: 1, delay: 0.5, opacity: 1, display: "flex", y: 0 }
    );
  }
});
planBtn.addEventListener("click", function () {
  if (user == undefined) {
    signInFunction().then(() => {
      planBtn.click();
    });
  } else {
    console.log("Let's focus on ramadan");
    gsap.to("main", { duration: 0.5, opacity: 0, display: "none" });
    gsap.to(".quran-tab", { duration: 0.5, opacity: 0, display: "none" });
    gsap.to(".sebha-page", { duration: 0.5, opacity: 0, display: "none" });
    gsap.to(".plan", { duration: 0.5, opacity: 0, display: "none" });
    gsap.fromTo(
      ".my-plan",
      { scale: 0, opacity: 0 },
      { duration: 1, delay: 0.5, opacity: 1, scale: 1, display: "flex" }
    );
    planShow();
  }
});
function planShow() {
  console.log(thePlan);
  if (thePlan == false) {
    document.querySelector(".ShowPlan").style.display = "none";
    document.querySelector(".makePlan").style.display = "block";
  } else {
    document.querySelector(".ShowPlan").style.display = "block";
    document.querySelector(".makePlan").style.display = "none";
  }
}
let today = new hijriDate();
date.textContent = `${today.year} - ${today.month} - ${today.date}`;

mainMenu.addEventListener("click", function () {
  gsap.to(".quran-tab", { duration: 0.5, opacity: 0, display: "none" });
  gsap.to(".sebha-page", { duration: 0.5, opacity: 0, display: "none" });
  gsap.to(".plan", { duration: 0.5, opacity: 0, display: "none" });
  gsap.fromTo(
    "main",
    { x: 2000, opacity: 0 },
    { delay: 0.5, duration: 1, x: 0, opacity: 1, display: "flex" }
  );
});

document.querySelector(".time-question").addEventListener("click", function () {
  if (
    !document.querySelector(".time-answer").style.display ||
    document.querySelector(".time-answer").style.display == "none"
  ) {
    document.querySelector(".time-answer").style.display = "block";
  } else {
    document.querySelector(".time-answer").style.display = "none";
  }
});

document.querySelector(".sit-question").addEventListener("click", function () {
  if (
    !document.querySelector(".sit-answer").style.display ||
    document.querySelector(".sit-answer").style.display == "none"
  ) {
    document.querySelector(".sit-answer").style.display = "block";
  } else {
    document.querySelector(".sit-answer").style.display = "none";
  }
});
document
  .querySelector(".abada-question")
  .addEventListener("click", function () {
    if (
      !document.querySelector(".abada-answer").style.display ||
      document.querySelector(".abada-answer").style.display == "none"
    ) {
      document.querySelector(".abada-answer").style.display = "block";
    } else {
      document.querySelector(".abada-answer").style.display = "none";
    }
  });

document
  .querySelector(".important-question")
  .addEventListener("click", function () {
    if (
      !document.querySelector(".important-answer").style.display ||
      document.querySelector(".important-answer").style.display == "none"
    ) {
      document.querySelector(".important-answer").style.display = "block";
    } else {
      document.querySelector(".important-answer").style.display = "none";
    }
  });

const sebha = document.querySelector("#subha");
sebha.addEventListener("click", function () {
  gsap.to("main", { duration: 0.5, opacity: 0, x: 2000, display: "none" });
  gsap.to(".plan", { duration: 0.5, opacity: 0, display: "none" });
  gsap.to(".quran-tab", { duration: 0.5, opacity: 0, display: "none" });
  gsap.fromTo(
    ".sebha-page",
    { x: -1000, opacity: 0 },
    { x: 0, opacity: 1, display: "flex", delay: 0.5, duration: 1 }
  );
});
document
  .querySelector(".modal-container")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-container")) {
      document.querySelector(".modal-container").style.display = "none";
    }
  });
