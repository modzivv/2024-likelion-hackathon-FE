import React, { useState } from 'react';
import './SettingsProfile.css';
import ic_back from '../../assets/icon-back.png';
import ic_img from '../../assets/icon-edit-profile.png';
import img_basic from '../../assets/Profile.png';

const SettingsProfile = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(img_basic); // 기본 이미지로 초기화

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSetToDefault = () => {
    setProfileImage(img_basic); // 기본 이미지로 변경
  };

  return (
    <div className='settings-profile-container'>
      <header className='settings-profile-header'>
        <img src={ic_back} alt='back' className='back-icon' onClick={() => window.history.back()} />
        <div className='settings-profile-title'>프로필 설정</div>
      </header>
      <div className='profile-picture'>
        <img src={profileImage} alt='profile' className='profile-img' />
        <label htmlFor='profile-img-upload' className='camera-icon'>
          <img src={ic_img} alt='change' />
        </label>
        <input 
          type='file' 
          id='profile-img-upload' 
          accept='image/*' 
          onChange={handleImageChange} 
          style={{ display: 'none' }} 
        />
      </div>
      <div className='change-picture-text' onClick={handleSetToDefault}>
        기본이미지로 변경
      </div>
      <div className='name-input-container'>
        <label htmlFor='name'>이름</label>
        <input 
          type='text' 
          id='name' 
          value={name} 
          onChange={handleNameChange} 
          className='name-input'
        />
      </div>
      <button className='save-button'>수정 완료</button>
    </div>
  );
};

export default SettingsProfile;