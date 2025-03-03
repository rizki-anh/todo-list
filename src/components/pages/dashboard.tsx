import Mydashboard from "../layout/dashboard-template";

export default function Dashboard(){
    return(
        <Mydashboard>
            <Mydashboard.Headers></Mydashboard.Headers>
            <Mydashboard.Content></Mydashboard.Content>
            <Mydashboard.Sidebar></Mydashboard.Sidebar>
        </Mydashboard>
    );
}
