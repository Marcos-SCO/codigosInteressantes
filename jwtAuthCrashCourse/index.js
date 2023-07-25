const express = require('express');
const app = express();

app.use(express.json());


app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));


// app.get('/', (req, res) => { res.send("Hi on full POWA!");});


app.listen(5000, () => {
  console.log('App is running http://localhost:5000');
})