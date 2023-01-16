
const first = document.getElementById('first')
const second = document.getElementById('second')
const third = document.getElementById('third')



function next(current){
  if(current ==='first'){
    first.style.display='none';
    second.style.display='block';
}
  else if(current ==='second'){
    second.style.display='none';
    third.style.display='block';
}
}




function revealPassword() {
    var checkbox = document.getElementById("revealPasswordCheckbox");
    var password = document.getElementById("password");
    if (checkbox.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }
  