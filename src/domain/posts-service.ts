import {postsRepository, PostsWithBloggerNameType, PostType} from "../repositories/posts-repository";
import {bloggersRepository} from "../repositories/bloggers-repository";


export const postsService = {
    async getPostByID(id: number): Promise<PostType | null> {
        return await postsRepository.getPostByID(id)
    },
    async getAllPosts(): Promise<PostType[]> {
        return await postsRepository.getAllPosts()
    },
    async createNewPost(title: string, shortDescription: string, content: string, bloggerId: number): Promise<PostsWithBloggerNameType | boolean> {
        const blogger = await bloggersRepository.getBloggerByID(bloggerId)
        if (!blogger) {
            return false
        }
        const id = +(new Date())
        const newPost: PostsWithBloggerNameType = {
            id: id,
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: blogger.name
        }
        const result = await postsRepository.createNewPost(newPost)
        if (result) {
            return newPost
        } else {
            return false
        }
    },
    async updatePostByID(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        const checkChanges = await postsRepository.getPostByID(id)
        if (!checkChanges) {
            return false
        } else if (checkChanges?.title === title && checkChanges?.shortDescription === shortDescription && checkChanges?.content === content && checkChanges?.bloggerId === bloggerId) {
            return true
        } else {
            const blogger = await bloggersRepository.getBloggerByID(bloggerId)
            if (!blogger){
                return false
            }
            const updatePostData: PostType = {
                id: id,
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                // bloggerName: blogger.name
            }
            const result = await postsRepository.updatePostByID(id, updatePostData)
            if (result) {
                return true
            } else {
                return false
            }
        }
    },
    async deletePostByID(id: number): Promise<boolean> {
        const checkBloggerInDB = await postsRepository.getPostByID(id)
        if (!checkBloggerInDB) {
            return false
        }
        const result = await postsRepository.deletePostByID(id)
        if (result) {
            return true
        } else {
            return false
        }
    },
    async deleteAllPosts(): Promise<boolean> {
        try {
            await postsRepository.deleteAllPosts()
            return true
        } catch (e) {
            return false
        }
    }
}