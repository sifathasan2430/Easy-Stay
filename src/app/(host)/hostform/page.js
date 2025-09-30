






 "use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import axios from "axios"
import { Checkbox } from "@/components/ui/checkbox"
import propertySchema from "@/zodSchema/propertySchema"
import { useSession } from "next-auth/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoaderOne } from "@/components/ui/loader"
import { toast, Toaster } from "sonner"

 




export default function ReuseableForm() {
  const {data:Session}=useSession()
  const queryClient = useQueryClient()
  
  


  const defaultValue={
      hostId: "",
      title: "room in dhaka",
      description: "this is best room",
      address: "uttoradhaka",
      city: "dhaka",
      state: "mirput state",
      country: "Bangladesj",
      location: {
    type: "Point",
    coordinates: [20, 10], 
  },
      pricePerNight: 40,
      roomType: "private_room",
      maxGuests: 15,
      bedrooms: 2,
      beds: 1,
      bathrooms: 1,
      checkInTime: "14:00",
      checkOutTime: "11:00",
      amenities: [],
      images: [{ url: "https://a0.muscache.com/im/pictures/miso/Hosting-973934339954558939/original/303d46e3-8071-4fd2-ac11-fb73b6995f42.jpeg?im_w=720", isPrimary: false },{ url: "https://a0.muscache.com/im/pictures/miso/Hosting-973934339954558939/original/a6ea2b22-ef8b-4c87-84bd-2f24623913e6.jpeg?im_w=720", isPrimary: true }],
      isActive:true
    }












 const form=useForm({
   resolver: zodResolver(propertySchema),
   defaultValues:defaultValue,
    mode:"onChange"
    
 }
)

const { fields, append, remove } = useFieldArray({
    control:form.control,
    name:'images'
  });






useEffect(()=>{
  if (Session){
    defaultValue.hostId=Session.user._id
    form.reset(defaultValue)
  }
},[Session])

   
  const {data:amenitiesArray,isLoading:amenitiesArrayLoading,isError:amenitiesArrayError} = useQuery({ 
    queryKey: ['amenities'],
     queryFn: async()=> {
         const response=await axios.get('/api/amenity')
         return response.data.amenities
     },
     staleTime:1000*60*5,
    
      })



  const mutation = useMutation({
    mutationFn:async(data)=>{
      
     const response=await axios.post('/api/property',data)
    
    } ,
    onSuccess: (data) => {
      // Invalidate and refetch
        toast.success("Property created successfully")

      queryClient.invalidateQueries({ queryKey: ['property'] })
       console.log(data)

    },
    onError:(error)=>{
   console.log(error)
      toast.error(`Failed: ${error.message}`)
    console.error(error)
    }
  })


 const formData=async(value)=>{
  console.log(value)
   mutation.mutate(value)
 
}
  
  return (
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black my-20">
      <h2 className="text-2xl text-center  font-bold text-neutral-800 dark:text-neutral-200">
         Welcome to Eaststay
       </h2>
       
           
         
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formData)} className="my-8">
<div className=" grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
 
       {[{
        name:"hostId",
        text:'Host Id',
        isDisable:true
       },
       {
        name:"title",
        text:'Title',
        isDisable:false
       }
      ].map((items,index)=>(  <LabelInputContainer key={index+1} ><FormField
         control={form.control}
          name={items.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{items.text}</FormLabel>
              <FormControl>
                <Input placeholder={items.title} {...field} disabled={items.isDisable} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
      </LabelInputContainer>
        )) }
        </div>
        <div className="my-4 md:my-10 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
         <LabelInputContainer className="mb-4">
          <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
               <Textarea
                 {...field}
                  placeholder="Write a detailed description..."
                 rows={4}       />
              </FormControl>
              
              <FormMessage />
            </FormItem>)}
           />
          </LabelInputContainer>
        </div>
         <div className="mb-4 grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-5">
          {
            [{name:"address",text:"Address",placeholder:'12 sector Uttora',type:'text'},{name:"city",text:"City",placeholder:'Dhaka',type:'text'},{name:"state",text:"State",placeholder:'Dhaka',type:'text'},{name:"country",text:"Country",placeholder:'Usa',type:'text'},{name:"latitude",text:"Latitude",placeholder:50,type:'number'},{name:"longitude",text:"Longitude",placeholder:60,type:'number'},{ name: "pricePerNight", text: "Price Per Night", placeholder: 0 ,type:'number'},{ name: "bathrooms", text: "Bathrooms", placeholder: 1,type:'number' },
  { name: "beds", text: "Beds", placeholder: 1,type:'number' },
  { name: "bedrooms", text: "Bedrooms", placeholder: 1 ,type:'number'},
  { name: "maxGuests", text: "Max Guests", placeholder: 1 ,type:'number'},{name: "checkOutTime", text: "Check Out Time", placeholder: '' ,type:'time'},{name: "checkInTime", text: "Check In Time", placeholder: '' ,type:'time'}].map((items,index)=>(  <LabelInputContainer key={index+1} ><FormField
         control={form.control}
          name={items.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{items.text}</FormLabel>
              <FormControl>
                <Input placeholder={items.placeholder} {...field}  type={items.type} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
      </LabelInputContainer>
        ))
          }
          <LabelInputContainer className="md:col-span-1" >
                 <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Your room Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                  [{name:'entire_place',text:"Entire Place"},{name:'private_room',text:'Private Room'},{name:'shared_room',text:'Shared Room'}].map((items,index)=> <SelectItem key={index+1} value={items.name}>{items.text}</SelectItem>)
                  
                   }
                 
                  
                </SelectContent>
              </Select>
             
              <FormMessage />
            </FormItem>
          )}
        />
      </LabelInputContainer>

     
         </div>
         
         <div className="my-5 ">
            <FormField
               
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      IsActive
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                    
                )}
              />
         < h1 className="text-xl font-bold uppercase text-center my-10">Provide the amenities</h1>
      {
        amenitiesArrayLoading && <div className="flex justify-center items-center"> <LoaderOne  /></div>
      }
      {
        amenitiesArrayError && <h1 className="text-xl text-red-700 font-bold">Something on wrong on connecting the database</h1>
      }
  {amenitiesArray && (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
              

            {amenitiesArray && amenitiesArray.map((item) => (
              <FormField
                key={item._id}
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item._id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item._id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item._id
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.name}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                    
                )}
              />
            ))}
          </div>
  )}
</div> 

<div>
             <h2 className="text-xl uppercase font-semibold text-gray-900  dark:text-white text-center my-10">Images</h2>
             <div className="space-y-4">
               {form.watch("images").map((img, idx) => (
                 <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                   <div className="col-span-3">
                     <Input
                       placeholder="Image URL"
                       value={img.url}
                       onChange={(e) => {
                         const updated = [...form.getValues("images")]
                         updated[idx].url = e.target.value
                         form.setValue("images", updated)
                       }} />
                     {form.formState.errors.images?.[idx]?.url && (
                       <p className="mt-1 text-sm text-red-600">{form.formState.errors.images[idx].url.message}</p>
                     )}
                   </div>
                   <div className="flex items-center space-x-2">
                     <input
                       type="checkbox"
                       checked={img.isPrimary}
                       onChange={(e) => {
                         const updated = form.getValues("images").map((i, iIdx) => ({
                           ...i,
                           isPrimary: iIdx === idx ? e.target.checked : false,
                         }))
                         form.setValue("images", updated)
                       }}
                       className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                     />
                     <span className="text-sm text-gray-700 dark:text-gray-200">Primary</span>
                     <button
                       type="button"
                       onClick={() => {
                         const updated = form.getValues("images").filter((_, i) => i !== idx)
                         form.setValue("images", updated.length > 0 ? updated : [{ url: "", isPrimary: true }])
                       }}
                       className="text-red-600 hover:text-red-800 text-sm"
                     >
                       Remove
                     </button>
                   </div>
                 </div>
               ))}
              <div className="flex justify-center  items-center">
                <button
                 type="button"
                 onClick={() => {
                   const updated = [...form.getValues("images"), { url: "", isPrimary: false }]
                   form.setValue("images", updated)
                 }}
             className="h-10 w-[150px] mb-4 text-center rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] "  >
                 + Add Image
               </button>
              </div>
               {form.formState.errors.images && (
                 <p className="mt-1 text-sm text-red-600">{form.formState.errors.images.message}</p>
               )}
             </div>
           </div>
          
       <div className="flex justify-center items-center my-10">
         <button className="cursor-pointer" type="submit">Submit</button>
       </div>
      </form>
    </Form>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
 
const LabelInputContainer = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  )}