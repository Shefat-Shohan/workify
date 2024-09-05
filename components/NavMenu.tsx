"use client";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { UserDataType } from "./service/fetchProfileInfo";

export default function NavMenu({ profileInfo }: {profileInfo:UserDataType[] | undefined}) {
  const { user } = useUser();
  // have to import this nav letter
  const navigation = [
    {
      title: "Home",
      url: "/",
      show: true,
    },
    {
      title: "Jobs",
      url: "/job",
      show: true,
    },
    {
      title: "Activity",
      url: "/activity",
      show: profileInfo?.[0]?.role === "candidate"
    },
    {
      title: "Sign in",
      url: "/sign-in",
      show: !user,
    },
    {
      title: "Sign up",
      url: "/sign-up",
      show: !user,
    },
    {
      title: "Post Job",
      url: "/post-job",
      show: profileInfo?.[0]?.role === "recruiter"
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      show: profileInfo?.[0]?.role === "recruiter"
    },

  ];
  const [isOpen, setIsOpen] = useState(false);
  // const useNoScroll = (isOpen) => {
  //   useEffect(() => {
  //     if (isOpen) {
  //       document.body.classList.add("no-scroll");
  //     } else {
  //       document.body.classList.remove("no-scroll");
  //     }
  //   }, [isOpen]);
  // };

  // useNoScroll(isOpen);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();
  const searchPage = pathname.startsWith("/search/");

  return (
    <header>
      <div className="fixed top-0 left-0 w-full z-40 lg:backdrop-blur-sm backdrop-blur-md">
        <div className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 py-6">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center justify-between gap-8">
                <Link
                  className="font-bold md:text-2xl text-lg text-white-100"
                  href={"/"}
                >
                 <Image width={160} height={80} src='/logo.svg' alt="logo"/>
                </Link>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden  rounded cursor-pointer border p-1 border-gray-60/15 shadow-md"
                >
                  {isOpen ? (
                    <XMarkIcon className="w-6 h-6 " />
                  ) : (
                    <Bars3BottomRightIcon className="w-6 h-6 " />
                  )}
                </div>
              </div>
              <div
                className={` transition-transform transform ${
                  isOpen ? " translate-y-0" : "-translate-y-full"
                } duration-500`}
              >
                <nav
                  onClick={handleClick}
                  className={`${
                    isOpen ? "block" : "hidden"
                  } md:flex md:flex-row items-center flex-col mt-8 md:mt-0 h-[100vh] md:h-0`}
                >
                  {navigation.map((item, index) =>
                    item.show ? (
                      <Link
                        key={index}
                        href={item.url}
                        className={` md:ml-6 text-gray-400 hover:text-purple flex flex-col mb-6 md:mb-0`}
                      >
                        {item.title}
                      </Link>
                    ) : null
                  )}
                  <span className={`${user ? "md:pl-6" : "pl-0"}`}>
                  <UserButton afterSwitchSessionUrl="/" />
                  </span>
                </nav>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
