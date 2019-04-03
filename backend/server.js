const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Issue = require('./models/issues')

const app = express()

const router = express.Router()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/issues')

const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDb connection established succesfully!')
})

router.route('/issues').get((req, resp) => {
    Issue.find((err, res) => {

        if (err)
            console.log(err)
        else
            resp.json(issues)
    })
})

router.route('/issues/:id').get((req, resp) => {
    Issue.findById(req.params.id, (err, res) => {

        if (err)
            console.log(err)
        else
            resp.json(issue)
    })
})

router.route('/issues/add').post((req, resp) => {
    let issue = new Issue(req.body)
    issue.save()
        .then(res => {
            console.log(`=== DEU BOA ===`)
            resp.status(200).json({ 'Issue': 'Added Successfully!' })
    })
        .catch(err => resp.status(400).json('Error adding issue'))
})

router.route('/issues/update/:id').post((req, resp)=> {
    Issue.findById(req.params.id, (err, res)=> {
        if(!res) return next(new Error('Could not found this issue'))
        else {
            issue.title = req.body.title
            issue.responsible = req.body.responsible
            issue.description = req.body.description
            issue.severity = req.body.severity
            issue.status = req.body.status

            issue.save()
                .then(res=> resp.status(200).json({'Issue': 'Updated SuccessFully!'}))
                .catch(err=> resp.status(400).json('Error updating issue'))
        }
    })
})

router.route('/issues/delete/:id').get((req, resp)=> {
    Issue.findById({_id: req.params.id}, (err, res)=>{

        if(!res) return next(new Error('Could not found this issue'))
        else resp.json('Removed Successfully!')
    })
})

app.use('/', router)

app.listen(4000, () => {
    console.log('Express Server running on port 4000')
})