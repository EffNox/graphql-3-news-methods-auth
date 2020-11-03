const { connect, pluralize } = require('mongoose')
const dbCon = async () => {
    try {
        pluralize(null)
        await connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    } catch (er) {
        console.log(er);
        throw new Error('ERROR al inicializar la BD');
    }
}
module.exports = { dbCon }
