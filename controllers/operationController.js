const Operation = require('./../models/operationModel')


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

exports.createOperation = async (req, res) => {
    try {
        const newOperation = await Operation.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: {
                operation: newOperation
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: 'Invalid data sent'
        })
    }
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

