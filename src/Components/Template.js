import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"

function Template({ title, description1, description2, image, formType }) {
//   const { loading } = useSelector((state) => state?.auth)

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center">
      {(
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-black">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-black">{description1}</span>{" "}
              <span className="font-bold italic text-blue-100">
                {description2}
              </span>   
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative w-[600px] md:mx-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/879/539/non_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute top-32 right-32 z-10 rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
