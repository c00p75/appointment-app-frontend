import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Layout() {
  return (
    <>
      <NavBar />
      <section className="section container-fluid">
        <Outlet />
      </section>
    </>
  );
}

export default Layout;
