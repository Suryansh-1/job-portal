import React, { useState } from 'react'
import NavBar from './shared/NavBar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const skills=["Html","css","JavaScript","Reactjs"]
const isResume=true;

const Profile = () => {
  useGetAppliedJobs()
  const [open,setOpen]=useState(false);
  const {user}=useSelector(store=>store.auth)

  return (
    <div>
      <NavBar/>
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>

        <div className='flex justify-between'>
        <div className='flex items-center gap-4'>

        <Avatar className="h-24 w-24">
          <AvatarImage src="https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg"/>
        </Avatar>
        <div>
          <h1 className='font-medium text-xl'>{user?.fullname}</h1>
          <p>{user?.profile?.bio}</p>
        </div>
        </div>
        <Button onClick={()=>setOpen(true)}  className="text-right" variant="outline"><Pen/></Button>
        </div>
        <div my-5>
          <div className='flex items-center gap-3 my-2'>
          <Mail/>
          <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
          <Contact/>
          <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1 className='font-semibold'>Skills</h1>
          <div className='flex items-center gap-3 my-2'>
          {
          user?.profile?.skills.length!==0? user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>):
          <span>NA</span>
          }
          </div>
        </div>
        <div className='grid grid-w-full gap-1.5 items-center'>
          <Label className="text-md font-bold ">Resume</Label>
          {
            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
          }
        </div>
      </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-5 '>Applied Jobs</h1>
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog  open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile