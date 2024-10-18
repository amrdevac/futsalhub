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
  ChevronRight,
  Close,
  Dashboard,
  Home,
  Logout,
  Search,
  SearchRounded,
} from "@mui/icons-material";
// import { useRouter } from "next/navigation";

import { useRouter } from "nextjs-toploader/app";

import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import DarkModeSwitcher from "../components/DarkModeSwitcher";

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
    <div className="flex h-screen text-gray-900 ">
      {/* Sidebar */}
      <div
        className=" w-2.5/12 overflow-y-auto flex flex-col 
       scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-50 dark:scrollbar-track-base-100"
      >
        <div className="flex font-bold items-center gap-5 p-3 px-5      text-base-200  bg-primary  dark:bg-accent  border-b-on-dark  ">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-3">
              <Image
                src={"/logo/futsalhub.png"}
                alt="any logo"
                className="shadow-lg"
                width={25}
                height={25}
              />
              <div className="text-lg text-white dark:text-base-200">FutsalHub</div>
            </div>
            {/* <div>
              <Close />
            </div> */}
          </div>
        </div>
        <div className="bg-on-dark-full h-full pt-5 border-r dark:border-base-100 ">
          <div className="p-4 bg-gradient-to-r bg-on-dark-full  text-base-300 font-bold  border-b-on-dark">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <div>
                  <div className="text-xs font-light">Selamat Datang,</div>
                  <div>FAHMI AMRULLOH</div>
                </div>
                <div className="rounded-full overflow-hidden">
                  <Image
                    src="https://picsum.photos/30/30"
                    width={40}
                    height={40}
                    alt="IMG"
                    className=" rounded-full"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className=" text-xs">Programer / Jakarta</div>
                <button className="text-xs  btn-error btn-outline btn btn-xs text-white  items-center  p-1 rounded-full flex gap-1">
                  <Logout className="" fontSize="inherit" />
                </button>
              </div>
            </div>
          </div>
          <div className="   flex items-center mx-4  mb-2 focus-within:shadow-lg mt-2 transition duration-200 rounded-md">
            <div className="pl-3">
              <SearchRounded className="text-primary" fontSize="inherit" />
            </div>
            <div className="w-full">
              <input
                ref={inputRef}
                type="text"
                className="input-sm w-full focus:outline-none outline-none  duration-300 bg-transparent rounded-md"
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
                    className="flex text-sm items-center gap-3 focus:outline-1 focus:outline-primary"
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
                        className="block py-2 px-4 hover:bg-blue-10 hover-on-dark  cursor-pointer  "
                      >
                        <button
                          type="button"
                          className="focus:outline-primary"
                        >
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
      </div>

      {/* Content */}
      <div className="bg-neutral dark:bg-base-200  w-full overflow-hidden">
        <div className="bg-white dark:bg-accent w-full  py-4   shadow-md capitalize px-5 mb-2.5 flex justify-between">
          <div className=" flex items-center text-sm">
            {currentPath.split("/").map((data, key) => {
              return (
                <div className=" " key={key}>
                  <div className="flex items-center">
                    {data.split("-").join(" ")}
                    {key != 0 && key != currentPath.split("/").length - 1 && (
                      <ChevronRight fontSize="inherit" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <DarkModeSwitcher />
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
