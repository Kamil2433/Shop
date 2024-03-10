const express = require('express');
const router = express.Router();
const db = require('../db'); // Import SQLite database connection
const fetchuser = require('../middleware/fetchuser'); // Import the fetchuser middleware

// Add new item
router.post('/items', async (req, res) => {
  try {
    const { name } = req.body;
    db.run('INSERT INTO Items (name) VALUES (?)', [name], function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      } else {
        const newItem = { _id: this.lastID, name }; // Assuming you want to return the inserted item
        res.json(newItem);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all items
router.get('/items', async (req, res) => {
  try {
    db.all('SELECT * FROM Items', function(err, items) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      } else {
        res.json(items);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add new list
router.post('/lists', fetchuser, async (req, res) => {
  
  console.log(req.user.id)


  try {
    const { items } = req.body;
    // Assuming items is an array of item names
    const itemNames = items.map(item => `'${item}'`).join(',');
    db.all(`SELECT * FROM Items WHERE name IN (${itemNames})`, async function(err, it) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      } else {
        const itemIds = it.map(item => item._id);
        db.run('INSERT INTO List (user_id) VALUES (?)', [req.user.id], async function(err) {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
          } else {
            const listId = this.lastID;
            const listItemsStmt = db.prepare('INSERT INTO List_Items (list_id, item_id) VALUES (?, ?)');
            for (const itemId of itemIds) {
              await listItemsStmt.run(listId, itemId);
            }
            res.json({ list_id: listId });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get latest list
// router.post('/listslatest', fetchuser, async(req, res) => {
//   try {

//     console.log(req.user.id)

//     db.all('SELECT * FROM List WHERE user_id = ? ORDER BY _id DESC LIMIT 1', [req.user.id], async function(err, latestList) {
//       if (err) {

//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//       } else {
//           console.log("here is the latest list")
//         console.log(latestList)
//         if (!latestList) {
//           res.status(404).json({ message: 'Latest list not found' });
//           return;
//         }

//         const listId = latestList._id;
//         db.all('SELECT Items.name FROM Items INNER JOIN List_Items ON Items._id = List_Items.item_id WHERE List_Items.list_id = ?', [listId], function(err, items) {
//           if (err) {
//             console.error(err);
//             res.status(500).json({ message: 'Server Error' });
//           } else {
//             const itemNames = items.map(item => item.name);
//             res.json(itemNames);
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });



router.post('/listslatest', fetchuser, async (req, res) => {
  try {
      console.log(req.user.id);

      // Connect to the SQLite database
      // const db = new sqlite3.Database(dbPath);

      db.serialize(async () => {
          db.get('SELECT * FROM List WHERE user_id = ? ORDER BY _id DESC LIMIT 1', [req.user.id], async function (err, latestList) {
              if (err) {
                  console.error(err);
                  res.status(500).json({ message: 'Server Error' });
              } else {
                  console.log("here is the latest list");
                  console.log(latestList);

                  if (!latestList) {
                      res.status(404).json({ message: 'Latest list not found' });
                      return;
                  }

                  const listId = latestList._id;
                  db.all(
                    'SELECT Items.name FROM Items INNER JOIN List_Items ON Items._id = List_Items.item_id WHERE List_Items.list_id = ?',
                    [listId],
                    function (err, items) {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Server Error' });
                        } else {
                            const itemNames = items.map(item => item.name);
                            res.json(itemNames);
                        }
                    }
                );
              }
          });
      });

      // Close the database connection
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/listsLastTen', fetchuser, async (req, res) => {
  try {
      console.log(req.user.id);

      db.serialize(async () => {
          // Fetch the last 10 lists for the user
          db.all('SELECT * FROM List WHERE user_id = ? ORDER BY _id DESC LIMIT 10', [req.user.id], async function (err, latestLists) {
              if (err) {
                  console.error(err);
                  res.status(500).json({ message: 'Server Error' });
              } else {
                  console.log("Here are the last 10 lists:");
                  console.log(latestLists);

                  if (latestLists.length === 0) {
                      res.status(404).json({ message: 'No lists found for the user' });
                      return;
                  }

                  // Array to store items from all lists
                  let allItems = [];

                  // Loop through each list to fetch its items
                  for (let i = 0; i < latestLists.length; i++) {
                      const listId = latestLists[i]._id;
                      // Fetch items for the current list
                      const items = await new Promise((resolve, reject) => {
                          db.all(
                              'SELECT Items.name FROM Items INNER JOIN List_Items ON Items._id = List_Items.item_id WHERE List_Items.list_id = ?',
                              [listId],
                              function (err, items) {
                                  if (err) {
                                      console.error(err);
                                      reject(err);
                                  } else {
                                      resolve(items);
                                  }
                              }
                          );
                      });
                      allItems = allItems.concat(items);
                  }

                  // Extract item names from all items
                  const itemNames = allItems.map(item => item.name);
                  res.json(itemNames);
              }
          });
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});






module.exports = router;
