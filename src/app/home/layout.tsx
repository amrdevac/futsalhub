"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SportsSoccerSharp from "@mui/icons-material/SportsSoccerSharp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessIcon from "@mui/icons-material/Business";
import PercentIcon from "@mui/icons-material/Percent";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Image from "next/image";
import {
  ChevronLeft,
  Close,
  Dashboard,
  Home,
  Logout,
  Search,
} from "@mui/icons-material";
// import { useRouter } from "next/navigation";

import { useRouter } from "nextjs-toploader/app";

import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";

const menuSidebar = [
  {
    title: "Home",
    icon: <Home fontSize="small" className="text-primary" />,
    href: "/home",
  },
  {
    title: "Booking",
    icon: <CalendarTodayIcon fontSize="small" className="text-primary" />,
    href: "/home/booking-lapangan",
  },
  {
    title: "Lapangan",
    icon: <SportsSoccerSharp fontSize="small" className="text-primary" />,
    children: [
      { title: "Tambah Lapangan", href: "/home/lapangan/tambah" },
      { title: "Data Lapangan", href: "/home/lapangan" },
    ],
  },
  {
    title: "Grafik & Statistik",
    icon: <BarChartIcon fontSize="small" className="text-primary" />,
    href: "/grafik-statistik",
  },
  {
    title: "Data Transaksi",
    icon: <ReceiptIcon fontSize="small" className="text-primary" />,
    href: "/data-transaksi",
  },
  {
    title: "Manajemen",
    icon: <SettingsIcon fontSize="small" className="text-primary" />,
    children: [
      { title: "Lapangan", href: "manajemen/lapangan" },
      { title: "Slider", href: "/manajemen/slider" },
      { title: "Kontak", href: "/manajemen/kontak" },
      { title: "User & Customer", href: "/manajemen/user-customer" },
    ],
  },
  {
    title: "Profil Bisnis",
    icon: <BusinessIcon fontSize="small" className="text-primary" />,
    href: "/profil-bisnis",
  },
  {
    title: "Diskon Member",
    icon: <PercentIcon fontSize="small" className="text-primary" />,
    href: "/diskon-member",
  },
  {
    title: "Midtrans",
    icon: <CreditCardIcon fontSize="small" className="text-primary" />,
    href: "/midtrans",
  },
];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter(); // Initialize router

  const [open, setOpen] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleAccordion = (title: string) => {
    setOpen((prevOpen) => (prevOpen === title ? null : title));
  };

  const filteredMenu = menuSidebar.filter((menu) => {
    const matchParent = menu.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchChild = menu.children?.some((child) =>
      child.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchParent || matchChild;
  });

  const currentPath = usePathname();
  const lastSegment = currentPath.split("/").pop();
  const formattedSegment = lastSegment?.replace(/-/g, " ") ?? "";
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault(); // Mencegah perilaku default
        if (inputRef.current) {
          inputRef.current.focus(); // Fokus ke input
        }
      }
    };

    // Menambahkan event listener
    window.addEventListener("keydown", handleKeyDown);

    // Membersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-screen text-gray-900">
      {/* Sidebar */}
      <div
        className="bg-on-dark-full w-2.5/12 overflow-y-auto flex flex-col gap-2  
       scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-50"
      >
        <div className="flex font-bold items-center gap-5 p-3 px-5     text-base-200  bg-accent  ">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-3">
              <Image
                src={"/logo/futsalhub.png"}
                alt="any logo"
                width={38}
                height={38}
              />
              <div className="text-lg text-base-100">FutsalHub</div>
            </div>
            <div>
              <Close />
            </div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r bg-on-dark-full  text-base-100 font-bold">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <div>
                <div className="text-xs font-light">Selamat Datang,</div>
                <div>FAHMI AMRULLOH</div>
              </div>
              <div>
                <Image
                  src="https://picsum.photos/30/30"
                  width={30}
                  height={30}
                  alt="IMG"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className=" text-xs">Programer / Jakarta</div>
              <button className="text-xs font-light bg-accent  items-center text-on-dark p-1 rounded-full flex gap-1">
                <Logout className="" fontSize="inherit" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center mx-4 gap-1 ">
          <div>
            <Dashboard className="text-primary" fontSize="inherit" />
          </div>
          <div className="w-full">
            <input
              ref={inputRef}
              type="text"
              className="input-sm w-full focus:outline-1 focus:outline-primary  rounded-md bg-transparent"
              placeholder="Cari menu (Ctrl + k)"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Menu items */}
        <div className=" flex flex-col gap-3">
          {filteredMenu.map((menu, index) => (
            <div key={index}>
              {/* Parent Menu */}
              <div
                className={`flex justify-between items-center px-5 py-2 cursor-pointer duration-150 hover-on-dark ${
                  lastSegment === menu.href?.split("/").pop()
                    ? "bg-base-100/10"
                    : ""
                }`}
                onClick={() => {
                  if (menu.children) {
                    toggleAccordion(menu.title);
                  } else {
                    router.push(menu.href);
                  }
                }}
              >
                <button
                  type="button"
                  className="flex text-sm items-center gap-3 focus:outline-1 focus:outline-blue-500"
                >
                  {menu.icon} <span>{menu.title}</span>
                </button>
                {menu.children && (
                  <ChevronLeft
                    className={`w-5 h-5 transition-transform transform ${
                      open === menu.title ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                )}
              </div>
              {/* Children (Sub-menu) */}
              {menu.children && (open === menu.title || searchTerm != "") && (
                <div className="ml-8 text-sm mt-2 select-none ">
                  {menu.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      onClick={() => router.push(child.href)}
                      className="block py-2 px-4 hover:bg-blue-10  cursor-pointer  "
                    >
                      <button type="button" className="focus:outline-blue-600">
                        {child.title}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-neutral dark:bg-base-200  w-full overflow-hidden">
        <div className="bg-white dark:bg-accent w-full  py-4   shadow-md capitalize px-5 mb-2.5 flex justify-between">
          <div>{formattedSegment}</div>
          <div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (document.documentElement.classList.contains("dark")) {
                    // setIsDark(false);
                    localStorage.setItem("dark-mode", "false");
                    document.documentElement.classList.remove("dark");
                  } else {
                    // setIsDark(true);
                    localStorage.setItem("dark-mode", "true");
                    document.documentElement.classList.add("dark");
                  }
                }}
              />

              {/* sun icon */}
              <svg
                className="swap-on h-5 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off h-5 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
        <div className="h-screen overflow-y-auto scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-50 dark:scrollbar-track-base-100  p-10  pb-20">
          <NextTopLoader
            color="#1affa0"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #1affa0,0 0 5px #1affa0"
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
