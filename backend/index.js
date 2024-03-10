
const express = require('express')
const app = express()
const port = 3200
const cors = require('cors');



app.use(cors());

app.use(express.json());



// const cors = require('cors');    
// const corsOpts = {
//     origin: '*',
  
// };
// app.use(cors(corsOpts));

// cors:{
//   origin:'*'
// }

app.use('/api/auth',require('./routes/auth'))
app.use('/api/shop',require('./routes/shop'))

// app.get('/', (req, res) => {
//   res.send('Welcome to CloudNote')
// })

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


