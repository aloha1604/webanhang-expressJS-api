//declare express js modul
const express = require('express')
require('dotenv').config();

const app = express()
const port = 3000

//Router

var adminRouter = require('./routes/admin.route')


app.get('/', (req, res) => res.send('Hello World!'))


// app.get('/api/:id', (req, res) => {
//     console.log(req.params.id);
//     let id = parseInt(req.params.id, 10);
//     res.send(req.params.id);
// })

// app.use('/books', bookRouter)
app.use('/admin', adminRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))