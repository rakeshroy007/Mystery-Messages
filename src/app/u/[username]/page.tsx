'use client'

import { useToast } from '@/hooks/use-toast'
import { messageSchema } from '@/schemas/messageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"


const initialMessageString = "What's your favorite movie?||Do you have any pets?||What's your dream job?";
const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};


const page = () => {

  const { toast } = useToast()
  const params = useParams<{ username: string }>()
  const username = params?.username ?? ""

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  })

  const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";


  const { watch, setValue } = form
  const messageContent = watch('content')

  const [isLoading, setIsLoading] = useState(false)
  const [isSuggestLoading, setIsSuggestLoading] = useState(false)
  const [generatedMessages, setGeneratedMessages] = useState(initialMessageString)

  const handleMessageClick = (message: string) => {
    setValue('content', message)
  }

  const suggestMessages = async () => {
    try {
      setIsSuggestLoading(true)
      const response = await fetch("/api/gemini-suggest-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedMessages(data.output);
      } else {
        setGeneratedMessages(data.error || "An error occurred while fetching data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setGeneratedMessages("An unexpected error occurred. Please try again.");
    } finally {
      setIsSuggestLoading(false)
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true)

    try {
      const response = await axios.post<ApiResponse>('/api/send-messages', {
        ...data,
        username
      })
      toast({
        title: response.data.message,
        variant: 'default'
      })
      setValue("content", "") // Clear input

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive'
      });

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mt-4 mb-4 p-8 bg-gradient-to-r from-gray-300 to-blue-200 rounded-lg shadow-lg max-w-5xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Public Profile Link
      </h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write your anonymous message here"
                    className="resize-none border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-4"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled className="bg-blue-500 text-white flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-6 my-8">
        <div className="space-y-4">
          {isSuggestLoading ? (
            <Button disabled className="bg-green-300 text-gray-700 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={suggestMessages}
              disabled={isSuggestLoading}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Suggest Messages
            </Button>
          )}
          <p className="text-gray-600">Click on any message below to select it.</p>
        </div>
        <Card className="bg-gray-100 border rounded-lg shadow-md">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {parseStringMessages(generatedMessages).map((message, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleMessageClick(message)}
                className="text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                {message}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>

  )
}

export default page
