import {bloggersRepository, BloggerType} from "../repositories/bloggers-repository";
import {postsRepository} from "../repositories/posts-repository";


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
            const updateBloggerData = {
                id: id,
                name: name,
                youtubeUrl: youtubeUrl
            }
            const result = await bloggersRepository.updateBloggerByID(id, updateBloggerData)
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
        const result = await bloggersRepository.deleteBloggerByID(id)
        if (result) {
            return true
        } else {
            return false
        }
    },
    async deleteAllBloggers(): Promise<boolean> {
        try {
            await bloggersRepository.deleteAllBloggers()
            return true
        } catch (e) {
            return false
        }
    }
}