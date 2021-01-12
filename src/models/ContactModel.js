const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dataCreate: {
        type: Date,
        default: Date.now,
    }
})


const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contact = null
    }

    async register() {
        this.checkData()

        if (this.errors.length > 0) return

        // await this.contactExist()

        if (this.errors.length > 0) return

        this.contact = await ContactModel.create(this.body)


    }

    // async contactExist() {
    //     this.contact = await ContactModel.findOne({ phone: this.body.phone })

    //     if (!this.contact) this.errors.push('Numero ja cadastrado')
    // }

    async buscaPorId(id) {
        console.log('cheguei')
        console.log('passei')
        const user = await ContactModel.findById(id)
        return user
    }

    checkData() {
        this.clearUp()
        // O email precisa ser valido!
        // validator fruto do required

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email invalido');
        if (!this.body.name) this.errors.push('Nome eh um campo obrigatorio!');
        if (!this.body.email && !this.body.phone) this.errors.push('O contato precisa ter um email e/ou telefone')


    }

    async edit(id) {
        this.checkData()

        if (this.errors.length > 0) return

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true })


    }

    clearUp() {
        // req.body = { email: "", password: ""}
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            lastname: this.body.lastname,
            email: this.body.email,
            phone: this.body.phone
        }
    }
    // Metodos estaticos

    static async ShowContacts() {
        const contacts = await ContactModel.find()
            .sort({ dataCreate: -1 })
        return contacts
    }

    async delete(id) {
        const contact = await ContactModel.findOneAndDelete({ _id: id });
        return contact
    }

}

module.exports = Contact;