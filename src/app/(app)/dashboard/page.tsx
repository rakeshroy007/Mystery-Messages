'use client'

import MessageCard from "@/components/MessageCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Message } from "@/model/User"
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"



const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const { toast } = useToast()

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const { data: session, status } = useSession();


  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema)
  })



  const { register, watch, setValue } = form

  const acceptMessages = watch('acceptMessages')     


  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessages)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive"
      })
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])


  const fetchMessages = useCallback(async (refresh: boolean = false) => {    
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data?.messages || [])
      toast({
        title: response.data.message,
        variant: "default"
      })


      if (refresh) {
        toast({
          title: "Refresh Successful",
          description: "Showing latest messages..."
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  }, [setIsLoading, setMessages])


  useEffect(() => {
    if (!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()
  }, [session, setValue, fetchAcceptMessage, fetchMessages])


  // ➡️ handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessages', !acceptMessages)
      toast({
        title: response.data.message,
        variant: 'default'
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive"
      })
    }
  }

  if (!session) {
    return <div className='text-center text-2xl mt-10'>
      <Button>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    </div>
  }
  if (!session.user) {
    return <div className='text-center text-2xl mt-10'>
      <Button>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    </div>
  }

  // 📌   http://localhost:3000/u/akashroy      localhost://localhost:/u/akashroy
  const { username } = session?.user as User       
  const hostname = window.location.hostname ? window.location.hostname : '';
  const protocol = window.location.protocol ? window.location.protocol : '';
  const port = window.location.port ? window.location.port : '';
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const baseUrl = `${protocol}//${hostname}:${port}`
  const profileUrl = `${origin}/u/${username}`
  // const baseUrl = `${window.location.protocol}//${window.location.host}`;
  // const profileUrl = `${baseUrl}/u/${username}`;


  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "URL copied",
      description: "Profile URL has been copied to clipboard"
    })
  }


  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-5 bg-gray-100 rounded-xl shadow-md w-full max-w-6xl">
      {/* Header Section */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        User Dashboard
      </h1>

      {/* Copy Link Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Copy Your Unique Link</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
      </div>

      {/* Switch Section */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
        <label className="flex items-center gap-3">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="text-gray-700 text-sm font-medium">
            Accept Messages: {acceptMessages ? "On" : "Off"}
          </span>
        </label>
      </div>

      <Separator className="my-4" />

      {/* Fetch Messages Button */}
      <div className="ml-3">
        <Button
          className="gap-2 px-6 py-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Messages Section */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No messages to display.</p>
        )}
      </div>
    </div>

  )
}

export default page
