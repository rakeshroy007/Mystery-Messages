"use client"

import Navbar from "@/components/Navbar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import messages from '@/messages.json'
import Autoplay from "embla-carousel-autoplay"
import { Mail } from "lucide-react"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col">
     {/* Main content */}
     <Navbar />
    <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white px-6 md:px-24 py-12 bg-gray-100">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Dive into the World of Anonymous Conversations</h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700">
          Explore Mystery Message - Where your identity remains a secret.  &#128521;
        </p>
      </section>

      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}    //  It is necessary for autoplay
        className="w-full max-w-2xl shadow-lg rounded-xl ">
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index}>
              <div className="p-4">
                <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg">
                  <CardHeader className="text-xl rounded-xl items-center justify-center font-semibold text-gray-800 border-b pb-3">
                    {message.title}
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start mt-10 mb-4 space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
    <footer className="text-center p-4 md:p-6">
        Designed and Developed with &#10084;
      </footer>
    </div>
  )
}

export default Home