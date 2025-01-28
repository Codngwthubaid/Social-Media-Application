import React from 'react';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FileUploader from '../shared/FileUploader';



const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters" })
})

const PostForm: React.FC = () => {

    const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ""
        }
    });

    function onSubmit(data: z.infer<typeof formSchema>) {

    }


    return (
        <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-4'>
                <label className="block text-lg font-medium text-white">
                    Caption
                </label>
                <textarea
                    {...register}
                    required
                    rows={5}
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <div className='flex flex-col gap-y-4'>
                <label className="block text-lg font-medium text-white">
                    Add Photos
                </label>
                <FileUploader />
            </div>
            <div className='flex flex-col gap-y-4'>
                <label className="block text-lg font-medium text-white">
                    Add Location
                </label>
                <input
                    {...register}
                    required
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <div className='flex flex-col gap-y-4'>
                <label className="block text-lg font-medium text-white">
                    Add Tags (separate by comma " , ")
                </label>
                <input
                    {...register}
                    required
                    className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <div className='flex mt-5 justify-end gap-x-5'>
                <button
                    type="submit"
                    className='cursor-pointer w-fit px-3 py-1.5 text-balance font-semibold text-white shadow-xs rounded-md bg-gray-800'
                >Cancel</button>
                <button
                    type="submit"
                    className="flex cursor-pointer w-fit justify-center rounded-md bg-[#877EFF] px-3 py-1.5 text-balance font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
            </div>

        </form>
    )
}

export default PostForm
