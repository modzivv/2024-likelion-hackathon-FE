import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';
import ic_back from '../../assets/icon-back.png';

const Settings = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteAccount = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmDelete = () => {
    // 나중에 계정 삭제 로직 추가
    alert('계정이 삭제되었습니다.');
    setShowPopup(false);
  };

  return (
    <div className='settings-container'>
      <header className='settings-header'>
        <img src={ic_back} alt='back' className='back-icon' onClick={() => window.history.back()} />
        <div className='settings-title'>설정</div>
      </header>
      <div className='settings-content'>
        <Link to='/settings/profile' className='settings-link' style={{ textDecoration: 'none'}}>
          <div className='settings-password'>프로필 설정</div>
        </Link>
        <Link to='/settings/password' className='settings-link' style={{ textDecoration: 'none'}}>
          <div className='settings-password'>비밀번호 설정</div>
        </Link>
        <div className='settings-logout'>로그아웃</div>
        <div className='settings-delete' onClick={handleDeleteAccount}>계정 삭제하기</div>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <p className='popup-title'>계정 삭제하기</p>
            <p className='popup-detail'>정말로 계정을 삭제하시겠습니까?
            <br />계정 복구는 불가능합니다.</p>
            <button className='cancel-btn' onClick={handleClosePopup}>취소</button>
            <button className='delete-btn' onClick={handleConfirmDelete}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Settings;