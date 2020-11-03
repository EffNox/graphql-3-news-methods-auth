const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const { parsed: { PORT, GQL, DB } } = require('dotenv').config()
const courses = require('./src/data/course')

const typeDefs = `
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    input CourseInput {
        title: String
        views: Int
    }
    
    type Query {
        courses(p:Int,l:Int=1): [Course]
    }
    type Mutation {
        addCourse(input:CourseInput):Course
    }
`;

const resolvers = {
    Query: {
        courses: (obj, { p, l }) => courses
    },
    Mutation: {
        addCourse: (obj, { input }) => {
            const course = { ...input, id: String(courses.length + 1) }
            courses.push(course)
            return course
        }
    }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema })


server.listen(PORT, () => console.log(GQL))
