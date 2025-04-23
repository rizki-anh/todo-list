import React, { useState } from 'react';
import DashBoardTemplate from '../elements/dashboard';
import '../../../styles/dashboard.css';
import useDataStore from '../store/userdata';
import Icon from '../elements/icon';

/**
 * Komponen utama Dashboard yang menggunakan layout grid.
 * Membungkus Header, Sidebar, dan konten utama (Article).
 */
const Dashboard: React.FC & {
  Article: React.FC;
} = () => {
  return (
    <div className="container">
      <div
        className="grid w-screen h-screen grid-cols-[330px_1fr] grid-rows-[100px_1fr] gap-4"
        id="dashboard"
      >
        {/* Template berisi Header dan Sidebar */}
        <DashBoardTemplate>
          <DashBoardTemplate.Headers teks="Dashboard" />
          <DashBoardTemplate.Sidebar />
        </DashBoardTemplate>

        {/* Komponen konten utama */}
        <Dashboard.Article />
      </div>
    </div>
  );
};

/**
 * Komponen Article adalah konten utama yang menampilkan
 * sapaan pengguna dan tombol aksi (contoh: Invite).
 */
const Article: React.FC = () => {
  // State untuk mengontrol tampilan pop-up "Invite"
  const [isOpen, setIsOpen] = useState<string | null | boolean>(null);

  // Mengambil data nama depan dari global state (Zustand)
  const { firstname } = useDataStore();

  return (
    <div className="container">
      <div className="w-full h-full flex justify-center">
        <div className="w-[70vw] h-full flex flex-col">
          {/* Header Article */}
          <div className="flex w-[70vw] h-[41px] justify-between items-center px-4">
            {/* Sapaan pengguna */}
            <h1 className="text-4xl font-black">
              Welcome back, {firstname} 👋
            </h1>

            {/* Tombol "Invite" */}
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

              {/* Popup Invite muncul jika isOpen bernilai 'invite' */}
              {isOpen === "invite" && (
                <div className="w-84 h-88 bg-[#F8F8F8] rounded-md flex justify-center absolute top-14 right-1 ">
                  {/* Isi popup bisa diubah sesuai kebutuhan */}
                  <input
                    className=" w-[895px] h-9 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-5 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="search user invite"
                    type="search"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tempat untuk konten tambahan */}
          <div>{/* Konten lain bisa ditaruh di sini */}</div>
        </div>
      </div>
    </div>
  );
};

// Menyambungkan komponen Article ke Dashboard agar bisa dipanggil sebagai <Dashboard.Article />
Dashboard.Article = Article;

export default Dashboard;
