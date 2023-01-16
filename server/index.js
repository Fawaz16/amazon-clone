const express = require("express");
//Import Database
const Database = require("@replit/database");

//Create Database
const db = new Database();

const App = express();
const PORT = process.env.PORT || 8000;

App.get("/all", async (req, res) => {
    const list = [];
    await db.list().then(async (phoneNumber) => {
        await db.get(phoneNumber).then((value) => {
            list.push(value);
        });
    }).catch(() => {
        res.end("Error! From the list");
    });
    res.status(200).end(list);

});
App.get("/", async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    await db.get(phoneNumber).then((value) => {
        res.status(200).end(value);
    }).catch(() => {
        res.end("Error! While Getting the value");
    });
});

App.post("/", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const data = {
        "Name": name,
        "Password": password,
        "Phone Number": phoneNumber
    }
    await db.set(phoneNumber, data).then(() => {
        res.status(200).end("Stored");
    }).catch(() => {
        res.end("Error! While Saving");
    });
});

App.delete("/", async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    await db.delete(phoneNumber).then(() => {
        res.status(200).end("Deleted");
    }).catch(() => {
        res.end("Error! While Deleting");
    });
});

App.all("*", (req, res) => {
    res.end("Invalid Url");
})

App.listen(PORT, () => {
    console.log("Listening at PORT ", PORT);
})