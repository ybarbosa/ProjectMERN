const router = require('express').Router()
const db = require('../../db/infrastructure')
const { createUserToken } = require('../../auth')
const bcrypt = require('bcryptjs')
const dbName = "users"
router.post('/', async (req, res) => {
    try{
        const { email, password } = req.body
        const collection = await db(dbName)
        const document = await collection.find( { "email": email }).toArray()
        
        if(!document.length) {
            return res.send(404)
        }

        const { password:hash, _id } = document.find((doc) => doc)
        const comparePassword = bcrypt.compareSync( password, hash )
        
        if(!comparePassword) {
            return res.status(406).send({'mensage': 'password invalid'})
         }
        res.status(200).send( createUserToken(_id) )
    }
    catch( err ){
        res.status(500).send(err)
    }
})


module.exports = router