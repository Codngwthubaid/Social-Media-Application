import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"
import { INewUser } from "@/types"
import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api"

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
            email : string;
            password : string
        }) => signInAccount(user)
    })
}

// Sign out for user
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}