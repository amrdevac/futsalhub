"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import DarkModeSwitcher from "./components/DarkModeSwitcher";

const LoginPage: React.FC = () => {
  // extracting data from usesession as session
  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }

  return (
    <div className="flex h-screen text-black ">
      {/* Left Section: Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-10 bg-on-dark-full relative">
        <div className="absolute right-5 top-5">
          <DarkModeSwitcher />
        </div>
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className=" text-center">
            <span className="inline-block p-3  rounded-full">
              <Image
                src={"/logo/futsalhub.png"}
                alt="log"
                width={100}
                height={100}
              />
            </span>
          </div>

          <h2 className="mb-4 font-bold text-gray-900 flex flex-col justify-center items-center dark:text-white">
            FutsalHub
            <small className="text-xs font-light">
              Booking Lapangan Gak Pake Ribet
            </small>
          </h2>

          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm text-gray-700 dark:text-white select-none">
                <input
                  type="checkbox"
                  className="mr-2 focus:ring-2 focus:ring-blue-500"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 mb-4 text-white bg-primary rounded-md "
            >
              Masuk
            </button>

            <div className="flex items-center justify-center space-x-2">
              <hr className="w-1/5 border-gray-300" />
              <span className="text-sm text-gray-500 dark:text-gray-300">Or continue with</span>
              <hr className="w-1/5 border-gray-300" />
            </div>

            <div
              className="flex justify-between mt-4 space-x-2"
              onClick={() => signIn("google")}
            >
              <button
                type="button"
                className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:bg-gray-100 dark:hover:text-base-100"
              >
                <Image
                  src={process?.env?.NEXT_PUBLIC_GOOGLE_ICON ?? ""}
                  width={10}
                  height={10}
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>

              <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:text-base-100">
                <img
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="GitHub"
                  className="w-5 h-5 mr-2"
                />
                GitHub
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="hidden lg:block w-1/2">
        {/* <img
          src="https://picsum.photos/800/600"
          alt="Random Unsplash"
          className="object-cover w-full h-full"
        /> */}

        <Image
          src="/img/orang-futsal.webp"
          width={300}
          height={300}
          alt="Random Unsplash"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoginPage;
