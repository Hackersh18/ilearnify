import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function LoginForm() {
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
            if(result.data.success===true){
                dispatch(setUser({...result.data.success}))
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
    <div>
      {/* Tab */}
      {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        
        <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
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
                className="form-style w-full"
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
                className="form-style w-full !pr-10"
                />
                <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
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
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginFormForm