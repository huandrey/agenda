const Contact = require('../models/ContactModel');

module.exports = {
  index: async (req, res) => {

    const contacts = await Contact.ShowContacts()
    res.render('index', { contacts })
  },

}