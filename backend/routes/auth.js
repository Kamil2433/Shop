const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Import SQLite database connection
const fetchuser = require("../middleware/fetchuser");

const authsrt = "cloudnote";

//register a new user
// Register a new user
router.post("/reg", async (req, res) => {
  const { name, id, password } = req.body;

  // Check if the user ID already exists
  db.get("SELECT COUNT(*) AS count FROM User WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (row.count > 0) {
      res.status(400).json({ error: "ID unavailable, please try with a different ID" });
    } else {
      // Hash the password
      bcrypt.hash(password, 10, async (hashErr, hash) => {
        if (hashErr) {
          console.error(hashErr);
          res.status(500).json({ error: "Internal server error" });
        } else {
          try {
            // Insert the new user into the database
            const insertUserQuery = 'INSERT INTO User (name, password, id) VALUES (?, ?, ?)';
            await db.run(insertUserQuery, [name, hash, id]);

            // Construct the response
            const newUser = { name, id };
            res.json(newUser);
          } catch (insertErr) {
            console.error(insertErr);
            res.status(500).json({ error: "Internal server error" });
          }
        }
      });
    }
  });
});


//login a user
// Login a user
router.post("/", (req, res) => {
  const { id, password } = req.body;

  // Retrieve user data by ID
  db.get("SELECT * FROM User WHERE id = ?", [id], async (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      // Compare passwords
      try {
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
          res.status(400).json({ error: "Invalid Credentials" });
        } else {
          // Construct JWT token
          const data = {
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, authsrt);
          res.json(authtoken);
        }
      } catch (compareErr) {
        console.error(compareErr);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});



router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const tempStmt = db.prepare('SELECT * FROM User WHERE id = ?');
    const userid = await tempStmt.get(req.body.id);
    res.send(userid);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("err");
  }
});

module.exports = router;
