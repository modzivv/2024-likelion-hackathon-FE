import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../pages/MealGuide/meal-guide.css';

const MealGuide = () => {
    const [timeLeft, setTimeLeft] = useState(1800);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedDate } = location.state || { selectedDate: new Date() };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleStopMeal = () => {
        if (timeLeft > 0) {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleFinishMeal = () => {
        setShowModal(false);
        navigate('/meal-end');
    };

    return (
        <div className="meal-guide-container">
            {selectedDate && (
                <div className="meal-guide-date">
                    {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                </div>
            )}
            <div className="timer">{formatTime(timeLeft)}</div>
            <div className="character-container">
                <div className="yellow-background" style={{ height: `${(timeLeft / 1800) * 100}%` }}></div>
                <div className="character"></div>
            </div>
            <div className="recommendation">최소 30분 이상 식사를 권장해요!</div>
            <button className="stop-meal-button" onClick={handleStopMeal}>식사 중단하기</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>너무 빨라요! 급한 상황이 아니라면 천천히 식사를 즐겨보세요.</p>
                        <button onClick={closeModal}>취소</button>
                        <button onClick={handleFinishMeal}>식사 마치기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealGuide;
