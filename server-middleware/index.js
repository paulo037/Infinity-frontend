import bodyParser from 'body-parser'
import express from 'express'
import axios from 'axios'
const app = express()
import cors from 'cors'
import coockieParser from 'cookie-parser'



app.use(coockieParser())
app.use(cors({ credentials: true, origin: process.env.BASE_FRONT }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/refreshToken', async (req, res) => {

    const {refresh_token} = req.cookies
    await axios.post(`${process.env.URLBASE}/refreshToken`, {refresh_token:refresh_token})
            .catch( (error) => res.status(401).send(error instanceof Error ? error.message : "Houve um erro inesperado"))
            .then(response => res.json(response.data).status(200))
    
})



export default app