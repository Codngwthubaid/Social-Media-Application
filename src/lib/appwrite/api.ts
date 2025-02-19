import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,

        });

        return newUser
    } catch (error) {
        console.log(error);
        return error

    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: String;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        );

        return newUser
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: {
    email: string;
    password: string;
}) {
    try {
        await account.deleteSession('current');

        const session = await account.createEmailPasswordSession(
            user.email,
            user.password
        );
        console.log("New session created:", session);
        return session;
    } catch (error) {
        console.log("Error creating session:", error);
        return error;
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if (!currentUser) throw Error

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(post: INewPost) {
    try {
        const uploadedFile = await uploadFile(post.file[0])
        if (!uploadedFile) throw Error

        const fileUrl = getFilePreview(uploadedFile.$id)
        if (!fileUrl) {
            deleteFile(uploadedFile.$id)
            throw Error
        }

        const tags = post.tags?.replace(/ /g, "").split(" , ") || [];
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                ImageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )
        if (!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }
        return newPost;

    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        console.log(uploadedFile);

        return uploadedFile
    } catch (error) {
        console.log(error);
    }
}

export async function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFileView(
            appwriteConfig.storageId,
            fileId)
        console.log(fileUrl);
        return fileUrl
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId)
        return { status: "ok" }
    } catch (error) {
        console.log(error);

    }
}