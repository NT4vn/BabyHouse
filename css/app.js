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
// đăng ký
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formregister");
  const username = document.getElementById("name");
  const password = document.getElementById("password");
  const repassword = document.getElementById("repassword");

  const er_user = document.getElementById("er_user");
  const er_password = document.getElementById("er_password");
  const er_repassword = document.getElementById("er_repassword");
  // lay data tu localstorage
  const userlocal = JSON.parse(localStorage.getItem("users")) || [];

  /** kiem tra emai
   *
   * @param {*} email
   * @returns
   */
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!username.value) {
        er_user.style.display = "block";
      } else {
        er_user.style.display = "none";
      }

      if (!password.value) {
        er_password.style.display = "block";
      } else {
        er_password.style.display = "none";
      }

      if (!repassword.value) {
        er_repassword.style.display = "block";
      } else {
        er_repassword.style.display = "none";
      }

      if (password.value != repassword.value) {
        er_repassword.style.display = "block";
        er_repassword.innerHTML = "Mật khẩu không khớt! ";
      }

      if (!validateEmail(username.value)) {
        er_user.style.display = "block";
        er_user.innerHTML = "Sai định dạng gmail";
      }

      let user;
      if (
        username.value &&
        password.value &&
        repassword.value &&
        password.value === repassword.value &&
        validateEmail(username.value)
      ) {
        user = {
          userId: Math.ceil(Math.random() * 10000000),
          userName: username.value,
          userPass: password.value,
        };
        console.log(user);
        userlocal.push(user);
        localStorage.setItem("users", JSON.stringify(userlocal));
        setTimeout(() => {
          window.location.href = "./dangnhap.html";
        }, 1000);
      }
    });
  }
  // dang nhap
  const form_login = document.getElementById("formlogin");
  const username_login = document.getElementById("name_login");
  const password_login = document.getElementById("password_login");

  const er_user_login = document.getElementById("er_user_login");
  const er_password_login = document.getElementById("er_password_login");

  if (form_login) {
    form_login.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!username_login.value) {
        er_user_login.style.display = "block";
      } else {
        er_user_login.style.display = "none";
      }

      if (!password_login.value) {
        er_password_login.style.display = "block";
      } else {
        er_password_login.style.display = "none";
      }

      if (!validateEmail(username_login.value)) {
        er_user_login.style.display = "block";
        er_user_login.innerHTML = "Sai định dạng gmail";
      }

      const userlocal_login = JSON.parse(localStorage.getItem("users")) || [];
      const finduser = userlocal_login.find(
        (user) =>
          user.userName === username_login.value &&
          user.userPass === password_login.value
      );
      console.log(finduser);
      if (!finduser) {
        alert("Tên đăng nhập hoặc mật khẩu sai!");
      } else {
        alert("Đăng nhập thành công!");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
        localStorage.setItem("userlogin", JSON.stringify(finduser));
      }
    });
  }
});
