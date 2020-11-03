module.exports = `
    type User {
        id: ID!
        cor: String
        pwd: String
        tk: String
        courses: [Course]
    }

    extend type Query {
        users: [User]
        user(id : ID): User
    }

    input UsertInput {
        cor: String!
        pwd: String!
    }

    extend type Mutation {
        register(input:UsertInput): User
        login(input:UsertInput): Alert
        logOut: Alert
    }
`
