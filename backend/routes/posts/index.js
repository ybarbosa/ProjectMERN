const express = require('express')
const router = express.Router()
const db = require('../../db/infrastructure')
const timeStamp = require('../../db/config/timestamp')
const ObjectId = require('mongodb').ObjectID
const { check, validationResult } = require('express-validator')

router.post('/',
    [
        check('post').isString().exists().withMessage('Posts required'),
        check('userID').isString().exists().withMessage('id user required')

    ],
    async (req,res) => {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
        return res.status(406).send({error: erros.array()})
    }
    const { userID } = req.body
    req.body.createdAt = timeStamp
    req.body.comments = []
    req.body.likes = []
    try{
        const collectionUser  = await db("users")
        const [{  name, lastname }]=  await collectionUser.find( { "_id" : ObjectId(userID) } ).toArray()
        const collection = await db("posts")
        req.body.createdBy = `${name} ${lastname}`
        await collection.insertOne(req.body)
        res.status(200).send({mensage:  'created new post'})
       
    }
    catch{
        res.status(406).send( { mensage: "error create post" })

    }
    
})

router.patch("/comment/:id",
    [
        check('userID').isString().exists().withMessage('user required'),
        check('comment').isString().exists().withMessage('comment required')
    ],
    async (req,res)=> {
        try{
            const erros = validationResult(req)
            if(!erros.isEmpty()){
                return res.status(406).send({error: erros.array()})
            }

            const postID = req.params.id
            const collection = await db("posts")
            const post = await collection.find({ "_id" :ObjectId(postID) }).toArray()
            
            const { userID } = req.body
            
            const collectionUser = await db("users")
            const [ { name } ] = await collectionUser.find({ "_id" :ObjectId(userID) }).toArray()

            req.body.name = name
            req.body.timeStamp = timeStamp
            await collection.updateOne({ "_id" :ObjectId(postID) }, {$push : { "comments": req.body }} )

            res.sendStatus(204)
        }
        catch{
            res.status(406).send( { mensage: "error create commentt" })
        }
})

router.patch("/likes", async(req, res)=> {
    const {postID, userID} = req.body
    const collection = await db("posts")
    const [{likes}] = await collection.find({ "_id" :ObjectId(postID) }).toArray()

    const collectionUser = await db("users")
    await collectionUser.find({ "_id" :ObjectId(userID) }).toArray()

    if(likes.includes(userID)) {
        await collection.updateOne({ "_id" :ObjectId(postID) }, {$pull : { "likes" : userID }} )
        return res.sendStatus(200)
    }

    await collection.updateOne({ "_id" :ObjectId(postID) }, {$push : { "likes" : userID }} )

    res.sendStatus(200)
})

router.get("/", async (req,res) => {
    try {
		const collection = await db("posts")
		const users = await collection.find({}).toArray()
		return res.status(200).json(users)
	}
	catch (err){
		return res.status(404).send(err)
	}
})

module.exports = router