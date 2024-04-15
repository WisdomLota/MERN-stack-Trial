const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Employeemodel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/employee')


app.post('/login', (req, res) => {
    const {email, password} = req.body
    Employeemodel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json('Success')
            } else {
                res.json('the password is incorrect')
            }
        } else {
            res.json('user does not exist')
        }
    })
})
app.post('/register', (req, res) => {
    Employeemodel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})