function revealPassword() {
    var checkbox = document.getElementById("revealPasswordCheckbox");
    var password = document.getElementById("password");
    if (checkbox.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }
  