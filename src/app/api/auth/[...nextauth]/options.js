
import CredentialsProvider from "next-auth/providers/credentials";
 import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt'
import User from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";
import emailSender from "@/utils/emailSender";
export const authOptions = {
  
  providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
    
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
    
  async signIn({ user, account, profile,  credentials }) {
const{name,email}=user
const { provider}=account

    try {
        await dbConnect()
         if (provider==='google'){
 const IsVerifiedUserExists=await User.findOne({email})
 
     const verifyCode=Math.floor(100000 + Math.random()*900000)
     const verifyCodeExpiry=Date.now()+5*60*1000 
      if (IsVerifiedUserExists && IsVerifiedUserExists.isVerified){
      return '/'
     }
      if (IsVerifiedUserExists && !IsVerifiedUserExists.isVerified){
     IsVerifiedUserExists.verifyCode=verifyCode,
     IsVerifiedUserExists.verifyCodeExpiry=verifyCodeExpiry


      return  `/verify/${decodeURIComponent(email)}`
     }
     
        if (!IsVerifiedUserExists) {
        const newUser=new User({
           email,
           username:name,
          
           verifyCode,
           verifyCodeExpiry:Date.now()+5*60*1000 ,
           
        })
  
        await newUser.save()
        await emailSender(verifyCode)
          return `/verify/${decodeURIComponent(email)}`
        }
         }
      
     
      
    } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
    }
    return true
  },
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