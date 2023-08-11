require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('id')