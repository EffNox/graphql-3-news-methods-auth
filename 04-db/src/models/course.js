const { Schema, model } = require('mongoose')

const sc = Schema({
    title: { type: String },
    views: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
}, { versionKey: !1, timestamps: !0 })

module.exports = model('course', sc);
