'use client'
import HostTable from "@/components/HostTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import react from "react";

export default function Dashboard  ()  {
 
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex justify-end items-center gap-2">
            
          <div className="mb-10 flex justify-center text-center">
      
        <Button className="cursor-pointer" asChild>
      <Link href="/host/property/new">     
     New Property list
   
    </Link>
    </Button>  
             
    </div>
        </div>
      <HostTable/>
       
      </div>
    </div>
  );
};