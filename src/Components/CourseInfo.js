import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import { setCourse, setStep } from "../slice/courseSlice"
import { COURSE_STATUS } from "../utils/constants"
import IconBtn from "./Btn"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { setUser } from "../slice/profileSlice"

export default function CourseInfo() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = [10,11,12,"UG","PG","GATE","UPSC","JEE","Development","Programming"]
      if (categories.length > 0) {
         console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        // setLoading(true)
        // const result = await editCourseDetails(formData, token)
        // setLoading(false)
        // if (result) {
        //   dispatch(setStep(2))
        //   dispatch(setCourse(result))
        // }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    // setLoading(true)
    // const result = await addCourseDetails(formData, token)
    // if (result) {
    //   dispatch(setStep(2))
    //   dispatch(setCourse(result))
    // }
    // setLoading(false)
  }
  const [formData, setFormData] = useState({
    courseTitle:"",
    courseShortDesc:"",
    coursePrice:"",
    courseCategory:"",
    courseTags:"",
    courseBenefits:"",
    courseRequirements:""
  })
  const { courseTitle, courseShortDesc,coursePrice,courseCategory,courseTags,courseBenefits,courseRequirements } = formData
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    
    axios.post("http://localhost:4000/course",formData).then((result)=>{
      console.log(result);
        if(result.data.success===true){
            dispatch(setUser({...result.data}))
            navigate("/course")
        }
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 mt-10 w-[60%] ml-[18rem] rounded-md border  border-blue-300 bg-blue-500 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className=" text-xl text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          name="courseTitle"
          onChange={handleOnChange}
          {...register("courseTitle", { required: true })}
          className="form-style w-full border-[2px] border-black rounded-xl p-2 text-xl outline-none"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className=" text-richblack-5 text-xl" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          name="courseShortDesc"
          onChange={handleOnChange}
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full border-[2px] border-black rounded-xl p-2 text-xl outline-none"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-xl text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            name="coursePrice"
            onChange={handleOnChange}
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12 border-[2px] border-black rounded-xl p-2 text-xl outline-none"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className=" text-richblack-5 text-xl" htmlFor="courseShortDesc">
        Course Category <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseCategory"
          className="form-style w-full border-[2px] border-black rounded-xl p-2 text-xl outline-none"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category) => (
              <option key={category}>
                {category}
              </option>
            ))}
        </select>
        {errors.courseCategory && (

          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        onChange={handleOnChange}
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      {/* <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      /> */}
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-xl text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          name="courseBenefits"
          onChange={handleOnChange}
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full border-[2px] border-black rounded-xl p-2 text-xl outline-none"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        onChange={handleOnChange}
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      {/* <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div> */}
      <button
          type="submit"
          className="mt-6 ml-[20rem] rounded-[8px] bg-blue-400 py-[8px] px-[12px] hover:bg-blue-500 hover:shadow-lg text-xl font-semibold text-black"
        >
          Add Course
        </button>
    </form>
  )
}
