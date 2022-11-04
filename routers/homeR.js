const mongoose = require('mongoose');
const express = require('express');
const Router = express.Router();
const voterSchema = require('../models/signupSchema')
const path = require('path');
const { homedir } = require('os');
const adminSchema = require('../models/adminSchema')
const partySchema = require('../models/partySchema')


Router.get('/', (err, res) => {
    res.render('signup', { title: 'Fill', password: '' })
})


Router.post('/signup', (req, res) => {

    const {
        Fname,
        Lname,
        AadharNumber,
        email,
        password,
        Cpassword
    } = req.body;

    if (password === Cpassword) {
        const voter = new voterSchema({
            Fname,
            Lname,
            AadharNumber,
            email,
            password
        })
        // voter.save(err => {
        // if (err) {
        //     console.log('Error')
        // } else {
        //     res.render('signup', { title: 'Samuel' })
        // }

        // })
        voter.save()
            .then(() => {
                res.render('signin.ejs');
            })
            .catch((error) => {
                res.send(error);
            })
    }
    else {
        res.render('signup', { title: '', password: 'passwords do not match' })
    }

})

Router.get('/signin', (err, res) => {
    res.render('signin', { title: 'Fill', password: '' })
})


Router.post('/signin', (req, res) => {
    const {
        email,
        password
    } = req.body;

    voterSchema.findOne({ email: email })
        .then((savedata) => {
            if (!savedata) {
                // return res.send("invaid");
                adminSchema.findOne({ email: email })
                    .then((savedetail) => {
                        if (!savedetail) {
                            return res.send("invalid");
                        }
                        adminSchema.findOne({ password: password })
                            .then((savepass) => {
                                if (!savepass) {
                                    return res.send("invalid");
                                }
                                return res.render('admin.ejs');
                            })

                    })
            }

            else {
                voterSchema.findOne({ password: password })
                    .then((savepass) => {
                        if (!savepass) {
                            return res.send("invalid");
                        }
                        return res.render('home.ejs');
                    })
            }
        })
        .catch((error) => {
            console.log("error");
        })




})

Router.get('/admin', (err, res) => {
    res.render('admin')
})

Router.post('/addparty', (req, res) => {

    const {
        name,
        desciption
    } = req.body;

    const party = new partySchema({
        name,
        desciption
    })

    party.save()
        .then(() => {
            res.render('admin.ejs');
        })
        .catch((error) => {
            res.send(error);
        })
}


)


Router.get('/votercandidatelist', (req, res) => {
    partySchema.find({}, function (err,parties) {
        res.render('votercandidatelist',{
            partiesList: parties 
        })
    })
})




module.exports = Router;