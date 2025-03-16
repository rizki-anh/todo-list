import Icon from "../elements/icon";
import Filter from "../filter/filter";
import "../../../styles/dashboard.css";
import React from "react";
import { Temporal } from "temporal-polyfill";

interface DashboardProps {
  children?: React.ReactNode;
  teks?: string;
}

const Dashboard: React.FC<DashboardProps> & {
  Headers: React.FC<DashboardProps>;
  Sidebar: React.FC;
  Content: React.FC;
} = ({ children }) => {
  return (
    <div className="container">
      <div
        className="grid w-screen h-screen grid-cols-[330px_1fr] grid-rows-[100px_1fr] gap-4"
        id="dashboard"
      >
        {children}
      </div>
    </div>
  );
};

const Headers: React.FC<DashboardProps> = ({ teks }) => {
  const data: string[] = teks?.split(/(?=[B])/i) ?? [];
  return (
    <>
      <div
        className="bg-[#F8F8F8] flex items-center justify-around"
        id="header"
      >
        <div className="flex relative  right-12">
          <h1 className=" text-3xl text-[#FF6767] font-bold">{data[0]}</h1>
          <h1 className="text-3xl font-bold">{data[1]}</h1>
        </div>
        <div className="flex w-[895px] h-10">
          <input
            className="w-[895px] h-9 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-5 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search your task here..."
            type="search"
          />
          <button
            className="relative right-8 w-9 h-9 rounded-md bg-[#FF6767] border border-transparent text-white transition-all shadow-md hover:shadow-lg  focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex justify-center items-center"
            type="button"
          >
            <Icon
              icon="material-symbols-light:search-rounded"
              className="text-2xl"
            />
          </button>
        </div>
        <div className="flex gap-12 flex-row">
          <div className="flex gap-4">
            <button
              className="w-9 h-9 bg-[#FF6767] rounded-md flex items-center justify-center shadow-md active:shadow-none hover:shadow-xl"
              type="button"
            >
              <Icon
                icon="mingcute:notification-line"
                className="text-white text-2xl"
              ></Icon>
            </button>
            <button
              className="w-9 h-9 bg-[#FF6767] rounded-md flex items-center justify-center shadow-md active:shadow-none  hover:shadow-xl"
              type="button"
            >
              <Icon
                icon="mdi:calendar-month-outline"
                className="text-white text-2xl"
              ></Icon>
            </button>
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

const Sidebar = () => {
  return (
    <>
      <div className="bg-[#FF6767]" id="sidebar"></div>
    </>
  );
};
const Content = () => {
  return (
    <>
      <div className="" id="content"></div>
    </>
  );
};

Dashboard.Headers = Headers;
Dashboard.Sidebar = Sidebar;
Dashboard.Content = Content;

export default Dashboard;
