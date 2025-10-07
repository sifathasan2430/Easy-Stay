"use client"
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'; 

// Assuming these are your component imports
 import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"; 

 import { Button } from "@/components/ui/button"; 
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderFour, LoaderThree } from '@/components/ui/loader';

import { useState } from 'react';
import StatsCard from '@/components/Statcard/starCard';
import Container from '@/app/Components/Container/Container';

// --- Helper Function for Status Badge (Modern Look) ---
const getStatusBadge = (status) => {
  let colorClass = 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  let statusText = status;

  switch (status.toLowerCase()) {
    case 'confirmed':
      colorClass = 'bg-green-100 text-green-700 hover:bg-green-200';
      break;
    case 'pending':
      colorClass = 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      break;
    case 'cancelled':
      colorClass = 'bg-red-100 text-red-700 hover:bg-red-200';
      break;
    default:
  
      break;
  }

  // Assuming you have a Badge component (often from a library like Shadcn/ui)
  return (
    <Badge className={`text-xs px-2 py-0.5 font-medium rounded-full ${colorClass}`}>
      {statusText}
    </Badge>
  );
};


const DashboardBookingsTable = () => {

      const [limit,setLimit]=useState(10)
      const [skip,setSkip]=useState(0)
      const {data:session}=useSession()
   
const queryClient = useQueryClient()
const {data:currentBookings,isLoading}=useQuery({
    queryKey:['bookings',limit,skip],
    queryFn:async()=>{
        const response=await axios.get(`/api/bookings`,{
          params:{
            skip,
            limit
          }
        })
        return response.data
    },
     keepPreviousData:keepPreviousData
})
 const totalItems = currentBookings?.total

  // --- Pagination Logic ---

  const handlePrev = () => {
    // Decrement skip, ensuring it never goes below 0
    setSkip(prevSkip => Math.max(0, prevSkip - limit));
  };

  const handleNext = () => {
    // Increment skip
    setSkip(prevSkip => prevSkip + limit);
  };

  // Check if we are at the beginning (skip is 0)
  const isPrevDisabled = skip <= 0;
  
  // Check if advancing by 'limit' would exceed or meet the total number of items
  const isNextDisabled = skip + limit >= totalItems;

  // --- Styling ---

  const buttonClasses = (isDisabled) => 
    `flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md transform active:scale-95 ${
      isDisabled
        ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-inner'
        : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/50'
    }`;

    
  const headers = [
    'ID',  'User', 'Check-in', 'Check-out', 
    'Guests', 'Total Price', 'Status', "Payment"
  ];

  
  return (
   <Container>
    
     <div className=" grid grid-cols-2 sm:grid-cols-4  gap-4 mb-8">
      {


     currentBookings && currentBookings?.statData.map((items,index)=><StatsCard key={index+1} title={items.status} value={items.count}  />)  
      } 
      
      
      
         
      </div>
      <h1 className='text-4xl text-center font-bold uppercase my-15'>Booking table</h1>
   <div className="flex justify-center items-center  bg-gray-50">
    
  <div className="bg-white w-full  h-screen rounded-xl shadow-lg border border-gray-100 p-6">
    {isLoading ? (
   <div  className='grid grid-row-12 grid-cols-12'>
        <LoaderFour className='grid-rows-6 grid-cols-6' />
        </div>
     
    ) : <div> <Table className="w-full text-sm text-gray-600">
          
          <TableHeader className=" bg-white border-b border-gray-200 shadow-sm z-10">
            <TableRow className="text-left hover:bg-white/90">
              {headers.map((header, index) => (
               
                <TableHead 
                  key={index} 
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentBookings && currentBookings?.data.map((booking, index) => (
            
              <TableRow 
                key={booking._id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              >
                
                {/* ID - Bold and prominent for easy tracking */}
                <TableCell className="px-6 py-4 font-semibold text-gray-800">
                  #{booking._id.slice(-0,-6)}...
                </TableCell>
                
               
                
                {/* User Name - Standard text */}
                <TableCell className="px-6 py-4">
                  jhon chena
                </TableCell>
                
                {/* Check-in/out - Standard, maybe a less common font weight */}
                <TableCell className="px-6 py-4 text-gray-500">
                  {(new Date(booking.checkInDate)).toDateString()}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-500">
                    
                  {(new Date(booking.checkInDate)).toDateString()}
                </TableCell>
                
                {/* Guests - Centered or right-aligned for numerical consistency */}
                <TableCell className="px-6 py-4 text-center">
                  {booking.guests}
                </TableCell>
                
                {/* Total Price - Bold for financial data, right-aligned, using a consistent currency format */}
                <TableCell className="px-6 py-4 font-bold text-gray-900 text-right">
                  ${booking.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </TableCell>
                
                {/* Status - Uses the helper component (Badge) for visual feedback */}
                <TableCell className="px-6 py-4 text-center">
                  {getStatusBadge(booking.status)}
                </TableCell>
                 <TableCell className="px-6 py-4 text-center">
                unpaid
                </TableCell>
                
                {/* Actions - Menu button for clean UI (assuming a Dropdown/Popover component for the action) */}
             

              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='my-6'>
  
      <div className="flex justify-center items-center space-x-4 mt-8 p-4  rounded-2xl ">
        
        {/* Previous Button */}
        <button
          disabled={isPrevDisabled}
          onClick={handlePrev}
          className={buttonClasses(isPrevDisabled)}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {/* Next Button */}
        <button
          disabled={isNextDisabled}
          onClick={handleNext}
          className={buttonClasses(isNextDisabled)}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
        
      </div>
      
     
    </div>
    </div>
      }
   
      
      

 
</div>
</div>
    </Container>
        
      
        
      
  
  );
};

export default DashboardBookingsTable;