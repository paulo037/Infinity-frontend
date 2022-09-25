import bodyParser from 'body-parser'
import express from 'express'
import axios from 'axios'
const app = express()
import cors from 'cors'
import coockieParser from 'cookie-parser'



app.use(coockieParser())
app.use(cors({ credentials: true, origin: "*" }));
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
    const response = await axios.post(`${process.env.URLBASE}/refreshToken`, {refresh_token:refresh_token}).catch(e => console.log(e))
    console.log(response.data)
    res.json(response.data).status(200)
})



export default app