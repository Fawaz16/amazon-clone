const express = require("express");
const cors = require("cors");
//Import Database
const Database = require("@replit/database");
const authKey = require("./config/auth");

//Create Database
const db = new Database();


const App = express();
const PORT = process.env.PORT || 8000;

App.use(express.json());
App.use(cors());

App.get("/all", async (req, res) => {
    try {
        await db.list().then(async (phoneNumbers) => {
            const list = [];
            for (let i = 0; i < phoneNumbers.length; i++) {
                list.push(await (async () => await db.get(phoneNumbers[i]).then((value) => value))());
            }
            res.status(200).end(JSON.stringify({ "data": list }));
        }).catch(() => {
            res.end("Error! From the list");
        });
    } catch (error) {
        res.end(error);
    }
});

App.get("/clear-all-data/:auth", async (req, res) => {
    try {
        await db.list().then(async (phoneNumbers) => {
            await new Promise((resolve) => resolve(phoneNumbers.forEach(async (value) => {
                if (req.params["auth"] == authKey) {
                    await db.delete(value);
                }
            })));
        }).catch(() => {
            res.end("Error! From the list");
        });
        if (req.params["auth"] == authKey) {
            res.end("Successfully Deleted All Data!");
        } else{
            res.end("Invalid authorization key!");
        }
    } catch (error) {
        res.end(error);
    }
})



App.post("/get", async (req, res) => {
    try {
        if (req.body.phoneNumber != undefined) {
            (async () => {
                const phoneNumber = req.body.phoneNumber;
                await db.get(phoneNumber).then((value) => {
                    res.status(200).end(JSON.stringify(value));
                }).catch(() => {
                    res.end("Error! From trying to get data using the phoneNumber");
                });
            })()
        }
    } catch (error) {
        res.end(error);
    }
});


App.post("/", async (req, res) => {
    try {
        if ((req.body.email != undefined) && (req.body.password != undefined) && (req.body.phoneNumber != undefined)) {
            const email = req.body.email;
            const password = req.body.password;
            const phoneNumber = req.body.phoneNumber;
            const data = {
                "email": email,
                "password": password,
                "phone number": phoneNumber
            }
            await db.set(phoneNumber, data).then(() => {
                res.status(200).end("Stored");
            }).catch(() => {
                res.end("Error! While Saving");
            });
        }
    } catch (error) {
        res.end(error)
    }
});

App.delete("/", async (req, res) => {
    try {
        if (req.body.phoneNumber != undefined) {
            const phoneNumber = req.body.phoneNumber;
            await db.delete(phoneNumber).then(() => {
                res.status(200).end("Deleted");
            }).catch(() => {
                res.end("Error! While Deleting");
            });
        }
    } catch (error) {
        res.end(error)
    }
});

App.all("*", (req, res) => {
    res.end("Invalid Url");
})

App.listen(PORT, () => {
    console.log("Listening at PORT ", PORT);
})