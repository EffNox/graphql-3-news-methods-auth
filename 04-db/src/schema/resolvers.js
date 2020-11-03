const Course = require('../models/course')
const User = require('../models/user')
module.exports = {
    Query: {
        course: ({ obj, id }) => Course.findById(id),
        // courses: (obj, { p, l }) => Course.find().skip(p).limit(l).populate('user'),
        courses: (obj, { p, l }) => Course.find().skip(p).limit(l),

        user: (obj, { id }) => User.findById(id),
        // users: (obj, { p, l }) => User.find().skip(p).limit(l).populate('courses'),
        users: (obj, { p, l }, { valid, msg, id }) => {
            if (!valid) throw new Error(msg);
            return User.find().skip(p).limit(l)
        }
    },
    Mutation: {
        addCourse: async (obj, { input, user }) => {
            const uObj = await User.findById(user)
            const course = await Course.create({ ...input, user })
            uObj.courses.push(course)
            await uObj.save()
            return course
        },
        updateCourse: async (obj, { id, input }) => await Course.findByIdAndUpdate(id, input),
        deleteCourse: async (obj, { id }) => await Course.findByIdAndDelete(id),

        register: async (obj, { input }) => await User.create(input),
        login: async (obj, { input }) => await User.authenticate(input),
        logOut: async (obj, { id }) => await User.findByIdAndDelete(id),
    },
    User: {
        courses: async (parent) => await Course.find({ user: parent.id })
    },
    Course: {
        user: async (parent) => await User.findById(parent.user)
    }
}
