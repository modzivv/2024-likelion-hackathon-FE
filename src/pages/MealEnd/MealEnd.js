import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './meal-end.css';
import moment from 'moment';

const emotions = {
    COMFORTABLE: { text: '편안해요' },
    HAPPY: { text: '즐거워요' },
    EASY: { text: '무난해요' },
    GUILT: { text: '죄책감들어요' },
    IRRITATE: { text: '짜증나요' },
    ANXIOUS: { text: '불안해요' },
    LONELY: { text: '외로워요' }
};

const symptoms = {
    VOMIT: '구토',
    MEDICINE: '변비약 복용',
    BINGE: '폭식',
    REDUCE: '양 줄이기',
    SPIT: '씹고 뱉기',
    DIETMEDICINE: '다이어트약 복용',
    EXERCISE: '과한 운동',
    OTHER: '기타',
    NOTHING: '증상이 없었어요!'
};

const MealEnd = () => {
    const { date: urlDate } = useParams(); // URL 파라미터에서 date 가져오기
    const location = useLocation();
    const [activeFeeling, setActiveFeeling] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [otherSymptom, setOtherSymptom] = useState('');
    const [memo, setMemo] = useState('');
    const [foodDiaryId, setFoodDiaryId] = useState('');
    const [date, setDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFoodDiaryId = localStorage.getItem('foodDiaryId');
        if (storedFoodDiaryId) {
            setFoodDiaryId(storedFoodDiaryId);
        } else {
            console.error('Food Diary ID not found in local storage');
            navigate('/main');
            return;
        }

        // `date`가 URL 파라미터로 전달된 경우
        if (urlDate) {
            setDate(moment(urlDate).format('YYYY-MM-DD'));
        } else {
            // `location.state`에서 `date`를 가져오는 경우
            const { selectedDate = '' } = location.state || {};
            if (selectedDate) {
                setDate(moment(selectedDate).format('YYYY-MM-DD'));
            } else {
                // `date`를 로컬 스토리지에서 가져오는 경우
                const storedDate = localStorage.getItem('selectedDate');
                if (storedDate) {
                    setDate(moment(storedDate).format('YYYY-MM-DD'));
                } else {
                    console.error('Date not found in location state and local storage');
                    navigate('/main');
                    return;
                }
            }
        }
    }, [location.state, navigate, urlDate]);

    const handleFeelingClick = (feeling) => {
        setActiveFeeling(feeling);
    };

    const handleSymptomClick = (symptom) => {
        setSelectedSymptoms(prev => {
            if (prev.includes(symptom)) {
                return prev.filter(s => s !== symptom);
            } else {
                return [...prev, symptom];
            }
        });
        if (symptom === 'OTHER') {
            setOtherSymptom('');
        }
    };

    const handleOtherInputChange = (e) => {
        setOtherSymptom(e.target.value);
    };

    const handleMemoChange = (e) => {
        setMemo(e.target.value);
    };

    const completeMealRecord = async () => {
        const token = localStorage.getItem('jwtToken');
        const mealEndTime = localStorage.getItem('mealEndTime');

        if (!token || !mealEndTime || !foodDiaryId || !date) {
            console.error('Token, meal end time, foodDiaryId, or date missing');
            return;
        }

        const symptomsToSend = selectedSymptoms.includes('OTHER') ? [...selectedSymptoms, otherSymptom] : selectedSymptoms;

        const requestBody = {
            foodDiaryId,
            afterfeeling: activeFeeling,
            symptoms: symptomsToSend,
            memo
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/foodcomplete/${date}`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Meal record completed successfully:', response.data);
            navigate('/main');
        } catch (error) {
            console.error('Error completing meal record:', error.response?.data || error.message);
        }
    };

    const isFormComplete = () => {
        return activeFeeling && selectedSymptoms.length > 0 && 
               (selectedSymptoms.includes('OTHER') ? otherSymptom.trim() !== '' : true);
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
                                className={`feeling feeling-${feeling.toUpperCase()} ${activeFeeling === feeling ? 'active' : ''}`}
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
                                className={`option ${selectedSymptoms.includes(symptom) ? 'active' : ''}`}
                                onClick={() => handleSymptomClick(symptom)}
                            >
                                {symptoms[symptom]}
                            </div>
                        ))}
                    </div>
                    {selectedSymptoms.includes('OTHER') && (
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
                    value={memo}
                    onChange={handleMemoChange}
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
