const express = require('express'),
    router = express.Router(),
    mysql = require('mysql')

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'inyourdream',
    database : 'fpwp'
})

router.get('/', (req, res, next) => {
    if (req.session.loggedin) {
        connection.query('SELECT * FROM portfolio', (err, rows, fields) => {
            if (err) throw err
            res.render('admin/index',{
                'portfolio': rows
            })
        })
	} else {
		res.redirect('/admin/login')
	}
})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
	const username = req.body.username
	const password = req.body.password
	if (username && password) {
		connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], (err, results, fields) => {
			if (results.length > 0) {
				req.session.loggedin = true
				res.redirect('/admin')
			} else {
				res.render('login')
			}
		})
	} else {
		res.render('login')
	}
})

router.get('/add', (req, res, next) => {
    if(req.session.loggedin) {
        res.render('admin/add')
    } else {
        res.redirect('/admin/login')
    }
})

router.post('/add', (req, res, next) => {
    let title = req.body.title,
        description = req.body.description,
        image1 = req.files.image1.name,
        image2 = req.files.image2.name,
        image3 = req.files.image3.name

    req.files.image1.mv(`./public/images/portfolio/${image1}`)
    req.files.image2.mv(`./public/images/portfolio/${image2}`)
    req.files.image3.mv(`./public/images/portfolio/${image3}`)

    let portfolio = {
        title,
        description,
        image1,
        image2,
        image3
    }

    connection.query('INSERT INTO portfolio SET ?', portfolio)

    res.redirect('/admin')
})

router.get('/edit/:id', (req, res, next) => {
    if(req.session.loggedin) {
        connection.query('SELECT * FROM portfolio WHERE id = ?', req.params.id, (err, rows, fields) => {
            if (err) throw err
            res.render('admin/edit', {
                'portfolio': rows[0]
            })
        })
    }
})

router.post('/edit/:id', (req, res, next) => {
    let title = req.body.title,
        description = req.body.description,
        image1 = req.files.image1.name,
        image2 = req.files.image2.name,
        image3 = req.files.image3.name

    req.files.image1.mv(`./public/images/portfolio/${image1}`)
    req.files.image2.mv(`./public/images/portfolio/${image2}`)
    req.files.image3.mv(`./public/images/portfolio/${image3}`)

    let portfolio = {
        title,
        description,
        image1,
        image2,
        image3
    }

    connection.query(`UPDATE portfolio SET ? WHERE id = ${req.params.id}`, portfolio, (err, result) => {
        console.log(result)
    })

    res.redirect('/admin')
})

router.get('/delete/:id', (req, res, next) => {
    res.redirect('/admin')
})

router.delete('/delete/:id', (req, res, next) => {
    
    connection.query(`DELETE FROM portfolio WHERE id = ${req.params.id}`, err => {
        if (err) throw err
    })
})

module.exports = router