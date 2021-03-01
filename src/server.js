const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost/dice';
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = Promise;

const User = mongoose.model('User', {
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
});

//ROUTES

//GET
app.get('/', (req,res) => {
    console.log('hello you');
});

app.get('/users', async (req,res) => {
    const getUsers = await User.find(req.query);
    if(!getUsers) {
        res.status(404).json({error: 'Users not found'});
    } else {
        res.status(200).json(getUsers);
    }
});

app.get('/users/:name', async (req, res) => {
    User.findOne({firstname: req.params.fname})
    .then((data) => {
        res.json(data);
        console.log(data);
    })
    .catch((err)=> {
        res.status(400).json({error: 'invalid name'});
        console.log(err);
    } )
});


//POST
app.post('/users', async (req, res) => {
    try {
        const newUser = new User({ firstname: req.body.firstname, lastname: req.body.lastname }); 
        await newUser.save();
        res.status(200).json(newUser);
      } catch(err) {
        res.status(400).json({ message: "Could not save user to database", error: err.errors })
      }
    });


    //PUT
    app.put('/users/:id', async(req,res) => {
        try {
            await User.updateOne({_id: req.params.id}, {firstname: req.body.firstname, lastname: req.body.lastname});
            res.status(200).json({success: true});
        } catch(err) {
            res.status(400).json({success: false, err});
            console.log(err);
        }
    });

    app.delete('/users/:id', async(req,res) => {
        try {
            await User.deleteOne({_id: req.params.id});
            res.status(200).json({success:true});
        } catch(err) {
            res.status(400).json({success: false});
            console.log(err);
        }
    })

/*
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url='mongodb://localhost:21017/dice';

const dbName ='dice';

 const client = new MongoClient(url);

client.connect((err) => {
    assert.equal(null, err);
    console.log("Connected to server");

    const db = client.db(dbName);

    insertInput(db, () => {
        client.close();
    });
});

const insertInput = (db, callback) => {
    const collection = db.collection('users');
} */
