import React from 'react';
import DashBoardTemplate from '../elements/dashboard';
import '../../../styles/dashboard.css';
import useDataStore from '../store/userdata';
import Icon from '../elements/icon';

const Dashboard: React.FC & {
  Article: React.FC;
} = () => {
  return (
    <>
      <div className="container">
        <div
          className="grid w-screen h-screen grid-cols-[330px_1fr] grid-rows-[100px_1fr] gap-4"
          id="dashboard"
        >
          <DashBoardTemplate>
            <DashBoardTemplate.Headers teks="Dashboard" />
            <DashBoardTemplate.Sidebar />
          </DashBoardTemplate>
          <Dashboard.Article />
        </div>
      </div>
    </>
  );
};

const Article = () => {
  const { firstname } = useDataStore();
  return (
    <>
      <div className="container">
        <div className="w-full h-full flex  justify-center">
          <div className="w-[70vw] h-full flex flex-col">
            <div className="flex w-[70vw] h-[41px] justify-between items-center px-4">
              <h1 className="text-4xl font-black">
                Welcome back, {firstname} 👋
              </h1>
              <div>
                <button
                  className="border-2 border-solid border-[#FF6767] w-32 h-[41px] rounded-lg flex items-center justify-center gap-2"
                  type="submit"
                >
                  <Icon
                    icon="mdi:invite"
                    className="text-[#FF6767] text-xl"

                  ></Icon>
                  <h1 className="text-xl text-[#FF6767]">Invite</h1>
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.Article = Article;

export default Dashboard;
