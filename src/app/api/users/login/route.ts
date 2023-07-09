import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest){

    try {
        const {email,password} = await request.json()
        const user = await User.findOne({email})
        console.log("🚀 ~ file: route.ts:14 ~ POST ~ user:", user)
        
        if(user){
            const isValidUser = await bcryptjs.compare(password,user.password)
            if(isValidUser){
                //create token data
                const tokenData ={
                    id:user._id,
                    usernam:user.username,
                    email:user.email
                }
                console.log("Token",tokenData)
                const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
                    expiresIn:"1d"
                })
                const response = NextResponse.json({
                    message:"Login Successful",
                    success:true
                })
                response.cookies.set("token",token,{
                    httpOnly:true
                })
                return response
            }

        }
        
    } catch (error:any) {
        console.log("CustomError",error)
        return NextResponse.json({error:error.message},{status:500})
    }


}
