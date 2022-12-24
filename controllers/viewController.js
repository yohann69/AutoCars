




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