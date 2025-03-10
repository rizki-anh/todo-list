import Input from "../elements/input";
import Icon from "../elements/icon";
import Button from "../elements/button";
import Filter from "../filter/filter";
import "../../../styles/dashboard.css"
import React from "react";

interface DashboardComponent extends React.FC<{ children?: React.ReactNode }> {
  Headers: React.FC;
  Sidebar: React.FC;
  Content: React.FC;
}

const Dashboard: DashboardComponent = ({ children }) => {
  return (
    <div className="container">
      <div
        className="grid w-screen h-screen grid-cols-[330px_1fr] grid-rows-[100px_1fr] gap-4"
        id="dashboard"
      >
        {children} {/* Agar bisa menerima elemen turunan */}
      </div>
    </div>
  );
};

const Headers: React.FC = () => {
  return (
    <>
      <div className="bg-[#F8F8F8]" id="header"></div>
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
