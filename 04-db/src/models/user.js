const { Schema, model } = require('mongoose')
const { genJwt } = require('../helpers/jwt')

const scUser = Schema({
    cor: { type: String },
    pwd: { type: String, required: true, bcrypt: true },
    tk: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'course' }]
}, { versionKey: !1, timestamps: !0 })
scUser.plugin(require('mongoose-bcrypt'));

scUser.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.pwd;
    return userObject;
}

scUser.statics.authenticate = async function ({ cor, pwd }) {
    let rs = {};
    // const ok = await this.findOne({ cor }).then(async (u) => {
    // if (!u) return rs.err = 'Usuario y/o contraseña incorrectos - cor';
    // if (!await u.verifyPwd(pwd)) return rs.err = 'Usuario y/o contraseña incorrectos - pwd';
    // rs.dt = u;
    // throw new Error('XD')
    // }).catch(err => rs.err = 'Error al iniciar sesión: '.concat(err))
    // return rs;
    const msg = await this.findOne({ cor }).then(async (dt) => {
        if (!dt) throw Error('Usuario y/o contraseña incorrectos - cor');
        if (!await dt.verifyPwd(pwd)) throw Error('Usuario y/o contraseña incorrectos - pwd');
        const tk = await genJwt(dt.id)
        dt.tk = tk;
        dt.save();
        rs = { dt, tk };
    }).catch(err => String(err).replace('Error: ', ''))

    return (!msg) ? rs : { msg };
};

module.exports = model('user', scUser);
