import { Outlet } from 'react-router-dom';
import Header from '../Components/Navbar/Header';



const MainLayout = () => {
  return (
    <div className="font-['Lato']">
      <Header>
        <Outlet></Outlet>
      </Header>
    </div>
  );
};

export default MainLayout;