import Express from 'express'
const PORT = process.env.PORT || 3000
const app = Express()



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})