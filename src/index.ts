import 'dotenv/config'
import express, {Request, Response} from 'express'
import cors from 'cors'
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";
import {runDb} from "./db/mongo-db";

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/hs_01/api/bloggers', bloggersRouter)
app.use('/hs_01/api/posts', postsRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
})

const start = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`)
    })
}

start()