const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .json({message: 'Hello World!', app: "AutoCars"});
// })
// app.post('/', (req, res) => {
//     res.send('POST request to the homepage');
// });

const operations = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/operations.json`)
)

app.get('/api/v1/operations', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: operations.length,
        data: {
            operations: operations
        }
    })
})

app.post('/api/v1/operations', (req, res) => {

})



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})