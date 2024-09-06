import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../pages/JoinGeneral/JoinGeneral.css';

const JoinGeneral = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (email && password && password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:8080/members/join', {
          name,
          email,
          password,
          confirmPassword
        }, {
          withCredentials: true
        });
        if (response.status === 201) {
          navigate('/login');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      } catch (error) {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    } else if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      alert('이메일과 비밀번호를 입력해 주세요');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="join-general-container">
      <h1 className='join-general-title'>회원가입</h1>
      <div className="input-container">
        <input className='join-general-input'
          type="text"
          placeholder="이름을 입력하세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input className='join-general-input'
          type="email"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className='join-general-input'
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className='join-general-input'
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <p className='join-comment'>
        이미 회원이신가요? <a href="#!" onClick={handleLoginClick}>로그인</a>
      </p>
      <button className="join-general-button" onClick={handleJoin}>회원가입</button>
    </div>
  );
};

export default JoinGeneral;