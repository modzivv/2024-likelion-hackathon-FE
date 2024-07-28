import React, { useState } from 'react';
import './PraiseMyself.css';

const guide = [
  "오늘 나에게 바뀐 점이 있나요?",
  "바뀐 점들 중 어떤 점이 가장 마음에 드나요?",
  "그 점을 이용하여 나에게 칭찬을\n남겨주세요."
];

const keywords = ['살', '마른'];

const PraiseMyself = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleNext = () => {
    const currentAnswer = answers[step];
    const containsKeyword = keywords.some(keyword => currentAnswer.includes(keyword));

    if (currentAnswer.trim() === '') {
      setError('답변을 입력해주세요!');
    } else if (containsKeyword) {
      setError('직접적인 외모 언급보다는 변화된 것이 무엇인지에 집중해보세요!');
    } else {
      setError('');
      if (step < guide.length - 1) {
        setStep(step + 1);
      } else {
        // 마지막 질문 완료 시
        submitCompliments();
      }
    }
  };

  const handleChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
    setError(''); // 에러 메시지 초기화
  };

  const submitCompliments = async () => {
    const compliments = {
      compliment1: answers[0],
      compliment2: answers[1],
      compliment3: answers[2],
      compliment4: answers[3] || "" 
    };

    try {
      const response = await fetch('http://localhost:8080/compliments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QxQGV4YW1wbGUuY29tIiwicm9sZSI6Iltjb20ubGlrZWxpb24xMnRoLnBpb25lZXJfMm5lMS5qd3QuQ3VzdG9tVXNlckRldGFpbHMkMUA1MGYyM2ZdIiwiaWF0IjoxNzIyMTc0ODQzLCJleHAiOjE3MjIxNzg0NDN9.r8KSgC0ffiHmLHfmeQWCNDID4MUAm5NbQTU99XJtV70' // 여기에 실제 JWT 토큰을 넣어야 합니다.
        },
        body: JSON.stringify(compliments)
      });

      if (response.ok) {
        alert('칭찬일기가 성공적으로 저장되었습니다!');
      } else {
        const errorData = await response.json();
        setApiError(errorData.message || '칭찬일기 저장에 실패했습니다.');
      }
    } catch (error) {
      setApiError('네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className='praisemyself-container'>
      {step < guide.length ? (
        <>
          <div className='guide'>
            {guide[step].split('\n').map((line, index) => (
              <p key={index} className='guide-line'>{line}</p>
            ))}
          </div>
          <input
            type='text'
            placeholder='내 답변 입력'
            value={answers[step]}
            onChange={handleChange}
            className={`answer-input ${error ? 'error-input' : ''}`}  // 오류 시 'error-input' 클래스 추가
          />
          {error && <p className='error-message'>{error}</p>}
          {apiError && <p className='error-message'>{apiError}</p>}
          <button onClick={handleNext} className='guide-next-btn'>
            다음으로
          </button>
        </>
      ) : (
        <div className='summary'>
          <div className='summary-title'>오늘 나에게 칭찬한 점이에요!</div>
          <div className='answers'>
            {answers.map((answer, index) => (
              <p key={index} className='answer-summary'>{answer}</p>
            ))}
          </div>
          <button className='guide-next-btn' onClick={submitCompliments}>
            오늘의 칭찬 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default PraiseMyself;