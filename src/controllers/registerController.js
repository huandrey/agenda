const Register = require('../models/RegisterModel');

module.exports = {
    index: (req, res) => {
        if (req.session.user) return res.render('logado')
        return res.render('login')
    },
    register: async (req, res) => {
        try {

            const register = new Register(req.body)
            await register.registerUser()

            if (register.errors.length > 0) {
                req.flash('errors', register.errors);
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

        // res.send(register.errors)
        // console.log(login.body)
    },

    login: async (req, res) => {
        try {
            const register = new Register(req.body)

            await register.login()
            console.log(register.errors)
            if (register.errors.length > 0) {
                req.flash('errors', register.errors);
                req.session.save(() => {
                    res.redirect('back');
                })

                return
            }

            req.flash('sucess', 'logado com sucesso!');
            req.session.user = register.user
            req.session.save(() => {
                res.redirect('back');
            })

        }
        catch (e) {
            console.log(e)
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }
}