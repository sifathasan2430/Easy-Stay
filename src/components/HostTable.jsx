"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { LoaderFour } from "./ui/loader"
import axios from "axios"
import { useSession } from "next-auth/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,SelectGroup, SelectLabel } from "./ui/select"
import Link from "next/link"
import { toast } from "sonner"

export default function HostTable() {
    const {data:session}=useSession()
   
const queryClient = useQueryClient()
     const {data:properties,isLoading:propertiesLoading,isError:propertiesError} = useQuery({ 
        queryKey: ["property",session?.user._id,'list'],
        queryFn: async()=> {
             const response=await axios.get('/api/property',{
                params:{
                    host:session?.user._id
                }
             })
          
             return response.data.data
         },
        
      
          })
           
const mutation=useMutation({
    mutationFn:async(id)=>axios.delete(`/api/property/${id}`),
    onSuccess:(data)=>{
        console.log(data)
        toast.success('Data has been deleted')
        queryClient.invalidateQueries({ queryKey: ['property',session?.user._id,'list'] })
    },
    onError:(error)=>{
     console.log(error.message)
     toast.error(error?.message)
    }
})


  return (
  <div>
  {propertiesLoading && (
    <div className="flex justify-center items-center">
      <LoaderFour />
    </div>
  )}

  {propertiesError && (
    <div>
      <h1>Error on data loading</h1>
    </div>
  )}

  {/* Table wrapper for scroll */}
  <div className="max-h-[500px] overflow-y-auto border rounded-md">
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>IsActive</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {properties && properties.map((items) => (
            <TableRow key={items._id}>
              <TableCell className="font-medium">{items._id}</TableCell>
              <TableCell className="font-medium">{items.title}</TableCell>
              <TableCell>{items.isActive ? "Yes" : "No"}</TableCell>
              <TableCell className="font-medium">true</TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Reject">Reject</SelectItem>
                      <SelectItem value="Allow">Allow</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="secondary"> <Link href={`/host/property/${items._id}/edit`}>
                
                  Edit </Link>
                  </Button>
              </TableCell>
              <TableCell>
                <Button onClick={()=>mutation.mutate(items._id)} variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
</div>

  )
}