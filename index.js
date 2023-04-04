const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  // console.log("Write user into DB.");
  // return res.json({ user: {} });

  // Store a user-copy on Chat Engine!
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
        { headers: {"private-key": "15d12ca4-73b8-4f43-967a-cf3533313e01"}}
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
      }
 
    });

    app.post("/login", async (req, res) => {
        const { username, secret } = req.body;
      
        // console.log("Fetch user from DB.");
        // return res.json({ user: {} });
      
        // Fetch this user from Chat Engine in this project!
        try {
          const r = await axios.get("https://api.chatengine.io/users/me/", {
            headers: {
              "Project-ID": 
              '50a90588-790a-4a7e-8683-d1ca25d7a150',
              "User-Name": username,
              "User-Secret": secret,
            },
          });
          return res.status(r.status).json(r.data);
        } catch (e) {
          return res.status(e.response.status).json(e.response.data);
        }
      });    

app.listen(3001);