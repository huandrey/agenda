const Login = require('../models/LoginModel');

module.exports = {
    index: (req, res) => {
        res.render('login')
    },
    register: async (req, res) => {
        try {

            const login = new Login(req.body)
            await login.register()

            if (login.errors.length > 0) {
                req.flash('errors', login.errors);
                req.session.save(() => {
                    res.redirect('back');
                })

                return
            }

            req.flash('sucess', 'Seu usuario foi criado com sucesso!');
            req.session.save(() => {
                res.redirect('back');
            })

        } catch (e) {
            console.log(e)
            return res.render('404')
        }

        res.send(login.errors)
        // console.log(login.body)
    },
}