const express = require('express');
const { buildSchema } = require('graphql')
const { parsed: { PORT, GQL, DB } } = require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
let courses = require('./src/data/course')

const app = express();

const schema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    input CourseInput {
        title: String
        views: Int
    }
    
    type Alert {
        msg:String
    }
    
    type Query {
        courses: [Course]
        course(id:ID!): Course!
    }

    type Mutation {
        addCourse(input:CourseInput):Course
        updateCourse(id:ID!,input:CourseInput):Course
        deleteCourse(id:ID!):Alert
    }
`);

const rootValue = {
    courses: () => courses,
    course: ({ id }) => courses.find(c => c.id === id),

    addCourse: ({ input }) => {
        const course = { ...input, id: String(courses.length + 1) }
        courses.push(course)
        return course
    },
    updateCourse: ({ id, input: { title, views } }) => {
        const idx = courses.findIndex(c => c.id === id)
        courses[idx] = { id, title, views }
        return courses[idx]
    },
    deleteCourse: ({ id }) => {
        console.log(id);
        courses = courses.filter(c => c.id !== id);
        return { msg: 'Eliminado con éxito' }
    }
}

app.use('/gql', graphqlHTTP({ schema, rootValue, graphiql: !0 }))

app.listen(PORT, () => console.log(GQL));
