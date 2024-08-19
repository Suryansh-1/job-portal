import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LastestJobs from './LastestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = props => {
  useGetAllJobs();
  const {user}=useSelector(store=>store.auth)
  const  navigate=useNavigate()
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/companies")
    }
  },[])
  return (
    <div>
        <NavBar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LastestJobs/>
        <Footer/>  
    </div>
  )
}

export default Home