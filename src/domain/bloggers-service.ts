import {bloggersCollection} from "../db/mongo-db";
import {bloggersRepository} from "../repositories/bloggers-repository";

export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
}

export type BloggerWithPostsType = {
    id: number
    name: string
    youtubeUrl: string
    posts: []
}

export const bloggersService = {
    async getBloggerByID(id: number): Promise<BloggerType | null> {
        return await bloggersRepository.getBloggerByID(id)
    },
    async getAllBloggers(): Promise<BloggerType[]> {
        return await bloggersRepository.getAllBloggers()
    },
    async createNewBlogger(name: string, youtubeUrl: string): Promise<BloggerType | boolean> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        const result = await bloggersRepository.createNewBlogger(newBlogger)
        if (result) {
            return newBlogger
        } else {
            return false
        }
    },
    async updateBloggerByID(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const checkChanges = await bloggersRepository.getBloggerByID(id)
        if (!checkChanges) {
            return false
        } else if (checkChanges?.name === name && checkChanges?.youtubeUrl === youtubeUrl) {
            return true
        } else {
            const result = await bloggersRepository.updateBloggerByID(id, name, youtubeUrl)
            if (result) {
                return true
            } else {
                return false
            }
        }
    },
    async deleteBloggerByID(id: number): Promise<boolean> {
        const checkBloggerInDB = await bloggersRepository.getBloggerByID(id)
        if (!checkBloggerInDB) {
            return false
        }
        const result = await bloggersCollection.deleteOne({id: id})
        if (result) {
            return true
        } else {
            return false
        }
    },
    async deleteAllBloggers(): Promise<boolean> {
        try {
            await bloggersCollection.deleteMany({})
            return true
        } catch (e) {
            return false
        }
    }
}