import {bloggersCollection} from "../db/mongo-db";

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


export const bloggersRepository = {
    async getBloggerByID(id: number): Promise<BloggerType | null> {
        return await bloggersCollection.findOne({id: id})
    },
    async getAllBloggers(): Promise<BloggerType[]> {
        return await bloggersCollection.find({}).toArray()
    },
    async createNewBlogger(newBlogger: BloggerType): Promise<BloggerType | boolean> {
        try {
            await bloggersCollection.insertOne(newBlogger)
            return true
        } catch (e) {
            return false
        }
    },
    async updateBloggerByID(id: number, updateBloggerData: BloggerType): Promise<boolean> {
        try {
            await bloggersCollection.updateOne({id: id}, {$set: updateBloggerData})
            return true
        } catch (e) {
            return false
        }
    },
    async deleteBloggerByID(id: number): Promise<boolean> {
        try {
            await bloggersCollection.deleteOne({id: id})
            return true
        } catch (e) {
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