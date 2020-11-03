const { GraphQLSchema, GraphQLObjectType, GraphQLString, graphql, GraphQLInt } = require('graphql')
const express = require('express');

const app = express();
const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: {
        title: { type: GraphQLString },
        views: { type: GraphQLInt },
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            msg: {
                type: GraphQLString,
                resolve: () => "Hola Mundo"
            },
            course: {
                type: CourseType,
                resolve: () => ({ title: 'Curso de GraphQL', views: 1000 })
            }
        }),
    })
})

app.get('/', (req, res) => {
    graphql(schema, ` { msg, course{ title views } } `).then(r => res.json(r)).catch(res.json)
})

const { parsed: { PORT, GQL, DB } } = require('dotenv').config()
app.listen(PORT, () => console.log(GQL));
