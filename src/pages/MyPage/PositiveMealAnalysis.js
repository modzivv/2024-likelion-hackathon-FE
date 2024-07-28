import React from 'react';
import './PositiveMealAnalysis.css';
import ic_arrow from '../../assets/icon-arrow.png';
import emotion1 from '../../assets/icon-mood-smile-2.png';

const PositiveMealAnalysis = () => {

  const handleButtonClick = () => {
    window.location.href = 'https://www.eatingresearch.kr/diagnosis/diagnosis.asp';
  };

  return (
    <>
      <div className='positive-meal-container'>
        <div className='positive-meal-header'>
          가장 긍정적으로 식사를 마친 날의 식사 일기 분석이에요!
        </div>
        <div className='tags-and-emotion-container'>
          <div className='tags-container'>
            <div className='tag'>아침식사</div>
            <div className='tag'>집</div>
            <div className='tag'>혼자</div>
            <div className='tag'>가볍게</div>
            <div className='tag'>메뉴명</div>
          </div>
          <div className='emotion-container'>
            <div className='emotion-tag'>
              감정 :
              <img src={emotion1} alt='emotion1' className='emotion' />
              <span className='emotion-text'>편안해요</span>
            </div>
          </div>
        </div>
      </div>
      <div className='self-diagnosis-container'>
        <div className='self-diagnosis-button' onClick={handleButtonClick}>
          자가진단 하러 가기
          <img src={ic_arrow} alt='self-diagnosis' className='self-diagnosis-img'></img>
        </div>
      </div>
    </>
  );
};

export default PositiveMealAnalysis;