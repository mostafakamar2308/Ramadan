const canvas = document.querySelector("#sebha-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = "30px Comic Sans MS";

const s = document.querySelector("#subhan-Allah");
const h = document.querySelector("#Allah-Akbar");
const a = document.querySelector("#Hamd-Allah");
const m = document.querySelector("#muhammed");
const num = document.querySelector(".sebha-num");

let arr = [];
s.addEventListener("click", function () {
  let w = new word(s.innerHTML);
  arr.push(w);
  moveWords();
  increaseNum();
});
h.addEventListener("click", function () {
  let w = new word(h.innerHTML);
  arr.push(w);
  moveWords();
  increaseNum();
});
a.addEventListener("click", function () {
  let w = new word(a.innerHTML);
  arr.push(w);
  increaseNum();
  moveWords();
});
m.addEventListener("click", function () {
  let w = new word(m.innerHTML);
  arr.push(w);
  increaseNum();
  moveWords();
});
function increaseNum() {
  let number = num.textContent;
  number++;
  let text = String(number).padStart(4, 0);
  num.textContent = text;
}

function word(text) {
  this.type = text;
  this.x = Math.random() * canvas.width;
  this.y = canvas.height;
  this.dy = 2;
  this.color = `hsl(${Math.random() * 360}, 100%, 30%)`;
  this.animate = () => {
    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    ctx.fillText(this.type, this.x, this.y);
  };
  this.update = () => {
    if (this.y < 0) {
      let index = arr.indexOf(word);
      arr.splice(index, 1);
    } else {
      this.y -= this.dy;
    }
    this.animate();
  };
}

function moveWords() {
  requestAnimationFrame(moveWords);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < arr.length; i++) {
    arr[i].update();
  }
}
