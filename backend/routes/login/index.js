const router = require('express').Router()
const db = require('../../db/infrastructure')
const bcrypt = require('bcryptjs')
const { createUserToken, auth } = require('../../auth')

router.post('/',auth, async (req,res) => {
        const { email,password } = req.body
        const collection = await db("users")
        const user = await collection.find( { "email" : email } ).toArray()
        if(!user.length){
                return res.status(404).send({ mensage: 'User not found' })
        }

        const { password:hash, _id } = user.find((hash) => hash)
        const comparePassword = bcrypt.compareSync( password, hash )
        if(!comparePassword) {
                return res.status(406).send({'mensage': 'password invalid'})
        }
        res.send( { "user": user , token: createUserToken(_id) } )
})

module.exports = router