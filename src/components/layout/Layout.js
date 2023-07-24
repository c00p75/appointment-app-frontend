import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SideBar from './SideBar';
import './layout.css';
import NavBar from './NavBar';

function Layout() {
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShowNav(true);
    }
  }, []);

  return (
    <main className="d-flex">
      <NavBar setShowNav={setShowNav} showNav={showNav} />
      <section
        className={`side-bar-container flex-center ${
          showNav ? 'display-sidebar' : 'hide-sidebar'
        }`}
      >
        <SideBar
          className="side-bar"
          setShowNav={setShowNav}
          showNav={showNav}
        />
      </section>
      <section>
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;
