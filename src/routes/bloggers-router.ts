import {Request, Response, Router} from "express";
import {bloggersRepository, BloggerType} from "../repositories/bloggers-repository";
import {bloggersService} from "../domain/bloggers-service";
import {bloggerValidation} from "../common/validations/bloggers-validation-params";

const errorData = {
    type: "error",
    title: "incorrect values",
    status: 404,
    detail: "input values must be a string",
    instance: "string",
    additionalProp1: "string",
    additionalProp2: "string",
    additionalProp3: "string"
}

export const bloggersRouter = Router({})

bloggersRouter
    .get('/:id', async (req: Request, res: Response) => {
        const id = +req.params.id
        const blogger: BloggerType | null = await bloggersRepository.getBloggerByID(id)
        if (blogger) {
            return res.send(blogger)
        } else {
            return res.sendStatus(404)
        }
    })
    .get('/', async (req: Request, res: Response) => {
        const bloggers: BloggerType[] = await bloggersService.getAllBloggers()
        return res.send(bloggers)
    })
    .post('/',
        bloggerValidation,
        async (req: Request, res: Response) => {
            const {name, youtubeUrl} = req.body
            const newBlogger: BloggerType | boolean = await bloggersService.createNewBlogger(name, youtubeUrl)
            if (newBlogger) {
                return res.status(201).send(newBlogger)
            } else {
                res.sendStatus(503)
            }
        })
    .put('/:id',
        bloggerValidation,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const {name, youtubeUrl} = req.body
            const isBloggerUpdated: boolean = await bloggersService.updateBloggerByID(id, name, youtubeUrl)
            if (isBloggerUpdated) {
                return res.sendStatus(204)
            } else {
                return res.status(404).send(errorData)
            }
        })
    .delete('/:id', async (req: Request, res: Response) => {
        const id = +req.params.id
        const isBloggerDeleted: boolean = await bloggersService.deleteBloggerByID(id)
        if (isBloggerDeleted) {
            return res.sendStatus(204)
        } else {
            return res.status(404).send(errorData)
        }
    })
    .delete('/', async (req: Request, res: Response) => {
        const isBloggersDeleted = await bloggersRepository.deleteAllBloggers()
        if (isBloggersDeleted) {
            return res.sendStatus(204)
        } else {
            return res.sendStatus(404)
        }
    })