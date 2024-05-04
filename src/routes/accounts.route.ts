import express from 'express'
import { fund, transfer, withdraw } from '../controllers/AccountsController'

const router = express.Router()


router.post('/transfer', transfer)
router.post('/withdraw', withdraw)
router.post('/fund', fund)