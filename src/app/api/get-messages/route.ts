import { getServerSession } from "next-auth";       
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from 'next-auth'       
import mongoose from "mongoose";


export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)       
    const user: User = session?.user as User

    if (!session || !session.user) {
        console.log("Under '!session || !session.user' this line...")

        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            {
                status: 401
            }
        )
    }

    
    const userId = new mongoose.Types.ObjectId(user._id)         
    
    try {
        // 📌 Now ekhane amader aggeregation pipeline apply korte hobe, so ekhane amake multiple 'user' create korte hobe, But why we are applying this --> jehetu amader ka6e aktai message array a6e and otai return korte hobe so ekhane problem ho66e jodi amader 5-10k messages hole amra aivabe puro akta array return korte chaibo na, so akhane aggregation pipeline use korbo...
        const user = await UserModel.aggregate([

            { $match: { _id: userId }},        
            { $unwind: '$messages' },         
            { $sort: { 'messages.createdAt': -1 } },       
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },

        ])

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 401
                }
            )
        }
        if (user.length === 0) {
            return Response.json(
                {
                    success: true,
                    message: "No Messages Available"
                },
                {
                    status: 200
                }
            )
        }
        // 📌📌📌
        return Response.json(
            {
                success: true,
                message: "YOU ARE LIVE!",
                messages: user[0].messages      // ➡️ aggregation pipeline return type gives us  array 
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("An unexpected error occured: ", error)
        return Response.json(
            {
                success: false,
                message: "Error while fetching messages"
            },
            {
                status: 500
            }
        )
    }
}