
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from 'bcrypt'
import User from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";
export const authOptions = {
  
  providers: [
    
     CredentialsProvider({
  
    name: "Credentials",
    id:'credentials',
   
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        await  dbConnect()
    
      try {
           const user=await User.findOne({
            $or:[{email:credentials?.email},{username:credentials?.username}]
           })
          
           if(!user){
          throw new Error('user not found')
           }
           if (!user.isVerified){
            throw new Error('signup again and verify your account')

           }
          
           const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password)
       
           if (isPasswordCorrect){

            return user
           }else{
            throw new Error('Incorrect Password')
           }
      } catch (error) {
        
      }
    }
  })
   
  ],
  callbacks: {
  async jwt({ token, user}) {
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (user) {
     
      token._id = user._id
      token.username = user.username
      token.isVerified = user.isVerified
      token.role=user.role
    }
    return token
  },
  async session({ session, token,  }) {
    // Send properties to the client, like an access_token and user id from a provider.
     session.user._id = token._id
      session.user.username = token.username
      session.user.isVerified = token.isVerified
      session.user.role=token.role
    
    return session
  }
},
session:{
    strategy:'jwt'
},
secret:process.env.NEXTAUTH_SECRET,
 pages: {
    signIn: '/login',
  },


}