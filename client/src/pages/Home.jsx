import React from 'react'
import Header from '../components/Header'
import Landingpage from '../components/Landingpage'
import Works from '../components/Works'
import Testimonial from '../components/Testimonial'
import { Career } from '../components/Career'
import Footer from '../components/Footer'
import Register from './Register'

const Home = () => {
  return (
    <div>
     <Header />
     <Landingpage />
     <Works />
     <Testimonial />
     <Career />
     <Footer />
    </div>
  )
}

export default Home