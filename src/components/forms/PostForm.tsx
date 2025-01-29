import React, { useState } from 'react';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FileUploader from '../shared/FileUploader';
import { Models } from 'appwrite';
import { postFormSchema } from '@/lib/validation';
import { useCreatePost } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type PostFormProps = {
    posts: Models.Document,
    action: "Create" | "Update";
}

const PostForm: React.FC<PostFormProps> = ({ posts, action }: PostFormProps) => {

    const navigate = useNavigate();
    const { user } = useUserContext();
    const [field, setField] = useState("")
    const { mutateAsync: createPost, isPending: isLoadingCreating } = useCreatePost()

    const { register, handleSubmit, setValue } = useForm<z.infer<typeof postFormSchema>>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            caption: posts ? posts?.caption : "",
            file: [],
            location: posts ? posts?.location : "",
            tags: posts ? posts?.tags.join(",") : ""
        }
    });

    const handleFileUpload = (files: File[]) => {
        setValue("file", files); // Update form value with files array
    };

    async function onSubmit(data: z.infer<typeof postFormSchema>) {

        console.log(data);
        const newPost = await createPost({
            ...data,
            userId: user.id
        })
        console.log(newPost);

        if (!newPost) {
            toast.error('Please try again');
        } else {
            toast.success('Post created successfully');
            navigate('/');
        }
    }

    return (
        <form className="m-4  flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-2'>
                <label className="block text-lg font-medium text-white">
                    Caption
                </label>
                <textarea
                    {...register("caption")}
                    required
                    rows={2}
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <div className='flex flex-col gap-y-2 '>
                <label className="block text-lg font-medium text-white">
                    Add Photos
                </label>
                <FileUploader
                    fieldChange={(files: File[]) => {
                        handleFileUpload(files);
                    }}
                    mediaUrl={posts?.imageUrl}
                />
            </div>
            <div className='flex flex-col gap-y-2 '>
                <label className="block text-lg font-medium text-white">
                    Add Location
                </label>
                <input
                    {...register("location")}
                    required
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <div className='flex flex-col gap-y-2 '>
                <label className="block text-lg font-medium text-white">
                    Add Tags (separate by comma " , ")
                </label>
                <input
                    {...register("tags")}
                    required
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <div className='flex mt-5 justify-end gap-x-5'>
                <button
                    onClick={() => navigate('/')}
                    className='cursor-pointer w-fit px-3 py-1.5 text-balance font-semibold text-white shadow-xs rounded-md bg-gray-800'
                >Cancel</button>
                <button
                    type="submit"
                    className="flex cursor-pointer w-fit justify-center rounded-md bg-[#877EFF] px-3 py-1.5 text-balance font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isLoadingCreating ? 'Submitting...' : 'Submit'}
                </button>
            </div>

        </form>
    )
}

export default PostForm
