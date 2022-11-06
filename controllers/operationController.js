const Operation = require('./../models/operationModel')

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
        requestedAt: req.requestTime,
        // results: operations.length,
        // data: {
        //     operations: operations
        // }
    })
}

exports.getOperation = (req, res) => {  // For optional parameters add ? at the end (ex: /api/v1/operations/:id?)
    // console.log(req.params);
    const id = parseInt(req.params.id);
    const operation = operations.find(element => element.id === id);


    // res.status(200).json({
    //     status: 'success',
    //     results: operations.length,
    //     data: {
    //         operation
    //     }
    // })

}

exports.createOperation = (req, res) => {
   
    res.status(201).json({
        status: 'Success',
        // data: {
        //     operation: newOperation
        // }
    })
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

