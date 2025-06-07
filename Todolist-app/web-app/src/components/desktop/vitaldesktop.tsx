import "../../../styles/dashboard.css";
import DashBoardTemplate from "../elements/dashboard";

const vitalDesktop : React.FC &{
    Article: React.FC;
} = () =>{
    return(
       <div className="container">
         <div
           className="grid w-screen h-screen grid-cols-[330px_1fr] grid-rows-[100px_1fr] gap-4"
           id="dashboard"
         >
           <DashBoardTemplate>
             <DashBoardTemplate.Headers teks="Todo" />
             <DashBoardTemplate.Sidebar />
           </DashBoardTemplate>
            <Article/>
         </div>
       </div>
    );
};
const Article  = () => {
 return (
   <>
     <div className="flex gap-6  items-center justify-center">
       <div className="h-[82vh] border-2   w-[25vw] mt-[-5px] rounded-xl">
        <div className="flex flex-col  gap-2 p-4">
          <h1 className="text-3xl font-bold ">My Tasks</h1>
          <div className="w-13 h-1 bg-red-400 mt-[-7px]"></div>
        </div>
        <div></div>
        <div></div>
       </div>
       <div className="h-[82vh] border-2  w-[47vw] mt-[-5px] rounded-xl"></div>
     </div>
   </>
 );
};
vitalDesktop.Article = Article;
export default vitalDesktop;
