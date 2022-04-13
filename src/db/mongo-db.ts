import {MongoClient} from 'mongodb'
import {BloggerType} from "../repositories/bloggers-repository";
import {PostType} from '../repositories/posts-repository'

const mongoUri = process.env.mongoURI || "mongodb://localhost:27017/"

const client = new MongoClient(mongoUri);

const db = client.db("bloggers-and-posts")
export const bloggersCollection = db.collection<BloggerType>('bloggers-management')
export const postsCollection = db.collection<PostType>('posts-management')

export async function runDb() {
    try {
        await client.connect();
        await client.db("bloggers-and-posts").command({ping: 1});
        console.log("Connected successfully to mongo server");
        console.log(mongoUri)
    } catch (e) {
        console.log("Cant connect to mongo server:\n", e);
        await client.close();
    }
}
