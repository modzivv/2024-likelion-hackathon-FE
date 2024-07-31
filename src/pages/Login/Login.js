import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../pages/Login/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/members/login', {
        username: email,
        password: password
      }, {
        withCredentials: true // 쿠키를 포함한 요청
      });

      if (response.status === 200) {
        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem('jwtToken', response.data.token);
        navigate('/main'); // 로그인 성공 후 메인 페이지로 이동
      } else {
        setError('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
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
      {error && <p className='error-message'>{error}</p>}
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