module.exports = {
  middlewareGlobal: (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.sucess = req.flash('sucess');
    res.locals.user = req.session.user
    next();
  },

  outroMiddleware: (req, res, next) => {
    next();
  },

  checkCsrfError: (err, req, res, next) => {
    // if(err && 'EBADCSRFTOKEN' === err.code) {
    //   return res.render('404');
    // }

    if (err) {
      return res.render('404');
    }

    next()
  },

  csrfMiddleware: (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  },

  loginRequired: (req, res, next) => {
    if (!req.session.user) {
      req.flash('errors', 'Voce nao esta logado!')
      req.session.save(() => {
        res.redirect('/')
      })
      return
    }
    next()

  }



}

