const {Router} = require('express')
const { postData, getData, deleteData, patchData } = require('../controller/user.controller')


const userRouter = Router()

userRouter.get('/', getData)
userRouter.post('/', postData)
userRouter.patch('/:id', patchData)
userRouter.delete('/:id', deleteData)


module.exports = {
    userRouter
}

