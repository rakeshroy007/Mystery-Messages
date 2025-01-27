'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"
import { useState } from "react"




const Page = () => {
  
  const { toast } = useToast()
  const router = useRouter()
  const [isClicked, setIsClicked] = useState(false);
  

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({      
    resolver: zodResolver(signInSchema),          
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsClicked(true)
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })
      setIsClicked(false)
  
      if(result?.error) {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: 'destructive'
        })
        setIsClicked(false)
        return; 
      }
  
      if(result?.url) {
        setIsClicked(false)
        router.replace("/dashboard")
      }
    } catch (error: unknown) {
      console.error("Error in signup of user", error)
      toast({
        title: "Login Issue",
        variant: 'destructive'
      })
    } finally {
      setIsClicked(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Messages
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>

        {/* From shadcn 'form' Docs */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username"   // 'Input' tag from : npx shadcn@latest input 
                     {...field}
                        
                     />      
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password"   
                     {...field}
                     />      
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">  
              {isClicked ? "Processing..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
            <p>
                Don&apos;t have a account?{' '}
                <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                    Sign up
                </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Page
