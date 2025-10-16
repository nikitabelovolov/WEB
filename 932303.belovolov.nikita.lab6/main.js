const left = document.getElementById("left");
const right = document.getElementById("right");

function showOnlyLeft() {
  left.classList.remove("hidden");
  right.classList.add("hidden");
}

function showBoth() {
  left.classList.remove("hidden");
  right.classList.remove("hidden");
}

function showOnlyRight() {
  left.classList.add("hidden");
  right.classList.remove("hidden");
}
