import { Client, Databases, Account, Storage, Avatars } from "appwrite"

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    saveCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,

}

export const client = new Client();

client.setProject(appwriteConfig.projectId as string);
client.setEndpoint(appwriteConfig.url as string)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client); 
