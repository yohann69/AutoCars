const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const operationRouter = require('./routes/operationRoutes');




const app = express();

app.use(morgan('dev'));




app.use(express.json());

app.use((req, res, next) => {
    console.log('Hiiiii from the middleware');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .json({message: 'Hello World!', app: "AutoCars"});
// })
// app.post('/', (req, res) => {
//     res.send('POST request to the homepage');
// });


// app.get('/api/v1/operations', getAllOperations);
// app.get('/api/v1/operations/:id', getOperation);
// app.post('/api/v1/operations', createOperation);
// app.patch('/api/v1/operations/:id', updateOperation);
// app.delete('/api/v1/operations/:id', deleteOperation);


app.use('/api/v1/operations', operationRouter);
app.use('/api/v1/users', userRouter);



module.exports = app;