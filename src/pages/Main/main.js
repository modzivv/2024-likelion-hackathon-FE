import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import '../../pages/Main/main.css';
import { useMealContext } from '../../MealContext';

const mealTypes = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  snack: '야식',
  dessert: '간식'
};

const emotions = {
  comfortable: { text: '편안해요' },
  joyful: { text: '즐거워요' },
  neutral: { text: '무난해요' },
  guilt: { text: '죄책감들어요' },
  irritated: { text: '짜증나요' },
  anxious: { text: '불안해요' },
  lonely: { text: '외로워요' }
};

const symptoms = {
  vomit: '구토',
  constipation: '변비약 복용',
  binge: '폭식',
  reduce: '양 줄이기',
  spit: '씹고 뱉기',
  dietPills: '다이어트약 복용',
  exercise: '과한 운동',
  other: '기타',
  none: '증상이 없었어요!'
};

function MainApp() {
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const { mealData } = useMealContext();

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleButtonClick = (page, mealId = null) => {
    if (mealId) {
      navigate(`/meal-report/${mealId}`);
    } else {
      navigate(`/${page}`, { state: { selectedDate } });
    }
  };

  const handleNextWeek = () => {
    const nextWeek = moment(date).add(1, 'week').toDate();
    setDate(nextWeek);
    setSelectedDate(nextWeek);
  };

  const handlePrevWeek = () => {
    const prevWeek = moment(date).subtract(1, 'week').toDate();
    setDate(prevWeek);
    setSelectedDate(prevWeek);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    const startOfWeek = moment(day).startOf('isoWeek').toDate();
    setDate(startOfWeek);
  };

  const startOfWeek = moment(date).startOf('isoWeek').toDate();
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(moment(startOfWeek).add(i, 'days').toDate());
  }

  useEffect(() => {
    if (view === 'month') {
      setDate(selectedDate);
    }
  }, [selectedDate, view]);

  const getMealForDate = (date) => {
    return Object.keys(mealData).filter(id => moment(mealData[id].date).isSame(moment(date), 'day'));
  };

  const renderMealReport = (mealId) => {
    const meal = mealData[mealId];
    if (!meal) return null;

    const formattedTime = moment(meal.time, 'HH:mm').format('A hh시 mm분');

    return (
      <div className="MealReport" onClick={() => handleButtonClick('meal-report', mealId)} key={mealId}>
        <div className="meal-header">
          <div className="meal-title">
            <span className="meal-icon" />
            {mealTypes[meal.mealType]}
          </div>
          <div className="meal-time">{formattedTime}</div>
        </div>
        <div className="meal-content">
          <div className="meal-status">
            <span className={`meal-emoji meal-emoji-before ${meal.feeling}`} />
            <span className={`meal-emoji meal-emoji-after ${meal.afterFeeling}`} />
          </div>
          <div className="meal-description">
            {meal.menu}
            <button className="meal-toast-button">{symptoms[meal.symptom]}</button>
          </div>
        </div>
      </div>
    );
  };

  const handleStartMeal = () => {
    navigate('/meal-record', { state: { selectedDate, initialTime: new Date() } }); // initialTime 추가
  };

  return (
    <div className="main-container">
      <div>
        <div className="header">
          <div className="title">데일리 식사 일기</div>
          <div className="icons">
            <div className="icon user-icon" onClick={() => handleButtonClick('mypage')} />
            <div className="icon settings-icon" onClick={() => handleButtonClick('settings')} />
          </div>
        </div>
        <div className="calendar-container">
          <div className="calendar-header">
            <span>{selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
            <select value={view} onChange={handleViewChange}>
              <option value="week">주간</option>
              <option value="month">월간</option>
            </select>
          </div>
          {view === 'month' ? (
            <div className="month-calendar">
              <Calendar
                onChange={(newDate) => {
                  setDate(newDate);
                  setSelectedDate(newDate);
                }}
                value={date}
                showNeighboringMonth
                formatDay={(locale, date) => moment(date).format('D')}
                tileClassName={({ date }) => {
                  if (moment(date).isSame(selectedDate, 'day')) {
                    return 'selected-date';
                  }
                }}
              />
            </div>
          ) : (
            <div className="week-calendar">
              <div className="navigation">
                <button onClick={handlePrevWeek}>{'‹'}</button>
                <div>{moment(date).format('YYYY년 M월')}</div>
                <button onClick={handleNextWeek}>{'›'}</button>
              </div>
              <div className="week-header">
                {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                  <div key={index} className="react-calendar__month-view__weekdays__weekday">
                    <abbr>{day}</abbr>
                  </div>
                ))}
              </div>
              <div className="week-days">
                {daysOfWeek.map(day => (
                  <div
                    key={day}
                    className={`day-cell ${moment(day).isSame(selectedDate, 'day') ? 'selected' : ''}`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="daily-quiz">
          <div className='meal-guide'>안녕하세요, OOO님~
            <br />
            오늘의 나에게 칭찬할 점을 남겨주세요!</div>
          <button
            className="quiz-button"
            onClick={() => handleButtonClick('daily-quiz')}>
          </button>
        </div>

        {getMealForDate(selectedDate).map(mealId => renderMealReport(mealId))}

        <div className="record-button-container">
          <button
            className="record-button"
            onClick={handleStartMeal}> {/* Change to handleStartMeal */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainApp;
