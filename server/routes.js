const router = require('express').Router();

const { signinHandler, signupHandler, postHandler, readHandler, userFetchHandler } = require('./handlers')

router.post('/api/signup', signupHandler)

router.post('/api/post', postHandler)

router.post('/api/signin', signinHandler)

router.get('/api/read/:_id', readHandler)

router.get('/api/user/:_id', userFetchHandler)
module.exports = router;

