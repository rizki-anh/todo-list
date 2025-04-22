const Headers = ({ teks }: DashBoardTemplateProps) => {
  const data: string[] = teks?.split(/(?=[B])/i) ?? [];
  const [activeButton, setActiveButton] = useState<string | null>(null); // State untuk melacak tombol aktif

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
                className={`w-9 h-9 rounded-md flex items-center justify-center shadow-md active:shadow-none hover:shadow-xl ${
                  activeButton === 'notification'
                    ? 'bg-[#FF6767]'
                    : 'bg-gray-300'
                }`}
                type="button"
                onClick={() =>
                  setActiveButton((prev) =>
                    prev === 'notification' ? null : 'notification'
                  )
                }
              >
                <Icon
                  icon="mingcute:notification-line"
                  className="text-white text-2xl"
                ></Icon>
              </button>
              <div
                className={`w-[378px] h-[489px] absolute top-13 mr-85 ${
                  activeButton === 'notification' ? 'block' : 'hidden'
                }`}
              >
                <div className="w-full h-[89px] bg-white flex items-center justify-between ">
                  <h1 className="font-black ml-5">Notifications</h1>
                  <Icon
                    icon="icon-park-outline:back"
                    className="text-[#FF6767] text-3xl mr-5 mt-[-5px]"
                  ></Icon>
                </div>
                <h1 className="ml-5 mt-[-30px] mb-5 text-[#A1A3AB]">Today</h1>
                <div className="w-full h-[400px] bg-[#D3D3D3]">
                  {Notif.map((item) => {
                    return (
                      <>
                        <div className="w-[378px] h-[100px] border flex items-center justify-center">
                          <div className="w-[331px] h-[76px] flex flex-wrap ">
                            <h1 className="">{item.activity}</h1>
                            <img
                              src={item.image}
                              alt="test"
                              className="w-[52px] h-[52px] pl-2"
                            />
                            <div className="flex gap-1">
                              <h1>Priority:</h1>
                              <h1 className="text-[#F21E1E] font-bold">
                                {item.priority}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              className={`w-9 h-9 rounded-md flex items-center justify-center shadow-md active:shadow-none hover:shadow-xl ${
                activeButton === 'calendar' ? 'bg-[#FF6767]' : 'bg-gray-300'
              }`}
              type="button"
              onClick={() =>
                setActiveButton((prev) =>
                  prev === 'calendar' ? null : 'calendar'
                )
              }
            >
              <Icon
                icon="mdi:calendar-month-outline"
                className="text-white text-2xl"
              ></Icon>
            </button>
            <div
              className={`w-[378px] h-[443px] absolute top-15 bg-amber-500 right-14 left-20 ${
                activeButton === 'calendar' ? 'block' : 'hidden'
              }`}
            ></div>
          </div>
          <div className="mt-[-5px] max-sm:hidden">
            <h1 className={'text-xl font-bold'}>
              {Temporal.Now.plainDateISO().toLocaleString('en-US', {
                weekday: 'long',
              })}
            </h1>
            <h1 className="text-[#3ABEFF] font-bold text-xl">
              {Temporal.Now.plainDateISO().toLocaleString('en-US', {
                timeStyle: 'short',
                timeZone: 'Asia/Jakarta',
              })}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
