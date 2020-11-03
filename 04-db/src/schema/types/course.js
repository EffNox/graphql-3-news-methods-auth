module.exports = typeDefs = `
type Course {
    id: ID!
    title: String!
    views: Int
    user: User
}

input CourseInput {
    title: String
    views: Int
}

extend type Query {
    courses(p:Int=0, l:Int=1): [Course]
    course(id:ID!): Course!
}

extend type Mutation {
    addCourse(input:CourseInput, user: ID!):Course
    updateCourse(id:ID!,input:CourseInput):Course
    deleteCourse(id:ID!):Alert
}
`
