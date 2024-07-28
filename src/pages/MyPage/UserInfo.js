import React from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css';
import ic_user from '../../assets/Profile.png'; 
import ic_home from '../../assets/icon-home.png';
import ic_settings from '../../assets/icon-settings.png';
import line_grey from '../../assets/line.png';

const UserInfo = ({ name, daysManaged, mealManagement, complimentDone }) => {
  return (
    <div className='user-info-container'>
      <header className='header'>
        <div className='title'>MY</div>
        <div className='icons'>
        <Link to="/">
          <img src={ic_home} alt='home' className='icon'></img>
          </Link>
          <Link to="/settings">
            <img src={ic_settings} alt='settings' className='icon'></img>
          </Link>
        </div>
      </header>
      <div className='user-info'>
        <div className='user-info-img'>
          <img src={ic_user} alt='user' className='user-img'></img>
        </div>
        <div className='user-detail'>
          <div className='user-name'>{name} 님</div>
          <div className='user-days'>
            관리한지<span className='days-managed'>+{daysManaged}</span>일 째</div>
        </div>
      </div>
      <div className='completion-status-container'>
        <div className='completion-status'>
          <div className='status-item'>
            <div className='status-title'>식사관리완료</div>
            <div className='count'>{mealManagement}회</div>
          </div>
          <img src={line_grey} alt='center-line' className='center-line' />
          <div className='status-item'>
            <div className='status-title'>칭찬 완료</div>
            <div className='count'>{complimentDone}회</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;