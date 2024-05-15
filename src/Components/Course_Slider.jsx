import React, { useEffect, useState } from "react"
// Import Swiper React components

// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import Course_Card from "./Course_Card"

function Course_Slider() {

  const Courses=[
    {thumbnail:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg",
    courseName:"WebDev",
    instructor:{
      firstName:"Sachin",
      lastName:"Singh "
    },
    price:200},

    {thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEDk9H8Kwg-1CyE6NZ5wIKNlPEGI7sKlHwlA&usqp=CAU",
    courseName:"Machine Learning",
    instructor:{
      firstName:"Harsh",
      lastName:"Dayal "
    },
    price:200},

    {thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCgSXM1EubqQogNNr5j_XwBs-dXgW0rmiteQ&usqp=CAU",
    courseName:"SEO Basic to Advance",
    instructor:{
      firstName:"Ayush Raj ",
      lastName:"Chauhan "
    },
    price:200},

    {thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJjoSDdP_D9gTxf68MizFBICKyahRyT32CfA&usqp=CAU",
    courseName:"React Native",
    instructor:{
      firstName:"Nitish",
      lastName:"Chauhan "
    },
    price:200}

  ]

  return (
    <div className="flex">
      {Courses?.length ? (
        <>
          {Courses?.map((course, i) => (
          
              <Course_Card course={course} key={i} />
            
          ))}
        </>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </div>
  )
}

export default Course_Slider
