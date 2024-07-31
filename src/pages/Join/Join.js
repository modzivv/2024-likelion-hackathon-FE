import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Join/Join.css'; 

const Join = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/join-general'); 
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="join-container">
      <h1 className='join-title'>회원가입</h1>

      <button className="join-button" onClick={handleJoinClick}>이메일로 회원가입</button>
      <button className="google-button">
        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_48dp.png" alt="Google logo" />
        Continue with Google
      </button>

      <p className='join-comment'>
        이미 회원이신가요? <a href="#!" onClick={handleLoginClick}>로그인</a>
      </p>
    </div>
  );
};

export default Join;