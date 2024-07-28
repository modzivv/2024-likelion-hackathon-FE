import React, { useState } from 'react';
import './PraiseMyself.css';

const guide = [
  "오늘 스타일에 바뀐 점이 있나요?",
  "바뀐 점들 중 어떤 점이 가장 마음에 드나요?",
  "그 점을 이용하여 나에게 칭찬을\n남겨주세요."
];

const keywords = ['살', '마른'];

const PraiseMyself = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);

  const handleNext = () => {
    if (step < guide.length - 1) {
      setStep(step + 1);
    } else {
      // 마지막 질문 이후
      setStep(guide.length);
    }
  };

  const handleChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
  };

  const highlightKeywords = (text) => {
    return text.split(/(\s+)/).map((segment, index) => {
      let highlightedSegment = segment;
      
      keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        highlightedSegment = highlightedSegment.replace(regex, `<span style="color: #FFCF24;">$1</span>`);
      });
  
      return (
        <span key={index} dangerouslySetInnerHTML={{ __html: highlightedSegment }} />
      );
    });
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
            className='answer-input'
          />
          <button onClick={handleNext} className='guide-next-btn'>
            다음으로
          </button>
        </>
      ) : (
        <div className='summary'>
          <div className='summary-title'>오늘 나에게 칭찬한 점이에요!</div>
          <div className='answers'>
            {answers.map((answer, index) => (
              <p key={index} className='answer-summary'>{highlightKeywords(answer)}</p>
            ))}
          </div>
          <button className='guide-next-btn'>
            오늘의 칭찬 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default PraiseMyself;

