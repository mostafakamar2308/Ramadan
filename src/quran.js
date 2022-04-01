import gsap from "gsap";

let localStorage = window.localStorage;
const back = document.querySelector("#backward-aya");
const forward = document.querySelector("#forward-aya");
const pageNumInput = document.querySelector("#pageNum");
if (!localStorage.getItem("pageNum")) {
  localStorage.setItem("pageNum", "1");
  pageNumInput.value = 1;
} else {
  pageNumInput.value = localStorage.getItem("pageNum");
}
const quranBtn = document.querySelector("#Quran");
quranBtn.addEventListener("click", function () {
  gsap.to("main", { duration: 0.5, opacity: 0, display: "none" });
  gsap.to(".plan", { duration: 0.5, opacity: 0, display: "none" });
  gsap.to(".sebha-page", {
    duration: 0.5,
    x: 2000,
    opacity: 0,
    display: "none",
  });
  gsap.fromTo(
    ".quran-tab",
    { y: -1000, opacity: 0 },
    { duration: 1, opacity: 1, y: 0, display: "flex", delay: 0.5 }
  );
  WriteAya();
});
back.addEventListener("click", function () {
  if (pageNumInput.value < 2) {
    pageNumInput.value = 1;
    WriteAya();
  } else {
    pageNumInput.value--;
    WriteAya();
  }
  localStorage.setItem("pageNum", pageNumInput.value);
});
forward.addEventListener("click", function () {
  if (pageNumInput.value > 603) {
    pageNumInput.value = 604;
    WriteAya();
  } else {
    pageNumInput.value++;
    WriteAya();
  }
  localStorage.setItem("pageNum", pageNumInput.value);
});
pageNumInput.addEventListener("change", function () {
  if (pageNumInput.value > 603) {
    pageNumInput.value = 604;
    WriteAya();
  } else if (pageNumInput.value < 2) {
    pageNumInput.value = 1;
    WriteAya();
  } else {
    WriteAya();
  }
  localStorage.setItem("pageNum", pageNumInput.value);
});
function WriteAya() {
  fetch(
    `https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${pageNumInput.value}`
  )
    .then((respone) => {
      return respone.json();
    })
    .then((res) => {
      let verses = res.verses;
      let h = document.querySelector("#verses");
      h.innerHTML = "";
      Object.keys(verses).forEach((ele) => {
        h.innerHTML +=
          verses[ele].text_uthmani +
          `&#xFD3F;${verses[ele].verse_key.split(":")[1]}&#xFD3E;`;
      });
      console.log(verses);
    });
}
