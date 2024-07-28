import React, { useState } from 'react';
import './SettingsPassword.css';
import ic_back from '../../assets/icon-back.png';

const SettingsPassword = () => {
  const [step, setStep] = useState(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // 마지막 단계에서 비밀번호 설정 완료 로직
      alert('비밀번호가 성공적으로 변경되었습니다.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              type='password'
              placeholder="현재 비밀번호를 입력하세요."
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='password-input'
            />
            <button onClick={handleNextStep} className='password-btn'>
              비밀번호 확인
            </button>
          </>
        );
      case 2:
        return (
          <>
            <input
              type='password'
              placeholder='새로운 비밀번호를 입력하세요.'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='password-input'
            />
            <input
              type='password'
              placeholder='새로운 비밀번호 확인.'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='password-input'
            />
            <button onClick={handleNextStep} className='password-btn'>
              비밀번호 바꾸기
            </button>
          </>
        );
      case 3:
        return (
          <>
            <div className='password-completion-title'>
              비밀번호 설정 완료!
              <div className='password-completion'>
              자동으로 로그아웃 됩니다. 
              <br />
              새로운 비밀번호로 재로그인 해주세요!
              </div>
            </div>
            <button onClick={handleNextStep} className='password-btn'>
              로그인 하기
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='settings-password-container'>
      <header className='settings-password-header'>
        <img src={ic_back} alt='back' className='back-icon' onClick={() => window.history.back()} />
        <div className='settings-password-title'>비밀번호 설정</div>
      </header>
      <div className='settings-password-content'>
        {renderStep()}
      </div>
    </div>
  );
};

export default SettingsPassword;