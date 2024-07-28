import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Login/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password') {
      navigate('/main');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleJoinClick = () => {
    navigate('/join');
  };

  return (
    <div className="login-container">
      <h1 className='login-title'>로그인</h1>
      <div className="input-container">
        <input className='login-input'
          type="email"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className='login-input'
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p className='login-comment'>
        아직 회원이 아니신가요? <a className='login-to-join-comment' href="#!" onClick={handleJoinClick}>회원가입</a>
      </p>
      <button className="login-button" onClick={handleLogin}>로그인</button>
      <button className="google-button">
        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_48dp.png" alt="Google logo" />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
