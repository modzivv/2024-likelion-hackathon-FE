import React from 'react';
import './BingeEatingAnalysis.css';
import emotion1 from '../../assets/icon-mood-smile.png';
import emotion2 from '../../assets/icon-mood-happy.png';
import emotion3 from '../../assets/icon-mood-empty-2.png'; 
import emotion4 from '../../assets/icon-mood-sad.png'; 
import emotion5 from '../../assets/icon-mood-angry.png'; 
import emotion6 from '../../assets/icon-mood-wrrr.png'; 
import emotion7 from '../../assets/icon-mood-confuzed.png'; 



const BingeEatingAnalysis = () => {
  return (
    <div className='binge-eating-analysis'>
      <div className='binge-eating-title'>폭식</div>
      
      <div className='meal-container'>
        <div className='meal-box'>
          <h3 className='meal-title'>식사 전</h3>
          <ul className='meal-list'>
            <li className='meal-item'>
              <span className='number'>1</span>
              <img src={emotion3} alt='emotion3' className='emotion' />
              <span className='count'>3회</span>
            </li>
            <li className='meal-item'>
              <span className='number'>2</span>
              <img src={emotion2} alt='emotion2' className='emotion' />
              <span className='count'>2회</span>
            </li>
            <li className='meal-item'>
              <span className='number'>3</span>
              <img src={emotion6} alt='emotion6' className='emotion' />
              <span className='count'>2회</span>
            </li>
          </ul>
          <p className='meal-comment'>주로 무난함을 느꼈어요!</p>
        </div>
        
        <div className='meal-box'>
          <h3 className='meal-title'>식사 후</h3>
          <ul className='meal-list'>
            <li className='meal-item'>
              <span className='number'>1</span>
              <img src={emotion6} alt='emotion6' className='emotion' />
              <span className='count'>3회</span>
            </li>
            <li className='meal-item'>
              <span className='number'>2</span>
              <img src={emotion4} alt='emotion4' className='emotion' />
              <span className='count'>2회</span>
            </li>
            <li className='meal-item'>
              <span className='number'>3</span>
              <img src={emotion7} alt='emotion' className='emotion' />
              <span className='count'>2회</span>
            </li>
          </ul>
          <p className='meal-comment'>주로 불안함을 느꼈어요!</p>
        </div>
      </div>

      <div className='time-eating-analysis'>
        <div className='time-eating-container'>
        <p className='time-eating-title'>주로 00시간대 식사했을 때 폭식을 했어요</p>
        <div className='time-eating-bar'>
          <div className='time-eating-segment' style={{ width: '40%', backgroundColor: '#696A73' }}></div>
          <div className='time-eating-segment' style={{ width: '20%', backgroundColor: '#FFCF24' }}></div>
          <div className='time-eating-segment' style={{ width: '20%', backgroundColor: '#FFE589' }}></div>
          <div className='time-eating-segment' style={{ width: '20%', backgroundColor: '#FFD700' }}></div>
        </div>
        <div className='time-eating-labels'>
          <div className='time-eating-label'>
            <div className='time-eating-dot' style={{ backgroundColor: '#696A73' }}></div>
            야식
          </div>
          <div className='time-eating-label'>
            <div className='time-eating-dot' style={{ backgroundColor: '#FFCF24' }}></div>
            저녁
          </div>
          <div className='time-eating-label'>
            <div className='time-eating-dot' style={{ backgroundColor: '#FFE589' }}></div>
            점심
          </div>
          <div className='time-eating-label'>
            <div className='time-eating-dot' style={{ backgroundColor: '#FFD700' }}></div>
            아침
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BingeEatingAnalysis;
