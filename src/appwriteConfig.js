import {Client,Databases,Account} from "appwrite"
import conf from "./conf"

const client = new Client()

export const PROJECT_ID = conf.appwriteProjectId
export const DATABASE_ID=conf.appwriteDatabaseId
export const COLLECTION_ID_MESSAGE= conf.appwriteCollectionId

client
      .setEndpoint(conf.appwriteUrl)
      .setProject(PROJECT_ID)



export const databases = new Databases(client)
export const account = new Account(client)

export default client