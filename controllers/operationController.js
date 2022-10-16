const fs = require('fs');

const operations = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/operations.json`))

exports.checkID = (req, res, next) => {
    if (req.params.id * 1 > operations.length) {
        return res.status(404).json({
            status: 'Error',
            message: 'Invalid ID'
        })
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Error',
            message: 'Specify a price and a name'
        })
    }
    next();
}




exports.getAllOperations = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: operations.length,
        data: {
            requestedAt: req.requestTime,
            operations: operations
        }
    })
}

exports.getOperation = (req, res) => {  // For optional parameters add ? at the end (ex: /api/v1/operations/:id?)
    // console.log(req.params);
    const id = parseInt(req.params.id);
    const operation = operations.find(element => element.id === id);


    res.status(200).json({
        status: 'success',
        results: operations.length,
        data: {
            operation
        }
    })

}

exports.createOperation = (req, res) => {
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
        if (err) console.log(err);
    })

    // res.send('Done');
}

exports.updateOperation = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            operation: '<Updated operation here>'
        }
    })
}

exports.deleteOperation = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: null
    })
}

