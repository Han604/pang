const router = require('express').Router();

const { lookbookHandler, followUnfollowHandler, changeAvatarHandler, signinHandler, signupHandler, postHandler, readHandler, userFetchHandler } = require('./handlers')

router.post('/api/signup', signupHandler)

router.post('/api/post', postHandler)

router.post('/api/signin', signinHandler)

router.get('/api/read/:_id', readHandler)

router.get('/api/user/:_id', userFetchHandler)

router.put('/api/newlookbook', lookbookHandler)

router.put('/api/user/:_id/:userId/:action', followUnfollowHandler)

router.put('/api/user/avatar', changeAvatarHandler)
module.exports = router;

