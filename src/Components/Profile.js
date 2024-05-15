import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../utils/dateFormatter"
import IconBtn from "./Btn.js"

export default function Profile() {
  const { user } = useSelector((state) => state.profile)
  console.log(user);
  const navigate = useNavigate()

  return (
    <div className="w-3/4 m-auto">
      <h1 className="mb-14 text-3xl font-medium text-white">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-white bg-[#5e6ddf] p-8 px-12 shadow-lg">
        <div className="flex items-center gap-x-4">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-white bg-[#3b48aa] shadow-lg p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-gray-300"
              : "text-gray-300"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-white shadow-lg  bg-[#5e6ddf] p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-lg text-gray-800">First Name</p>
              <p className="text-lg font-medium text-white">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg text-gray-800">Email</p>
              <p className="text-lg font-medium  text-white">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg text-gray-800">Gender</p>
              <p className="text-lg font-medium  text-white">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-lg text-gray-800">Last Name</p>
              <p className="text-lg font-medium  text-white">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg text-gray-800">Phone Number</p>
              <p className="text-lg font-medium  text-white">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg text-gray-800">Date Of Birth</p>
              <p className="text-lg font-medium text-white">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
