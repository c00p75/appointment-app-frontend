import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

function NavBar({ showNav, setShowNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30) { setScrolled(true); } else { setScrolled(false); }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`app-navigation-bar ${scrolled && !showNav ? 'nav-scrolled' : ''}`}>
      <button type="button" onClick={() => setShowNav(!showNav)} className="toggle-side-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
          <path fill="white" stroke="gray" d="M19 17H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2zm0-7H5c-1.103 0-2 .897-2 2s.897 2 2 2h14c1.103 0 2-.897 2-2s-.897-2-2-2z" />
        </svg>
      </button>

      {scrolled && (<h1 className="logo">CycleCruise</h1>)}
    </div>
  );
}

NavBar.propTypes = {
  showNav: PropTypes.bool.isRequired,
  setShowNav: PropTypes.func.isRequired,
};

export default NavBar;
