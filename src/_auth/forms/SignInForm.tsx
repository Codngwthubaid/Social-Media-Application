import React from 'react';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signInFormSchema } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';


const SignInForm: React.FC = () => {

  const { register, handleSubmit, reset } = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: " ",
      password: " "
    }
  });

  const navigate = useNavigate();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {

    const session = await signInAccount({ email: data.email, password: data.password });
    if (!session) return toast.error("Sign in fail. Please try again.")

    const isLoaggedIn = await checkAuthUser();

    if (isLoaggedIn) {
      reset();
      navigate("/");
      return toast.success("Successfully Sign In")
    }
  }



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" className='border-2 rounded-2xl border-[#877EFF] animate-border-glow shadow-glow ' viewBox="0 0 300 300">

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" />
              <stop offset="100%" />
            </linearGradient>
          </defs>

          <circle cx="150" cy="150" r="140" fill="url(#gradient)" />

          <ellipse cx="100" cy="100" rx="30" ry="40" fill="#FFF" />
          <ellipse cx="200" cy="100" rx="30" ry="40" fill="#FFF" />
          <circle cx="100" cy="100" r="15" fill="#000" />
          <circle cx="200" cy="100" r="15" fill="#000" />

          <path d="M70,70 Q90,50 110,70" stroke="#000" strokeWidth="8" fill="transparent" strokeLinecap="round" />
          <path d="M190,70 Q210,50 230,70" stroke="#000" strokeWidth="8" fill="transparent" strokeLinecap="round" />
          <path d="M80,180 Q150,250 220,180" stroke="#000" strokeWidth="10" fill="transparent" strokeLinecap="round" />

          <rect x="100" y="180" width="20" height="20" fill="#FFF" />
          <rect x="130" y="180" width="20" height="20" fill="#FFF" />
          <rect x="160" y="180" width="20" height="20" fill="#FFF" />
          <rect x="190" y="180" width="20" height="20" fill="#FFF" />
        </svg>

        <h2 className="mt-4 mb-2 text-center text-4xl font-bold tracking-tight text-white">
          Log in to your account
        </h2>
        <p className='text-sm text-[#877EFF]'>Welcome back! please enter your details</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

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
              className="flex cursor-pointer w-full justify-center rounded-md bg-[#877EFF] px-3 py-1.5 text-balance font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isUserLoading ? (
                <div className='flex items-center gap-x-2'>
                  <Loader /> loading...
                </div>
              ) : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      <p className='text-center my-5 font-semibold'>Don&apos;t have an account?
        <span className='text-[#877EFF]'>
          <Link to="/sign-up"> Sign Up</Link>
        </span>
      </p>
    </div>
  );
};

export default SignInForm;