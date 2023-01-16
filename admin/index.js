let Email, lastName, phoneNumber, password, pin, amount;
let clientDetails = document.querySelector('#clientDetails');
// let adminName = document.querySelector("#admin_name");
let total_client = document.querySelector("#total_client");

function createCard() {
    const cardDiv = document.createElement('div');
    const cardHead = document.createElement('div');
    const cardBody = document.createElement('div');
    const table = document.createElement('table');
    const tableRowEmail = document.createElement('tr');
    const tableRowPhoneNumber = document.createElement('tr');
    const tableRowPassword = document.createElement('tr');
    const tableRowHeadEmail = document.createElement('th');
    const tableRowHeadPhoneNumber = document.createElement('th');
    const tableRowHeadPassword = document.createElement('th');
    const tableDataEmail = document.createElement('td');
    const tableDataLastName = document.createElement('td');
    const tableDataPhoneNumber = document.createElement('td');
    const tableDataPassword = document.createElement('td');
    const cardFooter = document.createElement('div');

    cardDiv.className = "card";
    cardHead.className = "card-header text-center bg-dark text-light";
    cardHead.textContent = "Client Details";
    cardBody.className = "card-body p-5";

    table.className = "table";
    tableRowHeadEmail.scope = tableRowHeadPhoneNumber.scope = tableRowHeadPassword.scope = "row";
    tableRowHeadEmail.textContent = "Email";
    tableDataEmail.textContent = Email;
    tableRowHeadPhoneNumber.textContent = "Phone Number";
    tableDataPhoneNumber.textContent = phoneNumber;
    tableRowHeadPassword.textContent = "Password";
    tableDataPassword.textContent = password;

    cardFooter.className = "card-footer text-center";


    tableRowEmail.appendChild(tableRowHeadEmail);
    tableRowEmail.appendChild(tableDataEmail);

    tableRowPhoneNumber.appendChild(tableRowHeadPhoneNumber);
    tableRowPhoneNumber.appendChild(tableDataPhoneNumber);

    tableRowPassword.appendChild(tableRowHeadPassword);
    tableRowPassword.appendChild(tableDataPassword);


    tableRowAmount.appendChild(tableRowHeadAmount);
    tableRowAmount.appendChild();

    table.appendChild(tableRowEmail);
    table.appendChild(tableRowPhoneNumber);
    table.appendChild(tableRowPassword);

    cardBody.append(table);

    cardDiv.appendChild(cardHead);
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(cardFooter);

    clientDetails.appendChild(cardDiv);
}


window.addEventListener('DOMContentLoaded', () => {
    fetch('https://expressjs-production-58c7.up.railway.app/GetData').then((response) => {
        return response.json();
    }).then((data) => {
        if (data.length >= 1) {
            for (let client of data) {
                Email = client.client_Email;
                phoneNumber = client.client_phonenumber;
                password = client.client_password;
                createCard();
            }
        }
        total_client.textContent = data.length;
    });
});