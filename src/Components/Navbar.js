import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from './NavbarLinks'
import { ACCOUNT_TYPE } from '../utils/constants'
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import ProfileDropDown from './ProfileDropDown'
import logo from "../Assets/Logo-Full-Light.png.png"

const Navbar = () => {

    // const { user } = useSelector((state) => state.profile)
    // const { totalItems } = useSelector((state) => state.cart)
    // const { token } = useSelector((state) => state.auth)

    const [subLinks, setSubLinks] = useState([])

    const location=useLocation()

    const [loading, setLoading] = useState(false)

    useEffect(() => {}, [])

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
      }
  return (
    <div
    className={`flex h-14 items-center justify-center border-b-[1px] border-b-black ${
      location.pathname !== "/" ? "bg-black" : ""
    } transition-all duration-200`}
  >
    <div className="flex w-11/12 max-w-maxContent items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
      </Link>
      {/* Navigation links */}
      <nav className="hidden md:block">
        <ul className="flex gap-x-6 text-black">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <>
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-black"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-black p-4 text-black opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-black"></div>
                      {subLinks?.length ? (
                        <>
                          {subLinks
                            ?.filter(
                              (subLink) => subLink?.courses?.length > 0
                            )
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-black"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Link to={link?.path}>
                  <p
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-black"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* Login / Signup / Dashboard */}
      <div className="hidden items-center gap-x-4 md:flex">
        {(
          <Link to="/dashboard/cart" className="relative">
            <AiOutlineShoppingCart className="text-2xl text-black" />
            {(
              <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-black text-center text-xs font-bold text-yellow-100">
                
              </span>
            )}
          </Link>
        )}
        {(
          <Link to="/login">
            <button className="rounded-[8px] border border-black bg-black px-[12px] py-[8px] text-black">
              Log in
            </button>
          </Link>
        )}
        { (
          <Link to="/signup">
            <button className="rounded-[8px] border border-black bg-black px-[12px] py-[8px] text-black">
              Sign up
            </button>
          </Link>
        )}
        {<ProfileDropDown />}
      </div>
      <button className="mr-4 md:hidden">
        <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
      </button>
    </div>
  </div>
  )
}

export default Navbar