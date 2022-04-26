import {bloggersRepository, BloggerType, postsByBloggerIDType} from "../repositories/bloggers-repository";
import {postsRepository, PostType} from "../repositories/posts-repository";
import {getPaginationData} from "../common/pagination";

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

export const bloggersService = {
    async getBloggerByID(id: number): Promise<BloggerType | null> {
        return await bloggersRepository.getBloggerByID(id)
    },
    async getAllBloggers(query: any): Promise<BloggerType[]> {
        const {pageNumber, pageSize, skipPagesCount, searchNameTern} = getPaginationData(query)
        return await bloggersRepository.getAllBloggers(pageNumber, pageSize, skipPagesCount, searchNameTern)
    },
    async getPostsByBloggerID(id: number, pageNumber: number = 1, pageSize: number = 10): Promise<postsByBloggerIDType | null> {
        const posts = await postsRepository.getAllPostsByBloggerID(id, )
        const result = resultWithPagination(pageNumber, pageSize, posts)
        if (result) {
            return result
        } else {
            return null
        }
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
            const bloggerID = checkBloggerInDB.id
            const isPostsDelete = await postsRepository.deleteAllPostsByBloggerID(bloggerID)
            if (isPostsDelete){
                return true
            } else {
                return false
            }
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