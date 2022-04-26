import {bloggersCollection, postsCollection} from "../db/mongo-db";
import {postsRepository, PostType} from "./posts-repository";

export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
}

export type postsByBloggerIDType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    "items": PostType []
}

const resultWithPagination = (pageNumber: number, pageSize: number, items: PostType[]): postsByBloggerIDType => {
    const totalCount = items.length
    const pagesCount = Math.ceil(totalCount / pageSize)
    return {
        pagesCount: pagesCount,
        page: 0,
        pageSize: pageSize,
        totalCount: totalCount,
        items: items
    }
}

export const bloggersRepository = {
    async getBloggerByID(id: number): Promise<BloggerType | null> {
        return await bloggersCollection.findOne({id: id})
    },
    async getAllBloggers(pageNumber: number, pageSize: number, skipPagesCount: number, searchNameTern: string | null): Promise<BloggerType[]> {
        let filter = {}
        if (searchNameTern) {
            filter = {name: searchNameTern}
        }
        return await bloggersCollection.find(filter).skip(skipPagesCount).limit(pageSize).toArray()
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