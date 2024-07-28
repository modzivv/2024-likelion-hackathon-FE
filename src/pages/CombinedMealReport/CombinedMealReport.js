import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMealContext } from '../../MealContext';
import '../../pages/MealRecord/meal-record.css';
import '../../pages/MealEnd/meal-end.css';

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

const CombinedMealReport = () => {
    const { mealId } = useParams();
    const navigate = useNavigate();
    const { getMealDataById } = useMealContext();
    const mealData = getMealDataById(mealId);

    if (!mealData) {
        return <div>레포트를 불러오지 못했습니다.</div>;
    }

    const {
        date,
        time,
        mealType,
        who,
        where,
        feeling,
        afterFeeling,
        symptom,
        otherSymptom,
        menu,
        otherWho,
        otherWhere,
        mealImage,
        memo
    } = mealData;

    return (
        <div className="meal-record-container">
            <div className="header">
                <span className="date">
                    {date ? new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) : '날짜 없음'}
                </span>
                <div className="icons">
                    <div className="icon back-icon" onClick={() => navigate('/main')} />
                </div>
            </div>
            <div className="record-form">
                <div className="time-group">
                    <label className="time-label">시간</label>
                    <div className="time-display">
                        <span className='record-time'>{time}</span>
                    </div>
                </div>
                <div className="meal-group">
                    <label>식사 종류</label>
                    <div className="options">
                        <div className={`option ${mealType ? 'active' : ''}`}>
                            {mealType === 'breakfast' && '아침'}
                            {mealType === 'lunch' && '점심'}
                            {mealType === 'dinner' && '저녁'}
                            {mealType === 'snack' && '야식'}
                            {mealType === 'dessert' && '간식'}
                        </div>
                    </div>
                </div>
                <div className="menu-group">
                    <label>메뉴</label>
                    <div>{menu}</div>
                    {mealImage && <img src={mealImage} alt="Meal" className="uploaded-image" />}
                </div>
                <div className="who-group">
                    <label>누구와 먹었나요?</label>
                    <div className="options">
                        <div className={`option ${who ? 'active' : ''}`}>
                            {who === 'alone' && '혼자'}
                            {who === 'friends' && '친구'}
                            {who === 'partner' && '연인'}
                            {who === 'colleague' && '직장동료'}
                            {who === 'other' && otherWho}
                        </div>
                    </div>
                </div>
                <div className="where-group">
                    <label>어디에서 먹었나요?</label>
                    <div className="options">
                        <div className={`option ${where ? 'active' : ''}`}>
                            {where === 'home' && '집'}
                            {where === 'restaurant' && '식당'}
                            {where === 'school' && '학교'}
                            {where === 'work' && '직장'}
                            {where === 'other' && otherWhere}
                        </div>
                    </div>
                </div>
                <div className="emotion-group">
                    <label>식사 전 기분은 어때요?</label>
                    <div className="meal-feelings">
                        <div className={`feeling feeling-${feeling} active`}>
                            <span>{emotions[feeling]?.text || '기분 없음'}</span>
                        </div>
                    </div>
                </div>


                
                <div className="meal-end-container">
                    <label className='meal-end-feeling'>식사 후 기분을 기록해주세요!</label>
                    <div className="emotion-group">
                        <div className="meal-feelings">
                            <div className={`feeling feeling-${afterFeeling} active`}>
                                <span>{emotions[afterFeeling]?.text || '기분 없음'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="symptom-group">
                        <label>증상을 기록해주세요!</label>
                        <div className="options">
                            <div className={`option ${symptom ? 'active' : ''}`}>
                                {symptom !== 'other' ? symptoms[symptom] : otherSymptom}
                            </div>
                        </div>
                    </div>
                    <textarea
                        placeholder="메모를 입력하세요.(선택)"
                        className="memo-input"
                        rows="2"
                        readOnly
                        value={memo || ''}
                    />
                </div>
            </div>
        </div>
    );
};

export default CombinedMealReport;
