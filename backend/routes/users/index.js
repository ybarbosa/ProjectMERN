const express = require('express')
const router = express.Router()
const db = require('../../db/infrastructure')
const ObjectId = require('mongodb').ObjectID
const { check, validationResult } = require('express-validator')
const crypt = require('../../db/config/crypto')
const timeStamp = require('../../db/config/timestamp')
const { createUserToken } = require('../../auth')
const dbName = "users"

router.get('/', async (req,res)=> {
	try {
		const collection = await db(dbName)
		const users = await collection.find({}).toArray()
		return res.status(200).json(users)
	}
	catch {
		return res.status(404).send(err)
	}

})

router.get('/:id', async (req, res) => {
	try {
		const collection = await db(dbName)
		const user = await collection.find( {"_id" : ObjectId(req.params.id) } ).toArray()
		return res.status(200).send(user)
	}
	catch {
		res.status(406).send( { mensage: 'User not found' } )
	}
})

router.post('/create',
	[	
		check('email').isEmail().exists().withMessage('Email invalid'),
		check('password').isString().exists().withMessage('Password invalid'),
		check('name').isString().exists().withMessage('Name required'),
		check('lastname').isString().exists().withMessage('Lastname required'),
		check('age').isNumeric().exists().withMessage('Age required')
	], 
	async (req,res) => {
		const erros = validationResult(req)
		req.body.password = await crypt(req.body.password)
		req.body.createdAt = timeStamp
		if(!erros.isEmpty()) {
			return res.status(406).send({ error: erros.array()})
		}
		try {
			const collection = await db(dbName)
			await collection.insertOne(req.body)
			return res.status(201).send(	{ user: req.body, token: createUserToken(req.body._id) }	)
		}
		catch {
			return res.status(404).send({mensage: 'Erro create user'})
		}

})

router.delete('/:id',async (req,res) => {
	try {
		const collection = await db(dbName)
		await collection.deleteOne( { "_id" : ObjectId( req.params.id ) } )
		return res.status(202).send({mensagem: 'User remove'})
	}
	catch {
		return res.status(404).send( { mensagem: 'Error remove user'})
	}
})






module.exports = router