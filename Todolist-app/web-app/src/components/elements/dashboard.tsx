import Icon from "./icon";
import Profileuser from "./profile-user";
import Inputsidebar from "./input-sidebar";
import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import Decrypted from "../hooks/decrypt";
import Filter from "../hooks/filter";
import useDataUser from "../store/userdata";
import Notif from "../json/notif.json";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { id } from "date-fns/locale";

interface DashBoardTemplateProps {
  children?: React.ReactNode;
  teks?: string;
}
const DashBoardTemplate: React.FC<DashBoardTemplateProps> & {
  Headers: React.FC<DashBoardTemplateProps>;
  Sidebar: React.FC;
} = ({ children }) => {
  return <>{children}</>;
};

const Headers = ({ teks }: DashBoardTemplateProps) => {
  const data: string[] = teks?.split(/(?=[B])/i) ?? [];
  const [isopen, setIsopen] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <div
        className="bg-[#F8F8F8] flex items-center 2xl:justify-around max-sm:justify-between max-sm:h-12"
        id="header"
      >
        <div className="flex max-sm:items-center max-sm:w-[60vw] max-sm:justify-end ">
          <h1 className="2xl:text-3xl text-2xl text-[#FF6767] font-bold">
            {data[0]}
          </h1>
          <h1 className="2xl:text-3xl font-bold text-2xl">{data[1]}</h1>
        </div>
        <div className="flex w-[895px] h-10 max-sm:hidden">
          <input
            className="max-sm:hidden w-[895px] h-9 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-5 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search your task here..."
            type="search"
          />
          <button
            className="relative right-8 w-9 h-9 rounded-md bg-[#FF6767] border border-transparent text-white transition-all shadow-md hover:shadow-lg  focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex justify-center items-center max-sm:hidden"
            type="button"
          >
            <Icon
              icon="material-symbols-light:search-rounded"
              className="text-2xl"
            />
          </button>
        </div>
        <div className="flex gap-12 flex-row">
          <div className="flex gap-4 max-sm:w-[20vw] max-sm:mr-3">
            <div className="flex justify-center relative">
              <button
                className="w-9 h-9 bg-[#FF6767] rounded-md flex items-center justify-center shadow-md active:shadow-none hover:shadow-xl"
                type="button"
                onClick={() =>
                  setIsopen((prev) =>
                    prev === "notification" ? null : "notification"
                  )
                }
              >
                <Icon
                  icon="mingcute:notification-line"
                  className="text-white text-2xl"
                ></Icon>
              </button>
              <div
                className={`w-[378px] h-[489px] absolute   top-13 mr-85 z-10 ${
                  isopen === "notification" ? "block" : "hidden"
                }`}
              >
                <div className="w-full  h-[89px] bg-[#f8f8f8] flex items-center justify-between ">
                  <h1 className="font-black ml-5 text-3xl ">Notifications</h1>
                  <Icon
                    icon="icon-park-outline:back"   
                    className="text-[#FF6767] text-3xl mr-5 mt-[-5px]"
                    onClick={() => setIsopen(null)}
                  ></Icon>
                </div>
                <div className="w-full h-[400px] bg-white p-4 space-y-4 overflow-y-auto">
                  {Notif.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 border-b pb-3 last:border-none"
                    >
                      <img
                        src={item.image}
                        alt="notification"
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <div className="flex-1">
                        <h1 className="font-semibold text-gray-800">
                          {item.activity}
                        </h1>
                        <p className="text-sm text-gray-600">
                          {item.priority}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="w-9 h-9 bg-[#FF6767] rounded-md flex items-center justify-center shadow-md active:shadow-none  hover:shadow-xl"
              type="button"
              onClick={() =>
                setIsopen((prev) => (prev === "calendar" ? null : "calendar"))
              }
            >
              <Icon
                icon="mdi:calendar-month-outline"
                className="text-white text-2xl"
              ></Icon>
            </button>
            <div
              className={`w-[378px] h-[443px] absolute top-19 bg-white right-68 rounded-3xl z-10 ${
                isopen === "calendar" ? "block" : "hidden"
              }`}
            >
              <div className="flex justify-between mt-7 w-[315px] h-[19px] items-center  mx-auto ">
                <h1 className="font-bold text-xl ">Calendar</h1>
                <Icon
                  icon="icon-park-outline:back"
                  className="text-[#F21E1E] text-3xl font-bold"
                  onClick={() => setIsopen(null)}
                ></Icon>
              </div>
              <div
                className=" border-[#A1A3AB] w-[315px] mx-auto mt-5 h-[36px] border-solid border rounded-sm pl-4 flex items-center
            "
              >
                <h1>
                  {selectedDate?.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h1>
              </div>
              <div className=" mt-5 flex justify-center w-[315px] mx-auto ">
                <DayPicker
                  locale={id}
                  mode="single"
                  selected={selectedDate ?? undefined}
                  onSelect={(date) => {
                    setSelectedDate(date ?? null);
                  }}
                  modifiersClassNames={{
                    selected: "bg-blue-600 text-white font-bold rounded-full", // custom warna biru saat dipilih
                  }}
                  classNames={{
                    day: "text-[#A1A3AB] text-xl",
                    button_next:
                      "text-[#FF6767] border border-[#A1A3AB] relative left-5 h-[36px] w-[36px]",
                    button_previous:
                      "text-[#FF6767] border border-[#A1A3AB] relative right-58 h-[36px] w-[36px]",
                    caption_label:
                      " absolute text-xl font-bold text-[#FF6767] left-0 right-0 flex justify-center",
                    day_today: "bg-blue-500 text-white font-bold",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-[-5px]">
            <h1 className={"text-xl font-bold"}>
              {Temporal.Now.plainDateISO().toLocaleString("en-US", {
                weekday: "long",
              })}
            </h1>
            <h1 className="text-[#3ABEFF] font-bold text-xl">
              {Temporal.Now.plainDateISO().toLocaleString("en-US", {
                timeStyle: "short",
                timeZone: "Asia/Jakarta",
              })}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
interface Sidebarprops {
  iconify: string;
  teks: string;
  path: string;
}

const Sidebar = () => {
  const setUserData = useDataUser((state) => state.setUserData);
  useEffect(() => {
    const fetchdata = async () => {
      const token = await Decrypted();
      const res = await fetch("https://dummyjson.com/user/me", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await res.json();

      setUserData({
        firstname: Filter(data.firstName),
        lastname: Filter(data.lastName),
        email: Filter(data.email),
        url: Filter(data.image),
      });
    };

    fetchdata();
  }, [setUserData]); // ✅ Masukkan ke dependencies agar eslint happy

  const Inputarray: Sidebarprops[] = [
    {
      iconify: "material-symbols:dashboard",
      teks: "Dashboard",
      path: "/dashboard",
    },
    {
      iconify: "ci:warning",
      teks: "Vital Task",
      path: "/vitaltask",
    },
    {
      iconify: "bx:task",
      teks: "My Task",
      path: "/mytask",
    },
    {
      iconify: "carbon:collapse-categories",
      teks: "Task Categories",
      path: "/categories",
    },
    {
      iconify: "fluent:settings-32-regular",
      teks: "Setting",
      path: "/setting",
    },
    {
      iconify: "carbon:help-filled",
      teks: "Help",
      path: "/help",
    },
  ];

  return (
    <>
      <div className="bg-[#FF6767] mt-6 max-sm:hidden" id="sidebar">
        <div className="flex flex-col items-center mt-[-25px] mb-10">
          <Profileuser
            classname="h-21 w-21 bg-center "
            classed="text-2xl font-bold"
            classemail="text-lg"
          />
        </div>
        <div className="flex items-center justify-center flex-col gap-6">
          {Inputarray.map((item, index) => {
            return (
              <Inputsidebar
                iconify={item.iconify}
                teks={item.teks}
                key={index}
                path={item.path}
              />
            );
          })}
        </div>
        <div className="flex justify-center  h-[14vh] items-end ">
          <Inputsidebar
            iconify="tabler:logout"
            teks="Logout"
            path="/"
            onClick={() => {
              localStorage.removeItem("encryptedToken");
              localStorage.removeItem("encryptionKey");
            }}
          />
        </div>
      </div>
    </>
  );
};

DashBoardTemplate.Headers = Headers;
DashBoardTemplate.Sidebar = Sidebar;

export default DashBoardTemplate;
