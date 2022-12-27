const User = require('../models/userModel')
const Client = require('../models/clientModel')
const Operation = require('../models/operationModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')





exports.getPresentation = (req, res) => {
    res.status(200).render('prez', {
        title: 'Présentation'
    })
}


exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Connexion'
    })
}

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Mon compte'
    })
}





/*=============================================
    =            Administrator            =
=============================================*/
exports.getAccueilAdmin = (req, res) => {
    res.status(200).render('accueilAdmin', {
        title: 'Accueil'
    })
}

exports.getCreateUser = (req, res) => {
    res.status(200).render('createUser', {
        title: 'Créer un utilisateur'
    })
}


exports.getCreateOperation = (req, res) => {
    res.status(200).render('createOperation', {
        title: 'Créer une opération'
    })
}

exports.getManageOperation = catchAsync(async (req, res) => {
    // 1) Get operations data from collection
    const operations = await Operation.find();


    // 2) Build template

    // 3) Render that template using user data from 1)

    res.status(200).render('manageOperation', {
        title: 'Gestion des opérations',
        operations
    })
})

exports.getStatistics = (req, res) => {
    res.status(200).render('statistics', {
        title: 'Statistiques'
    })
}





/*=============================================
        =            Chief            =
=============================================*/
exports.getAccueilChef = (req, res) => {
    res.status(200).render('accueilChef', {
        title: 'Accueil'
    })
}

exports.getCreateClient = (req, res) => {
    res.status(200).render('createClient', {
        title: 'Créer un client'
    })
}

exports.getManageClient = (req, res) => {
    res.status(200).render('manageClient', {
        title: 'Gestion des clients',
        clients
    })
}

exports.getManageVehicules = (req, res) => {
    res.status(200).render('manageVehicles', {
        title: 'Gestion des véhicules',
        // brand,
        // model
    })
}


/*=============================================
      =            Employee            =
=============================================*/
exports.getAccueilEmployee = (req, res) => {
    res.status(200).render('accueilEmployee', {
        title: 'Accueil'
    })
}






/*=============================================
        =            404            =
=============================================*/
exports.get404 = (req, res) => {
    res.status(404).render('error', {
        title: 'Page introuvable'
    })
}