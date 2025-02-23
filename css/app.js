let list = document.querySelector(".banner .list");
let items = document.querySelectorAll(".banner .list .item");
let dots = document.querySelectorAll(".banner .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active = 0;
let indexItem = items.length - 1;

next.onclick = () => {
  if (active + 1 > indexItem) {
    active = 0;
  } else {
    active++;
  }
  reloadBanner();
};

prev.onclick = () => {
  if (active - 1 < 0) {
    active = indexItem;
  } else {
    active--;
  }
  reloadBanner();
};

dots.forEach((li, index) => {
  li.addEventListener("click", () => {
    active = index;
    reloadBanner();
  });
});

let refreshSlider = setInterval(() => {
  next.click();
}, 5000);

const reloadBanner = () => {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  let lastActive = document.querySelector(".banner .dots li.active");
  lastActive.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000);
};
