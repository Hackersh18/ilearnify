import React, { useEffect, useState } from "react"
// Icons
import { FaRegStar, FaStar } from "react-icons/fa"
import { addItems } from "../slice/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Cart from "./Cart"

function Course_Card({course}) {

  const cartItems=useSelector((store)=>store.cart.items)

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddItem=(course)=>{
    dispatch(addItems(course))
  }


 


  // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
  // console.log(course.ratingAndReviews)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  // useEffect(() => {
  //   const count = GetAvgRating(course.ratingAndReviews)
  //   setAvgReviewCount(count)
  // }, [course])
  // console.log("count............", avgReviewCount)

  return (
    <>
        <div className="m-4">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`h-[200px] w-[300px] rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-2 py-3">
            <p className="text-xl text-white">{course?.courseName}</p>
            <p className="text-sm text-gray-400">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            {/* <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <ReactStars
                count={5}
                value={avgReviewCount || 0}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaRegStar />}
                fullIcon={<FaStar />}
              />
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div> */}
            <p className="text-xl text-white  ">Rs. {course?.price}</p>
            <div className="cursor-pointer w-1/2 rounded-md bg-yellow-500 px-[20px] py-[8px] font-semibold text-black">
            {!cartItems.includes(course)? (
              <button onClick={()=>handleAddItem(course)} className="blackButton">
                Add to Cart
              </button>
            ):(
              <button onClick={()=>handleAddItem(course)} className="blackButton">
                Buy Now
              </button>
            )}
          </div>
          </div>
        </div>
    </>
  )
}

export default Course_Card
