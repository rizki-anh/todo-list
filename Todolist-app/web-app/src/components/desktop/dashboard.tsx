import React, { useState } from "react";
import DashBoardTemplate from "../elements/dashboard";
import "../../../styles/dashboard.css";
import useDataStore from "../store/userdata";
import Icon from "../elements/icon";
import UserFriends from "../json/invite.json";
import Dummyhari from "../json/dummy.json";
import Charts from "../elements/charts";
import gambar from "../json/gambar.json";
const Dashboard: React.FC & {
  Article: React.FC;
} = () => {
  return (
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
  );
};

const Article = () => {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [datavalue, setDataValue] = useState<{ nama: string; photo: string }[]>(
    []
  );
  const { firstname } = useDataStore();

  const LiveSearch = UserFriends.filter((item) =>
    item.nama.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="container">
      <div className="w-full h-full flex justify-center">
        <div className="w-[70vw] h-full flex flex-col">
          <div className="flex w-full h-[41px] justify-between items-center px-4">
            <h1 className="text-4xl font-black ml-2">
              Welcome back, {firstname} 👋
            </h1>

            {datavalue.length > 0 && (
              <div className="flex gap-4  justify-end    rounded-lg absolute top-30 right-70">
                {datavalue.map((item, index) => (
                  <img
                    key={`${item.nama}-${index}`}
                    src={item.photo}
                    alt={item.nama}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ))}
              </div>
            )}

            <div className="relative">
              <button
                className="border-2 border-solid border-[#FF6767] w-32 h-[41px] rounded-lg flex items-center justify-center gap-2"
                type="button"
                onClick={() =>
                  setIsOpen((prev) => (prev === "invite" ? null : "invite"))
                }
              >
                <Icon icon="mdi:invite" className="text-[#FF6767] text-xl" />
                <h1 className="text-xl text-[#FF6767]">Invite</h1>
              </button>

              {isOpen === "invite" && (
                <div className="w-[378px] h-[499px] bg-white rounded-md flex flex-col gap-4 justify-start absolute top-14 right-1 pt-6 px-6 z-10 shadow-lg">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">
                      Invite Friends Member
                    </h1>
                    <Icon
                      className="text-[#FF6767] text-3xl cursor-pointer"
                      icon="icon-park-outline:back"
                      onClick={() => setIsOpen(null)}
                    />
                  </div>

                  <p className="text-sm text-gray-600">
                    Everyone at project can access the todolist activity
                  </p>

                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="search"
                      placeholder="Search username"
                      className="bg-white w-full h-9 border border-slate-200 rounded-md pl-4 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                      className="bg-black text-white px-4 h-9 rounded-md"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>

                  {inputValue && (
                    <ul className="mt-2 border rounded bg-white shadow max-h-40 overflow-auto">
                      {LiveSearch.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.photo}
                              alt={item.nama}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{item.nama}</span>
                          </div>
                          <button
                            className="border border-black px-2 py-1 rounded"
                            type="button"
                            onClick={() => {
                              const alreadyAdded = datavalue.some(
                                (f) => f.nama === item.nama
                              );
                              if (!alreadyAdded) {
                                setDataValue([
                                  ...datavalue,
                                  { nama: item.nama, photo: item.photo },
                                ]);
                              }
                            }}
                          >
                            Add
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div>
                    <h1 className="font-semibold mt-4">Project Member</h1>
                    {datavalue.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {datavalue.map((item, index) => (
                          <li
                            key={`${item.nama}-${index}`}
                            className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded"
                          >
                            <img
                              src={item.photo}
                              alt={item.nama}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{item.nama}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Belum ada member yang ditambahkan.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="w-[1290px] h-[721px] border-2 mt-6 bg-[#F5F8FF] flex items-center gap-10 justify-between   p-8 m-auto"
            style={{ borderColor: "rgba( 161, 163, 171.63)" }}
          >
            <div className="w-[596px] h-[670px] bg-white  drop-shadow-2xl  flex flex-col items-center justify-center">
              <div className="w-[480px] h-[603px] rounded-2xl ">
                <div className="flex  w-full  justify-between items-center mb-2">
                  <div className="flex  items-center w-[207px] h-[32px] flex-wrap  gap-2">
                    <Icon
                      icon="mdi:clipboard-clock-outline"
                      className="text-[#A1A3AB] text-2xl "
                    ></Icon>
                    <h1 className="text-[#ff6767]">TO-DO</h1>
                  </div>
                  <div className="flex gap-2 items-center  w-[96px] h-[19px] ">
                    {" "}
                    <Icon
                      icon="material-symbols:add-rounded"
                      className="text-[#FF6767]"
                    ></Icon>
                    <h1 className="text-[#A1A3AB]">Add Task</h1>
                  </div>
                </div>
                {Dummyhari.map((item, index) => {
                  // Determine border color based on priority
                  let borderColorClass = "border-gray-400"; // Default border color
                  if (item.priority === "high") {
                    borderColorClass = "border-red-500";
                  } else if (item.priority === "medium") {
                    borderColorClass = "border-yellow-500";
                  } else if (item.priority === "low") {
                    borderColorClass = "border-green-500";
                  }

                  return (
                    <div key={index} className="w-[411px] mb-4 flex flex-col">
                      {/* ... existing date and hr ... */}
                      <h6 className="mb-1 text-sm text-gray-500">
                        {item.tanggal}
                      </h6>
                      <hr className="w-full mb-2 border-gray-300" />
                      <div className="w-full border-2 p-4 rounded flex flex-col gap-2 bg-white shadow-sm">
                        <div className="flex items-center gap-2">
                          {/* Hollow circle with dynamic border color */}
                          <div
                            className={`w-3 h-3 rounded-full border-2 bg-transparent ${borderColorClass}`}
                          ></div>
                          <h1 className="font-bold text-lg">{item.judul}</h1>
                        </div>
                        <div className="flex gap-3 items-start">
                          <p className="text-sm text-gray-700 flex-grow">
                            {item.deskripsi}
                          </p>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.judul}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-[596px] h-[670px] flex flex-col gap-4">
              <div className="w-[596px] h-[263px] drop-shadow-2xl bg-white flex flex-col justify-between p-4">
                <div className="flex gap-2 items-center mt-2 mb-4">
                  <Icon className="text-2xl" icon="carbon:task-complete"></Icon>
                  <h1 className="font-bold text-[#ff6767]">Task Status</h1>
                </div>
                <div className="w-full h-[190px]  flex items-center justify-center">
                  <Charts name="completed" value={57} fill="#05A301" />
                  <Charts name="progress" value={23} fill="#0225FF" />
                  <Charts name="Not Started" value={20} fill="#F21E1E" />
                </div>
              </div>
              <div className="w-[596px] h-[396px] drop-shadow-2xl bg-white">
                <div className="flex gap-2 items-center mt-2 mb-1 w-full p-6 ">
                  <Icon className="text-2xl" icon="carbon:task"></Icon>
                  <h1 className="font-bold text-[#ff6767]">Completed Task</h1>
                </div>
                <div className="w-full h-[300px] flex items-center justify-center flex-col gap-4 ">
                  <div className="w-[378px] h-[134px] bg-white border-2 border-gray-300 rounded-lg shadow-sm drop-shadow-lg">
                    <div className="flex p-2 items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 bg-transparent border-green-400"></div>
                      <h1>{gambar.judul2}</h1>
                    </div>
                    <div className="flex flex-col pl-3 flex-wrap w-[183px] h-[34px]">
                      <p className="text-sm">{gambar.teks1}</p>
                    </div>
                    <div className="w-[88px] h-[88px] bg-black absolute left-66  top-5 ">
                      <img src={gambar.gambar1} alt="welcome"  className="object-cover"/>
                    </div>
                  </div>
                  <div className="w-[378px] h-[134px] bg-white border-2 border-gray-300 rounded-lg shadow-sm  drop-shadow-lg">
                    <div className="flex p-2 items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 bg-transparent border-green-400"></div>
                      <h1>{gambar.judul1}</h1>
                    </div>
                    <div className="w-[183px] h-[34px] flex flex-col pl-3">
                      <p className="text-sm">{gambar.teks2}</p>
                    </div>
                    <div className="w-[88px] h-[88px] bg-black absolute left-66 top-5">
                      <img src={gambar.gambar2} alt=""  className="object-cover"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.Article = Article;
export default Dashboard;
