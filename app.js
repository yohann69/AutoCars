const fs = require('fs');
const express = require('express');
const { toUSVString } = require('util');
const { request } = require('http');

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

const operations = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/operations.json`))

app.get('/api/v1/operations', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: operations.length,
        data: {
            operations: operations
        }
    })
})


/*  Get operations with a specific id */
app.get('/api/v1/operations/:id', (req, res) => {  // For optional parameters add ? at the end (ex: /api/v1/operations/:id?)
    // console.log(req.params);
    const id = parseInt(req.params.id); 
    const operation = operations.find(element => element.id === id);

    if (!operation) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    } else {
        res.status(200).json({
            status: 'success',
            results: operations.length,
            data: {
                operation
            }
        })
    }
})

app.post('/api/v1/operations', (req, res) => {
    // console.log(req.body);

    const newID = operations[operations.length - 1].id + 1;
    const newOperation = Object.assign({ id: newID }, req.body);

    operations.push(newOperation);
    fs.writeFile(`${__dirname}/dev-data/data/operations.json`, JSON.stringify(operations), err => {
        res.status(201).json({
            status: 'success',
            data: {
                operation: newOperation
            }
        })
    })

    // res.send('Done');
})



app.patch('/api/v1/operations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const operation = operations.find(element => element.id === id);

    if (!operation) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    } else {

        res.status(200).json({
            status: 'success',
            data: {
                operation: '<Updated operation here>'
            }
        })
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})