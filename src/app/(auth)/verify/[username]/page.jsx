"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { FormSchema } from "@/zodSchema/userSchema"

export default function InputOTPForm() {
  const params=useParams()
  const router=useRouter()
   const [value, setValue] = useState("")
 
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
      username:params?.username
    },
  })

 async function onSubmit(data) {
    console.log(data)
      try {
         const response=await axios.post(`/api/user/verifyCode/${data.username}`,data)
         console.log(response)
         if (response.data?.success){
       toast(response.data?.message, {
      description: 'thanks for verification ',
    })
   router.replace('/login')
  }
      } catch (error) {
          console.log(error?.response)
          toast("Verification vail", {
      description:error.response.data.message
    })
      }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Form wrapper already acts like a provider */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8 flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center space-y-6">
                <FormLabel>One-Time OTP</FormLabel>
                <FormControl>
                  <InputOTP    value={value}
        onChange={(value) => setValue(value)} maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}