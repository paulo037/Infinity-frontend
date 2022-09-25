import bodyParser from 'body-parser'
import express from 'express'
import axios from 'axios'
const app = express()
import cors from 'cors'
import coockieParser from 'cookie-parser'



app.use(coockieParser())
app.use(cors({ credentials: true, origin: `http://localhost:3000` }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/tokens', async (req, res) => {
    const {access_token, refresh_token} = req.cookies
    console.log("tokens")
    res.json({access_token: access_token, refresh_token:refresh_token})
})


app.post('/refreshTokens', async (req, res) => {
    console.log("refresh")
    const {refresh_token} = req.cookies
    await axios.post(`${process.env.URLBASE}/refreshToken`, {refresh_token:refresh_token})
            .catch( (error) => res.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado"))
            .then(response => res.json(response.data).status(200))
    
})



export default app