exports.getAccueilChef = (req, res) => {
    res.status(200).render('accueilChef', {
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