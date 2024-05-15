import axios from "axios"
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../slice/profileSlice"

function LoginForm() {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
   const dispatch = useDispatch()

   const[passAlert, setPassAlert] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  

   const { email, password } = formData

//   // Handle input fields, when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }))
    }


//   // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()
        // //const password = {password};
        if(password.length < 8){
        setPassAlert('Password must be of at least eight characters')
        return
        }
        
        axios.post("http://localhost:4000/login",formData).then((result)=>{
          console.log(result);
            if(result.data.success===true){
                dispatch(setUser({...result.data.useremail}))
                navigate("/profile")
            }
        }).catch((err)=>{
            console.log(err);
        })

    }

//   // data to pass to Tab component
//   const tabData = [
//     {
//       id: 1,
//       tabName: "Student",
//       type: ACCOUNT_TYPE.STUDENT,
//     },
//     {
//       id: 2,
//       tabName: "Instructor",
//       type: ACCOUNT_TYPE.INSTRUCTOR,
//     },
//   ]

  return (
    <div className="flex justify-around">
      {/* Tab */}
      {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-[40%] flex-col gap-y-4 shadow-2xl rounded-lg m-36 p-4 bg-gradient-to-r from-sky-300 to-indigo-300">
        
        <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
                required
                type="text"
                name="email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="form-style border-2 border-black text-center shadow-md rounded-md"
            />
        </label>
        <div className="flex gap-x-4">
            <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10 border-2 border-black text-center shadow-md rounded-md"
                />
                <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 z-[10] cursor-pointer"
                >
                {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
                </span>
                <p className="text-pink-100 mt-1 ">{passAlert}</p>
            </label>
          
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-blue-400 py-[8px] px-[12px] hover:bg-blue-500 hover:shadow-lg font-medium text-black"
        >
          Login
        </button>
      </form>
      <div className="relative w-[600px] md:mx-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/879/539/non_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute top-36 z-10 rounded-lg shadow-2xl"
            />
          </div>
    </div>
  )
}

export default LoginForm