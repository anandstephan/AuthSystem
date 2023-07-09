import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request:NextRequest){
        try {
            const reqBody = await request.json()
            const {username,email,password} = reqBody
            console.log(username,email,password)

            //check if user already exsits
            const user = await User.findOne({email})
              
            if(user){
            return NextResponse.json({error:"User Already exists"},{status:400})                
            }

            //hasPassword
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password,salt)

            const newUser = new User({
                name:username,
                email,
                password:hashedPassword
            })
            const savedUser = await newUser.save()
              return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        


        } catch (error:any) {
            console.log("CustomError",error)
            return NextResponse.json({error:error.message},{status:500})
        }
}

