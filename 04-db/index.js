const express = require('express');
const { parsed: { PORT, GQL, TK_KEY } } = require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const courseTypesDefs = require('./src/schema/types/course')
const resolvers = require('./src/schema/resolvers');
const userTypes = require('./src/schema/types/user');
const { valJwt } = require('./src/middlewares/jwt');
const jwt = require('jsonwebtoken')
require('./src/helpers/db').dbCon();

async function init() {
    const app = express();
    const typeDefs = `
        type Alert {
            msg: String
            tk: String
            dt: User
        }
        
        type Query {
            _: String
        }
        type Mutation {
            _: String
        }
    `
    const context = async ({ req, connection }) => ({ ...req.auth })
    // const context = async ({ req, connection }) => {
    //     const tk = req.header('tk')
    //     if (!tk) return req.auth = { valid: false };
    //     try {
    //         const { id } = jwt.verify(tk, TK_KEY);
    //         req.auth = { valid: true, id }
    //     } catch (er) {
    //         throw new Error('Tk no válido')
    //     }
    // }
    const server = new ApolloServer({
        typeDefs: [typeDefs, courseTypesDefs, userTypes],
        resolvers,
        context
    })
    app.use(valJwt)
    server.applyMiddleware({ app, path: '/gql' })
    app.listen(PORT, () => console.log(GQL));
}

init()
