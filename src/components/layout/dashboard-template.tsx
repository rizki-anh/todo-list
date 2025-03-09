import Input from "../elements/input";
import Icon from "../elements/icon";
import Button from "../elements/button";
import Filter from "../filter/filter";
import React from "react";

interface DashboardComponent extends React.FC<{ children?: React.ReactNode }> {
  Headers: React.FC;
  Sidebar: React.FC;
  Content: React.FC;
}

const Dashboard: DashboardComponent = ({ children }) => {
  return (
    <div className="">
      {children} {/* Agar bisa menerima elemen turunan */}
    </div>
  );
};

const Headers: React.FC = () => {
  return (
    <>
      <h1>test</h1>
    </>
  );
};

const Sidebar = () => {
  return <></>;
};
const Content = () => {
  return <></>;
};

Dashboard.Headers = Headers;
Dashboard.Sidebar = Sidebar;
Dashboard.Content = Content;

export default Dashboard;
