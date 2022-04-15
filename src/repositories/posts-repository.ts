import {postsCollection} from "../db/mongo-db";

export type PostType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
}

export type PostsWithBloggerNameType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}

export const postsRepository = {
    async getPostByID(id: number): Promise<PostType | null>{
        return await postsCollection.findOne({id: id})
    },
    async getAllPosts(): Promise<PostType[]> {
        return await postsCollection.find({}).toArray()
    },
    async createNewPost(newPost: PostType): Promise<PostType | boolean> {
        try {
            await postsCollection.insertOne(newPost)
            return true
        } catch (e) {
            return false
        }
    },
    async updatePostByID(id: number, updatePostData: PostType): Promise<boolean> {
        try {
            await postsCollection.updateOne({id: id}, {$set: updatePostData})
            return true
        } catch (e) {
            return false
        }
    },
    async deletePostByID(id: number): Promise<boolean> {
        try {
            await postsCollection.deleteOne({id: id})
            return true
        } catch (e) {
            return false
        }
    },
    async deleteAllPosts(): Promise<boolean> {
        try {
            await postsCollection.deleteMany({})
            return true
        } catch (e) {
            return false
        }
    }
}