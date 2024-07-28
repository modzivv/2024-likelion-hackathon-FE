import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './meal-end.css';
import { useMealContext } from '../../MealContext';

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

const MealEnd = () => {
    const navigate = useNavigate();
    const { mealData, addMealData, getMealDataById } = useMealContext();
    const mealId = mealData.mealId || Object.keys(mealData)[0]; // Use the first mealId if no specific mealId is in context
    const existingMeal = getMealDataById(mealId);

    const [activeFeeling, setActiveFeeling] = useState(existingMeal?.afterFeeling || '');
    const [activeSymptom, setActiveSymptom] = useState(existingMeal?.symptom || '');
    const [otherSymptom, setOtherSymptom] = useState(existingMeal?.otherSymptom || '');

    const handleFeelingClick = (feeling) => {
        setActiveFeeling(feeling);
        addMealData(mealId, { afterFeeling: feeling });
    };

    const handleSymptomClick = (symptom) => {
        setActiveSymptom(symptom);
        addMealData(mealId, { symptom });
        if (symptom !== 'other') {
            setOtherSymptom('');
        }
    };

    const handleOtherInputChange = (e) => {
        const value = e.target.value;
        setOtherSymptom(value);
        addMealData(mealId, { symptom: 'other', otherSymptom: value });
    };

    const completeMealRecord = () => {
        navigate('/main');
    };

    const isFormComplete = () => {
        return activeFeeling && (activeSymptom !== 'other' || otherSymptom.trim() !== '');
    };

    return (
        <div className="meal-end-container">
            <form className="end-form">
                <label className='meal-end-feeling'>식사 후 기분을 기록해주세요!</label>
                <div className="emotion-group">
                    <div className="meal-feelings">
                        {Object.keys(emotions).map(feeling => (
                            <div
                                key={feeling}
                                className={`feeling feeling-${feeling} ${activeFeeling === feeling ? 'active' : ''}`}
                                onClick={() => handleFeelingClick(feeling)}
                            >
                                <span>{emotions[feeling].text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="symptom-group">
                    <label>증상을 기록해주세요!</label>
                    <div className="options">
                        {Object.keys(symptoms).map(symptom => (
                            <div
                                key={symptom}
                                className={`option ${activeSymptom === symptom ? 'active' : ''}`}
                                onClick={() => handleSymptomClick(symptom)}
                            >
                                {symptoms[symptom]}
                            </div>
                        ))}
                    </div>
                    {activeSymptom === 'other' && (
                        <input
                            type="text"
                            placeholder="입력"
                            className="other-input"
                            value={otherSymptom}
                            onChange={handleOtherInputChange}
                        />
                    )}
                </div>
                <textarea
                    placeholder="메모를 입력하세요.(선택)"
                    className="memo-input"
                    rows="2"
                />
                <div className="end-meal">
                    <button
                        type="button"
                        onClick={completeMealRecord}
                        className={`end-button ${isFormComplete() ? 'active' : ''}`}
                        disabled={!isFormComplete()}
                    >
                        식사 기록 완료!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MealEnd;
