import Mydashboard from "../layout/dashboard-template";

export default function Dashboard(){
    return (
      <Mydashboard>
        <Mydashboard.Headers teks="Dashboard" />
        <Mydashboard.Sidebar />
        <Mydashboard.Content />
      </Mydashboard>
    );
}
