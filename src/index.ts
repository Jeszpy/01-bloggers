import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser())

const urlValidator = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/

let bloggers = [
    {
        id: 0,
        name: "Dimych",
        youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA",
    },
    {
        id: 1,
        name: "Timur",
        youtubeUrl: "https://www.youtube.com/channel/UCDzGdB9TTgFm8jRXn1tBdoA"
    }
]

let posts = [
    {
        id: 0,
        title: "deploy to heroku",
        shortDescription: "string",
        content: "string",
        bloggerId: 0,
        bloggerName: "Dimych"
    },
    {
        id: 1,
        title: "junior interview",
        shortDescription: "string",
        content: "string",
        bloggerId: 1,
        bloggerName: "Timur"
    }]

const errorData = {
    type: "error",
    title: "incorrect values",
    status: 400,
    detail: "input values must be a string",
    instance: "string",
    additionalProp1: "string",
    additionalProp2: "string",
    additionalProp3: "string"
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express')
})

app.get('/hs_01/api/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(b => b.id === id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})

app.get('/hs_01/api/bloggers/', (req: Request, res: Response) => {
    res.send(bloggers)
})

app.post('/hs_01/api/bloggers/', (req: Request, res: Response) => {
    const id = +(new Date())
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    if ((typeof name || typeof youtubeUrl) !== "string") {
        res.status(errorData.status).send(errorData)
    } else if (!urlValidator.test(req.body.youtubeUrl)) {
        res.send(400).send(errorData)
    }
    else {
        const newBlogger = {
            id: id,
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        if (newBlogger) {
            res.status(201).send(newBlogger)
        } else {
            res.status(errorData.status).send(errorData)
        }
    }
})

app.put('/hs_01/api/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    if ((typeof name || typeof youtubeUrl) === "undefined") {
        res.status(errorData.status).send(errorData)
    } else {
        if ((typeof name || typeof youtubeUrl) !== "string") {
            res.status(errorData.status).send(errorData)
        } else {
            const blogger = bloggers.find(b => b.id === id)
            if (blogger) {
                blogger.name = name
                blogger.youtubeUrl = youtubeUrl
                res.send(204)
            } else {
                res.status(errorData.status).send(errorData)
            }
        }
    }
})

app.delete('/hs_01/api/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggers.find(b => b.id === id)
    if (typeof blogger === "undefined") {
        res.status(404).send(errorData)
    } else {
        for (let i = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
            }
        }
        res.send(204)
    }
})




app.get('/hs_01/api/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const post = posts.find(p => p.id === id)
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})

app.get('/hs_01/api/posts/', (req: Request, res: Response) => {
    res.send(posts)
})

app.post('/hs_01/api/posts/', (req: Request, res: Response) => {
    const id = +(new Date())
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +(req.body.bloggerId)
    const blogger = bloggers.find(b => b.id === bloggerId)
    if (blogger) {
        const bloggerName = blogger.name
        if (typeof title !== "string" || typeof shortDescription !== "string" || typeof content !== "string" || typeof bloggerId !== "number") {
            res.status(errorData.status).send(errorData)
        } else {
            const newPost = {
                id: id,
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                bloggerName: bloggerName
            }
            if (newPost) {
                posts.push(newPost)
                res.status(201).send(newPost)
            } else {
                res.status(errorData.status).send(errorData)
            }
        }
    }


})

app.put('/hs_01/api/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = req.body.bloggerId
    console.log(typeof bloggerId)
    if ((typeof title || typeof shortDescription || typeof content || typeof bloggerId) === "undefined") {
        res.status(errorData.status).send(errorData)
    } else {
        if ((typeof title || typeof shortDescription || typeof content) !== "string" || typeof bloggerId !== "number") {
            res.status(errorData.status).send(errorData)
        } else {
            const post = posts.find(p => p.id === id)
            if (post) {
                post.title = title
                post.shortDescription = shortDescription
                post.content = content
                post.bloggerId = bloggerId
                res.send(204)
            } else {
                res.status(404).send(errorData)
            }
        }
    }
})

app.delete('/hs_01/api/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const post = posts.find(p => p.id === id)
    if (typeof post === "undefined") {
        res.status(404).send(errorData)
    } else {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
            }
        }
        res.send(204)
    }
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})