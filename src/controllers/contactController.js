const Contact = require('../models/ContactModel');

module.exports = {
  index: (req, res) => res.render('contato', { contact: {} }),

  create: async (req, res) => {
    try {
      const contact = new Contact(req.body);

      await contact.register();

      if (contact.errors.length > 0) {
        req.flash('errors', contact.errors)
        req.session.save(() => res.redirect('back'))
        return
      }

      req.flash('sucess', 'Contato salvo com sucesso')
      req.session.save(() => res.redirect(`/contato/${contact.contact._id}`))
      return
    } catch (e) {
      console.log(e)
      res.render('404')
    }
  },

  show: async (req, res) => {
    try {
      if (!req.params.id) return res.render('404');
      const ContactModel = new Contact()
      const contact = await ContactModel.buscaPorId(String(req.params.id))
      console.log(contact)
      if (!contact) return res.render('404')
      res.render('contato', { contact })
    }
    catch (e) {
      console.log(e)
      res.render('404')
    }
  },

  edit: async (req, res) => {
    try {
      const ContactModel = new Contact(req.body)
      await ContactModel.edit(req.params.id)

      if (ContactModel.errors.length > 0) {
        req.flash('errors', ContactModel.errors)
        req.session.save(() => res.redirect('back'))
        return
      }
      req.flash('sucess', 'Contato editado com sucesso!')
      req.session.save(() => res.redirect(`/contato/${ContactModel.contact._id}`))
      return


    } catch (e) {
      console.log(e)
      res.render('404')
    }
  },

  delete: async (req, res) => {
    try {
      if (!req.params.id) return res.render('404');
      const ContactModel = new Contact(req.body)
      const contact = await ContactModel.delete(req.params.id)
      console.log(contact)
      if (!contact) return res.render('404');

      req.flash('sucess', 'Contato deletado com sucesso!')
      req.session.save(() => {
        return res.redirect('back')
      })

      return
    } catch (e) {
      console.log(e)
      res.render('404')
    }
  }
}