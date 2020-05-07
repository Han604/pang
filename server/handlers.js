'use strict';

const { MongoClient } = require('mongodb')
const assert = require('assert')
const fetch = require('node-fetch');
const bcrypt = require('bcrypt')
const shortid = require('shortid')

const saltRounds = 10


require('dotenv').config();

const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
})

const signinHandler = async (req, res) => {
    const { email, password } = req.body
    console.log(email, 'sign in email');
    await client.connect();
    const db = client.db('pang');
    await db.collection('users')
        .findOne({email: email}, (err, result1) => {
            if(result1) {
                bcrypt.compare(password, result1.password, (err, result2) => {
                    if (result2 == true) {
                        res.status(200).json({status: 200, data: result1})
                    } else {
                        res.status(400).json({status: 400, message: 'PASSWORD INCORRECT'}) 
                    }
                })
            } else {
                res.status(400).json({status:400, message: 'INVALID EMAIL'})
            }
        })
}

const addUserToDatabase = async (user) => {
    try {
        await client.connect();
        const db = client.db('pang');
        const r = await db.collection('users').insertOne(user);
        assert.equal(1, r.insertedCount);
        console.log('user added to database')
    } catch (error) {
        console.log(error.stack)
    }
}

const signupHandler = async (req, res) => {
    const { email, password, confirm, name, username } = req.body;
    await client.connect();
    const db = client.db('pang');

    db.collection('users').findOne({email:email}, (err, result) => {
        if (result) {
            res.status(400).json({status: 400, message: 'ERROR: EMAIL ALREADY IN USE'}); 
        }
    })

    if (password !== confirm) {
        res.status(400).json({status: 400, message: 'ERROR: PASSWORDS DO NOT MATCH'});
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            const data = {
                _id: shortid.generate(),
                email: email, 
                password: hash, 
                name: name, 
                username: username,
                posts: [],
                following: [],
                followedBy: [], 
                avatar: null,
                wardrobe: [],
                lookbook: [],
            }
            console.log(data, 'testdata')
            addUserToDatabase(data)
            res.status(200).json({status: 200, data: data})
        })
    })
}

const postHandler = async (req, res) => { //takes user_id, body, img <optional>, interactedby, comments {_id, link, username, description}
    console.log(req.body,'CONSOLE LOG REQ BODY')
    const {imgURL, description, user_id} = req.body;
    const data = {
        imgURL: imgURL,
        description: description,
        user_id: user_id,
        comments: [],
        _id: shortid()
    }
    try {
        await client.connect()
        const db = client.db('pang');
        const r = await db.collection('posts').insertOne(data)
        assert.equal(1, r.insertedCount)
        console.log('post added to database')
        res.status(200).json({status:200, body: data})
    } catch (error) {
        console.log(error.stack)
        res.status(400).json({status:400})
    }
}

const readHandler = async (req, res) => {
    const userId = req.params._id;
    console.log(userId)
    const resData = []
    await client.connect()
    const db = client.db('pang');
    try {
        db.collection('users').findOne({_id: userId }, (err, result) => { 
            console.log(result, 'result')
            // const following = result.following;
            // following.forEach(user => {
            //     db.collection('posts').find({_id: user})
            //     .toArray((err, result) => { 
            //         result.forEach(post => {
            //             resData.push(post)
            //         }) 
            //     })
            // })
            // res.status(200).json({status: 200, data: resData.sort((a, b) => b.date - a.date)})
        })
    } catch (error) {
        console.log(error.stack)
    }
}

const userFetchHandler = async (req, res) => {
    const _id = req.params._id;
    console.log(_id)
    await client.connect();
    const db = client.db('pang');
        await db.collection('users').findOne({_id: _id}, (err, result) => {
        console.log(result)
        if(result) {
            res.status(200).json({status:200, data: result});
        } else {
            res.status(400).json({status:404, message: 'user does not exist!'})
        }
    })
}

const changeAvatarHandler = async (req, res) => {
    const {imgURL, user_id} = req.body;
    console.log(imgURL, user_id);
    await client.connect();
    const db = client.db('pang');
    await db.collection('users').update({_id: user_id}, {$set : {avatar:imgURL}}, (err, result) => {
        console.log(result)
        if (result) {
            res.status(200).json({status: 200, data: result})
        } else {
            res.status(400).json({status: 400, message:'ERROR'})
        }
    })
}

const followUnfollowHandler = async (req, res) => {
    const _id = req.params._id;
    const userId = req.params.userId;
    const action = req.params.action;

    if (action === false) {
        await client.connect();
        const db = client.db('pang');
        await db.collection('users').update({_id: _id}, {$push : { followedBy : userId}}, (err, result) => {
            if(result) {
                db.collection('users').update({_id: userId}, {$push : { following : _id}}, (err, result) => {
                    if (result) {
                        res.status(200).json({status: 200, data: result})
                    }
                })
            } else {
                res.status(400).json({status: 400, message: 'ERROR USER NOT FOUND'})
            }
        })
    } else {
        await client.connect();
        const db = client.db('pang');
        await db.collection('users').update({_id: _id}, {$pull : { followedBy : userId}}, (err, result) => {
            if(result) {
                db.collection('users').update({_id: userId}, {$pull : { following : _id}}, (err, result) => {
                    if (result) {
                        res.status(200).json({status: 200, data: result})
                    }
                })
            } else {
                res.status(400).json({status: 400, message: 'ERROR USER NOT FOUND'})
            }
        })
    }
}

const lookbookHandler = async (req, res) => {
    const {user_id, name, lookbook} = req.body;
    console.log(lookbook, 'lookbook')
    await client.connect();
    const db = client.db('pang');
    await db.collection('users').updateOne({_id: user_id}, {$push : { lookbook : {name: name, looks: lookbook}}}, (err, result) => {
        if (result) {
            res.status(200).json({status: 200, data: result})
        } else {
            res.status(400).json({status: 400, message: 'ERROR USER NOT FOUND'})
        }
    })
}

module.exports = {lookbookHandler, followUnfollowHandler, signinHandler, signupHandler, postHandler, readHandler, userFetchHandler, changeAvatarHandler};