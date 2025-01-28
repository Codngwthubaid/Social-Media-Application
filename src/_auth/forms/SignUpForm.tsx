import React from 'react';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpFormSchema } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';


const SignUpForm: React.FC = () => {

    const { register, handleSubmit, reset } = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: " ",
            username: " ",
            email: " ",
            password: " "
        }
    });

    const navigate = useNavigate();
    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
    const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

    async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
        try {
            const newUser = await createUserAccount(data);
            if (!newUser) return toast.error('Failed to create user account.');


            const session = await signInAccount({ email: data.email, password: data.password });
            if (!session) {
                return toast.error("Sign in fail. Please try again.")
            }
            
            const isLoaggedIn = await checkAuthUser();
            if (isLoaggedIn) {
                reset();
                navigate('/');
                return toast.success("Successfully Sign In")
            }
            else {
                return toast.error("Sign in fail. Please try again.")
            }

        } catch (error) {
            console.log("Error creating user: ", error);
            toast.error('An error occurred while creating the user account.');
        }


    }



    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-13 w-auto" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256">
                    <g fill="#4f39f6" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" >
                        <g transform="scale(10.66667,10.66667)">
                            <path d="M19,3c-1.654,0 -3,1.346 -3,3c0,0.46176 0.11355,0.89399 0.30078,1.28516l-3.71484,3.71484h-4.76953c-0.41427,-1.16125 -1.5148,-2 -2.81641,-2c-1.654,0 -3,1.346 -3,3c0,1.654 1.346,3 3,3c1.30161,0 2.40214,-0.83875 2.81641,-2h4.76953l3.71484,3.71484c-0.18723,0.39116 -0.30078,0.8234 -0.30078,1.28516c0,1.654 1.346,3 3,3c1.654,0 3,-1.346 3,-3c0,-1.654 -1.346,-3 -3,-3c-0.46176,0 -0.89399,0.11355 -1.28516,0.30078l-3.30078,-3.30078l3.30078,-3.30078c0.39116,0.18723 0.8234,0.30078 1.28516,0.30078c1.654,0 3,-1.346 3,-3c0,-1.654 -1.346,-3 -3,-3z"></path>
                        </g>
                    </g>
                </svg>

                <h2 className="mt-4 mb-2 text-center text-4xl font-bold tracking-tight text-white">
                    Create a new account
                </h2>
                <p className='text-sm text-indigo-500'>To use NUSM, please enter your details</p>
            </div>

            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("name")}
                                id="name"
                                type="text"
                                required
                                className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("username")}
                                id="username"
                                type="text"
                                required
                                className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                required
                                className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                required
                                className="block w-full rounded-md bg-gray-500 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-balance font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isCreatingAccount ? (
                                <div className='flex items-center gap-x-2'>
                                    <Loader /> loading...
                                </div>
                            ) : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>

            <p className='text-center my-5 font-semibold'>Already have an account?
                <span className='text-indigo-500'>
                    <Link to="/sign-in"> Log in</Link>
                </span>
            </p>
        </div>
    );
};

export default SignUpForm;