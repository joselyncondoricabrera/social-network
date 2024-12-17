import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState } from 'react';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isClickedHome, setIsClickedHome] = useState(true);
  const [isClickedFriends, setIsClickedFriends] = useState(false);


  const handleClickedHome = () => {
    navigate('/home/publications');
    setIsClickedHome(true);
    setIsClickedFriends(false);
  }

  const handleClickedFriends = () => {
    navigate('/home/friends');
    setIsClickedFriends(true);
    setIsClickedHome(false);
  }

  return (
    <nav className='navbar-section'>
        <div className='navbar-logo'><img src='../src/assets/logo-desktop.png' alt='logo-app'/></div>

        <ul className='nav-links'>
            <li className={ isClickedHome ? 'nav-link-cliked': null} onClick={ handleClickedHome }>
              <img src='../src/assets/homeIcon.png' alt='logo-menu'/>
            </li>

            <li className={ isClickedFriends ? 'nav-link-cliked': null} onClick={ handleClickedFriends }>
              <img src='../src/assets/personIcon.png' alt='logo-menu'/>
            </li>
        </ul>

        <div className=''><img src='../src/assets/logoutIcon.png' alt='logo-app'/></div>


    </nav>
   
  )
}
