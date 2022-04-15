import {Request, Response, Router} from "express";
import {postValidation} from "../common/validations/posts-validation-params";
import {bloggersRepository, BloggerType} from "../repositories/bloggers-repository";
import {PostType} from "../repositories/posts-repository";
import {postsService} from "../domain/posts-service";
import {bloggersService} from "../domain/bloggers-service";

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

export const postsRouter = Router({})

postsRouter
    .get('/:id', async (req: Request, res: Response) => {
        const id = +req.params.id
        const post: PostType | null = await postsService.getPostByID(id)
        if (post) {
            return res.send(post)
        } else {
            return res.sendStatus(404)
        }
    })
    .get('/', async (req: Request, res: Response) => {
        const posts: PostType[] = await postsService.getAllPosts()
        return res.send(posts)
    })
    .post('/',
        postValidation,
        async (req: Request, res: Response) => {
            const {title, shortDescription, content, bloggerId} = req.body
            const newPost: PostType | boolean = await postsService.createNewPost(title, shortDescription, content, bloggerId)
            if (newPost) {
                return res.status(201).send(newPost)
            } else {
                return res.status(400).send({
                    "errorsMessages": [
                        {
                            "message": "cant find blogger with this ID",
                            "field": "bloggerId"
                        }
                    ],
                    "resultCode": 0
                })
            }
        })
    .put('/:id',
        postValidation,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const {title, shortDescription, content, bloggerId} = req.body
            const isPostUpdated: boolean = await postsService.updatePostByID(id, title, shortDescription, content, bloggerId)
            if (isPostUpdated) {
                return res.sendStatus(204)
            } else {
                return res.status(404).send(errorData)
            }
        }
    )
    .delete('/:id', async (req: Request, res: Response) => {
        const id = +req.params.id
        const isPostDeleted: boolean = await postsService.deletePostByID(id)
        if (isPostDeleted) {
            return res.sendStatus(204)
        } else {
            return res.status(404).send(errorData)
        }
    })
    .delete('/', async (req: Request, res: Response) => {
        const id = +req.params.id
        const isBloggersDeleted = await postsService.deleteAllPosts()
        if (isBloggersDeleted) {
            return res.sendStatus(204)
        } else {
            return res.sendStatus(404)
        }
    })