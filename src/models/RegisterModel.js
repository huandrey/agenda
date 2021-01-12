const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const RegisterSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }
    async login() {
        this.checkData()

        if (this.errors.length > 0) return

        await this.userExist()


        if (this.errors.length > 0) {
            this.errors.pop()
        }

        else if (this.errors.length === 0) {
            this.errors.push('Usuario nao cadastrado')

            return
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha invalida')
            this.user = null
            return
        }
    }

    async registerUser() {
        console.log(this.body + ' primeiro')

        this.checkData()

        if (this.errors.length > 0) return

        // User exist? cria : errors.push(error) 
        await this.userExist()

        if (this.errors.length > 0) return

        // "criptografa dados" rash 
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await RegisterModel.create(this.body)
    }

    async userExist() {

        this.user = await RegisterModel.findOne({ email: this.body.email })

        if (this.user) this.errors.push('Usuario ja existe!')

    }

    checkData() {
        this.clearUp()
        // O email precisa ser valido!
        // validator fruto do required
        if (!validator.isEmail(this.body.email)) this.errors.push('Email invalido');

        if (this.body.password.length < 5 || this.body.password.length > 15) {
            this.errors.push('Digite uma senha entre 5 e 20 caracteres')
        }
    }

    clearUp() {
        // req.body = { email: "", password: ""}
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Register;
