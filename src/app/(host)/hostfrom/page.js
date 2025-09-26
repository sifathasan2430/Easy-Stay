"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { motion } from "framer-motion"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast, Toaster } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react"
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
// Define validation schema



export default function PropertyForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [amenities, setAmenities] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
   
    defaultValues: {
      hostId: "",
      title: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "USA",
      latitude: 0,
      longitude: 0,
      pricePerNight: 0,
      roomType: "",
      maxGuests: 1,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      checkInTime: "14:00",
      checkOutTime: "11:00",
      amenities: [],
      images: [{ url: "", isPrimary: true }],
    },
    mode: "onChange",
  })

  // Handle authentication and hostId
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && session?.user?._id) {
      form.setValue("hostId", session.user._id)
    }
  }, [status, session, form, router])

  // Load amenities from backend
  useEffect(() => {
    axios.get("/api/amenity")
      .then(res => setAmenities(res.data?.amenities || []))
      .catch(err => console.error("Failed to load amenities", err))
  }, [])

  const onSubmit = async (values) => {
    console.log(values)
    setIsSubmitting(true)
    try {
      const res = await axios.post("/api/property", values)
      console.log("Property saved:", res.data)
 toast('Property created successfully', {
            title: 'Success',
        description: res?.data?.message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
   form.reset()
    } catch (err) {
      console.error(" Save failed:", err)
       toast('Property is not create ', {
            title: 'Error',
        description: err.message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
   
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black my-20">
      <h2 className="text-2xl text-center  font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Eaststay
      </h2>
      
 
      <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="Hostid">Host ID</Label>
          <Input
               {...form.register("hostId")}
                 disabled
    /> 
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="Title">Title</Label>
                       <Input
                {...form.register("title")}
                placeholder="Cozy Apartment in NYC"
              />
          </LabelInputContainer>
        </div>
        
<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Description</Label>
                   <Textarea
                 {...form.register("description")}
                 placeholder="Write a detailed description..."
                rows={4}       />
            </LabelInputContainer>
       

</div>
        
<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        
         
                   <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Address</Label>
         <Input
                {...form.register("address")}
                placeholder="123 Main St"
              />
        </LabelInputContainer>
         <LabelInputContainer className="mb-4">
          <Label htmlFor="address">City</Label>
         <Input
                {...form.register("city")}
                placeholder="New York"      />
        </LabelInputContainer>
         <LabelInputContainer className="mb-4">
          <Label htmlFor="state">State</Label>
         <Input
               {...form.register("state")}
                placeholder="NY"  />
        </LabelInputContainer>
           <LabelInputContainer className="mb-4">
          <Label htmlFor="state">Country</Label>
         <Input
               {...form.register("country")}
                placeholder="NY"  />
        </LabelInputContainer>
            
       

</div>

<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        

        <LabelInputContainer className="mb-8">
          <Label htmlFor="longitude">Longitude</Label>
           <Input
              type="number"
               step="any"
                {...form.register("longitude", { valueAsNumber: true })}    />
        </LabelInputContainer>
         <LabelInputContainer className="mb-8">
          <Label htmlFor="Latitude">Latitude</Label>
           <Input
              type="number"
               step="any"
                {...form.register("latitude", { valueAsNumber: true })}    />
        </LabelInputContainer>
 </div>
 <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        

        <LabelInputContainer className="mb-8">
          <Label htmlFor="pricepernight">Price Per Night</Label>
          <Input
                type="number"
                 {...form.register("pricePerNight", { valueAsNumber: true })}       />
        </LabelInputContainer>
         <LabelInputContainer className="mb-8">
          <Label htmlFor="roomType">Room Type</Label>
              {/* <Select
                {...form.register("roomType")}
              >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select room type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rooms</SelectLabel>
           
          <SelectItem value="entire_place">Entire Place</SelectItem>
          <SelectItem value="private_room">Private Room</SelectItem>
          <SelectItem value="blueberry">shared_room</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select> */}
    <Controller
        name="roomType"
        control={form.control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rooms</SelectLabel>
                <SelectItem value="entire_place">Entire Place</SelectItem>
                <SelectItem value="private_room">Private Room</SelectItem>
                <SelectItem value="shared_room">Shared Room</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
            </LabelInputContainer>
             <LabelInputContainer className="mb-8">
          <Label htmlFor="Latitude">Max guests</Label>
           <Input
              type="number"
             
                {...form.register("latitude", { valueAsNumber: true })}    />
        </LabelInputContainer>
          <LabelInputContainer className="mb-8">
          <Label htmlFor="beds">Beds</Label>
          <Input
                type="number"
                 {...form.register("beds", { valueAsNumber: true })}       />
        </LabelInputContainer>
 </div>
 <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        

        <LabelInputContainer className="mb-8">
          <Label htmlFor="bedrooms">Bed rooms</Label>
           <Input
                type="number"
                {...form.register("bedrooms", { valueAsNumber: true })}    />
           </LabelInputContainer>
     
             <LabelInputContainer className="mb-8">
          <Label htmlFor="bathrooms">Bathrooms</Label>
           <Input
              type="number"
             
                {...form.register("bathrooms", { valueAsNumber: true })}    />
        </LabelInputContainer>
          <LabelInputContainer className="mb-8">
          <Label htmlFor="checkInTime">Check In
            Time</Label>
            <Input
                type="time"
                {...form.register("checkInTime")}       />
         </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="checkOutTime">Check Out Time</Label>
           <Input
                type="time"
               {...form.register("checkOutTime")}     />
            </LabelInputContainer>
       
 </div>
    <h1 className="text-xl text-center font-bold my-10 uppercase">Select the amenities</h1>
 <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        

     
      
      <div className="grid grid-cols-2 md:grid-cols-6  gap-4">
     
    {amenities.map((a) => (
        <Controller
          key={a._id}
          name="amenities"
          control={form.control}
          render={({ field }) => {
            const isChecked = field.value?.includes(a._id)

            return (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={a._id}
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...(field.value || []), a._id]) 
                    } else {
                      field.onChange(
                        field.value.filter((id) => id !== a._id) 
                      )
                    }
                  }}
                />
                <Label htmlFor={a._id}>{a.name}</Label>
              </div>
            )
          }}
        />
      ))}
      </div>
      
    
  
       
          
      
            
       
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
       <div className="my-10">
 <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
        
           {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Property"
              )}
        
          <BottomGradient />
        </button>
       </div>
 
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
 
        
      
      </form>
    </div>
  );
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
  );
};
  