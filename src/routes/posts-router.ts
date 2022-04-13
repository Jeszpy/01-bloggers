import {Request, Response, Router} from "express";

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

    })
    .get('/', async (req: Request, res: Response) => {

    })
    .post('/',
        async (req: Request, res: Response) => {
            const {title, shortDescription, content, bloggerId} = req.body
        })
    .put('/:id',
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const {title, shortDescription, content, bloggerId} = req.body
        })
    .delete('/:id', async (req: Request, res: Response) => {
        const id = +req.params.id
    })