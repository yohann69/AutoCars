exports.getAccueilAdmin = (req, res) => {
    res.status(200).render('accueilAdmin', {
        title: 'Accueil'
    })
}

exports.getAccueilChef = (req, res) => {
    res.status(200).render('accueilChef', {
        title: 'Accueil'
    })
}

exports.getAccueilEmployee = (req, res) => {
    res.status(200).render('accueilEmployee', {
        title: 'Accueil'
    })
}





exports.getAccueil =  (req, res) => {
	res.status(200).render('base', {
		title: 'Accueil'
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