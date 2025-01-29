import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"
import { INewPost, INewUser } from "@/types"
import { createPost, createUserAccount, signInAccount, signOutAccount } from "../appwrite/api"
import { QUERY_KEYS } from "./queryKeys"


// Creating the user
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

// Sign in for user
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string
        }) => signInAccount(user)
    })
}

// Sign out for user
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}


export const useCreatePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}