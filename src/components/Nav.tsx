import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const currentPage = useLocation().pathname;
  return (
    <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <h4>
            <Link
              to='/'
              className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
          </h4>
        </li>
        <li className='nav-item'>
          <h4>
            <Link
              to='/SavedCandidates'
              className={
                currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'
              }
            >
              Potential Candidates
            </Link>
          </h4>
        </li>
    </ul>
  );
};

export default Nav;
