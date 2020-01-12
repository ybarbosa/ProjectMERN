const jwt = require('jsonwebtoken')

const auth = (req,res, next) => {
    const tokenHeader = req.headers.auth

    if(!tokenHeader) return res.status(401).send( { error: 'token not sent' } )

    jwt.verify( tokenHeader, 'xuxinha' ,(err, decoded) => {
        if(err) return res.status(404).send( { error: 'token invalid' } )
    })
    return next()
}

const createUserToken = (user) => {
	return jwt.sign({ id : user }, 'xuxinha', {expiresIn: '7d'} )
}

module.exports = {
    auth,
    createUserToken
};