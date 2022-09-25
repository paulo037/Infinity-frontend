import bodyParser from 'body-parser'
import express from 'express'

const app = express()
import cors from 'cors'
import coockieParser from 'cookie-parser'



app.use(coockieParser())
app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/tokens', async (req, res) => {
    const {access_token, refresh_token} = req.cookies
    res.json({access_token, refresh_token})
})




export default app