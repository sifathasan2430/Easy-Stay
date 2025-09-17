"use client";

import {signIn} from 'next-auth/react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


import { Label } from "@/components/ui/label";
import { useState } from "react";



import { useRouter } from "next/navigation";
import { userData } from '@/zodSchema/userSchema';






export default function SignupForm() {
 
  const [isSignupLoading,setIsSignupLoading]=useState(false)
    const router = useRouter()
   const form = useForm({
    resolver: zodResolver(userData),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    mode:'onChange'
    
  });
 
  const onSubmit = async (data) => {
    console.log(data)
                    
//   try {
//       setIsSignupLoading(true)
//      const response=await axios.post('/api/user/signup', data)
   
//           router.replace(`/verify/${username}`);
//    } catch (error) {
//      console.error('Error during sign-up:', error);
    
    
//    }finally{
//     setIsSignupLoading(false)
//    }
//   };
 
  
  }

  

  return (
    <div className=" my-10  shadow-input mx-auto w-full max-w-md rounded-none bg-white  md:rounded-2xl  dark:bg-black">
      
        <h2 className="text-xl text-center font-bold text-neutral-800 dark:text-neutral-200">
          Signup Here
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           
   <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="jhon" {...field} />
                  </FormControl>
            
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*****" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
              
            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              {
                isSignupLoading ? <span>Loading</span> :<span>Login</span>
              }
              <BottomGradient />
            </button>
          </form>
        </Form>

        
     
     
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};