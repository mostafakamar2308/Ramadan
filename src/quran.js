import gsap from "gsap";
let page = {};
let localStorage = window.localStorage;
let pageNum;
if (!localStorage.getItem("pageNum")) {
  localStorage.setItem("pageNum", "1");
  pageNum = 1;
} else {
  pageNum = localStorage.getItem("pageNum");
}
const quranBtn = document.querySelector("#Quran");
quranBtn.addEventListener("click", function () {
  fetch(
    `https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${pageNum}`
  )
    .then((respone) => {
      return respone.json();
    })
    .then((res) => {
      gsap.to("main", { duration: 0.5, x: 2000, opacity: 0, display: "none" });
      gsap.fromTo(
        ".quran-tab",
        { y: -1000, opacity: 0 },
        { duration: 1, opacity: 1, y: 0, display: "flex", delay: 0.5 }
      );
      let verses = res.verses;
      let h = document.createElement("p");
      h.id = "verses";
      Object.keys(verses).forEach((ele) => {
        console.log(verses[ele].verse_key.split(":"));
        h.innerHTML +=
          verses[ele].text_uthmani +
          `&#xFD3F;${verses[ele].verse_key.split(":")[1]}&#xFD3E;`;
        console.log(verses[ele].text_uthmani);
      });
      document.querySelector(".quran-tab").appendChild(h);
    });
});
