import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TimePicker from 'react-ios-time-picker';
import { useMealContext } from '../../MealContext';
import '../../pages/MealRecord/meal-record.css';

const emotions = {
    comfortable: { text: '편안해요' },
    joyful: { text: '즐거워요' },
    neutral: { text: '무난해요' },
    guilt: { text: '죄책감들어요' },
    irritated: { text: '짜증나요' },
    anxious: { text: '불안해요' },
    lonely: { text: '외로워요' }
};

const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        return ''; // Invalid date handling
    }

    const formatter = new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Seoul'
    });
    return formatter.format(date).replace('AM', '오전').replace('PM', '오후');
};

const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
};

const MealRecord = () => {
    const location = useLocation();
    const { state } = location;
    const initialTime = state?.initialTime;
    const selectedDate = state?.selectedDate;
    const mealId = state?.mealId;
    const navigate = useNavigate();
    const { addMealData, getMealDataById } = useMealContext();

    const existingMeal = mealId ? getMealDataById(mealId) : null;

    const [activeMeal, setActiveMeal] = useState(existingMeal?.mealType || null);
    const [activeWho, setActiveWho] = useState(existingMeal?.who || null);
    const [activeWhere, setActiveWhere] = useState(existingMeal?.where || null);
    const [mealImage, setMealImage] = useState(existingMeal?.mealImage || null);
    const [activeFeeling, setActiveFeeling] = useState(existingMeal?.feeling || null);
    const [menu, setMenu] = useState(existingMeal?.menu || '');
    const [otherWho, setOtherWho] = useState(existingMeal?.otherWho || '');
    const [otherWhere, setOtherWhere] = useState(existingMeal?.otherWhere || '');
    const [time, setTime] = useState(formatTime(existingMeal?.time ? new Date(existingMeal.time) : initialTime ? new Date(initialTime) : new Date()));
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : new Date());

    useEffect(() => {
        if (initialTime) {
            setTime(formatTime(new Date(initialTime)));
        }
        if (selectedDate) {
            setDate(new Date(selectedDate));
        }
    }, [initialTime, selectedDate]);

    const handleOptionClick = (optionType, value) => {
        switch(optionType) {
            case 'meal':
                setActiveMeal(value);
                break;
            case 'who':
                setActiveWho(value);
                break;
            case 'where':
                setActiveWhere(value);
                break;
            default:
                break;
        }
    };

    const startMeal = () => {
        if (isFormComplete()) {
            const newMeal = {
                date: date.toISOString(),  // Save as ISO string for consistency
                time,
                mealType: activeMeal,
                who: activeWho,
                where: activeWhere,
                feeling: activeFeeling,
                menu,
                otherWho,
                otherWhere,
                mealImage
            };

            if (mealId) {
                addMealData(mealId, newMeal); // Update existing meal record
            } else {
                addMealData(Date.now().toString(), newMeal); // Create new meal record
            }
            navigate('/meal-guide', { state: { selectedDate: date } }); // Navigate to meal-guide page with selectedDate
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setMealImage(URL.createObjectURL(file));
        }
    };

    const handleFeelingClick = (feeling) => {
        setActiveFeeling(feeling);
    };

    const handleTimeChange = (newTime) => {
        const newDate = new Date();
        const [hours, minutes] = newTime.split(':');
        newDate.setHours(parseInt(hours, 10));
        newDate.setMinutes(parseInt(minutes, 10));
        setTime(formatTime(newDate));
    };

    const toggleTimePicker = () => {
        setIsTimePickerOpen(!isTimePickerOpen);
    };

    const handleMenuChange = (event) => {
        setMenu(event.target.value);
    };

    const handleOtherInputChange = (event, type) => {
        if (type === 'who') {
            setOtherWho(event.target.value);
        } else if (type === 'where') {
            setOtherWhere(event.target.value);
        }
    };

    const isFormComplete = () => {
        return activeMeal && activeWho && activeWhere && activeFeeling && menu;
    };

    return (
        <div className="meal-record-container">
            <div className="header">
                <span className="date">
                    {formatDate(date)}
                </span>
                <div className="icons">
                    <div className="icon back-icon" onClick={() => navigate('/main')} />
                </div>
            </div>
            <form className="record-form">
                <div className="time-group">
                    <label className="time-label">시간</label>
                    <div className="time-display">
                        <span className='record-time'>{time}</span>
                        <img className="time-icon" onClick={toggleTimePicker} />
                    </div>
                    {isTimePickerOpen && (
                        <div className="time-picker-container">
                            <TimePicker
                                value={time}
                                onChange={handleTimeChange}
                                style={{ marginTop: '10px' }}
                                className="custom-time-picker"
                            />
                        </div>
                    )}
                </div>
                <div className="meal-group">
                    <label>식사 종류</label>
                    <div className="options">
                        {['breakfast', 'lunch', 'dinner', 'snack', 'dessert'].map(meal => (
                            <div
                                key={meal}
                                className={`option ${activeMeal === meal ? 'active' : ''}`}
                                onClick={() => handleOptionClick('meal', meal)}
                            >
                                {meal === 'breakfast' && '아침'}
                                {meal === 'lunch' && '점심'}
                                {meal === 'dinner' && '저녁'}
                                {meal === 'snack' && '야식'}
                                {meal === 'dessert' && '간식'}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="menu-group">
                    <label>메뉴</label>
                    <textarea
                        placeholder="메뉴명을 입력하세요."
                        rows="2"
                        value={menu}
                        onChange={handleMenuChange}
                    />
                    <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    <label htmlFor="image-upload" className="upload-btn">
                        {mealImage ? <img src={mealImage} alt="Meal" className="uploaded-image" /> : <div className="upload-placeholder" />}
                    </label>
                </div>
                <div className="who-group">
                    <label>누구와 먹었나요?</label>
                    <div className="options">
                        {['alone', 'friends', 'partner', 'colleague', 'other'].map(who => (
                            <div
                                key={who}
                                className={`option ${activeWho === who ? 'active' : ''}`}
                                onClick={() => handleOptionClick('who', who)}
                            >
                                {who === 'alone' && '혼자'}
                                {who === 'friends' && '친구'}
                                {who === 'partner' && '연인'}
                                {who === 'colleague' && '직장동료'}
                                {who === 'other' && '기타'}
                            </div>
                        ))}
                    </div>
                    {activeWho === 'other' && (
                        <input
                            type="text"
                            placeholder="입력"
                            className="other-input"
                            value={otherWho}
                            onChange={(e) => handleOtherInputChange(e, 'who')}
                        />
                    )}
                </div>
                <div className="where-group">
                    <label>어디에서 먹었나요?</label>
                    <div className="options">
                        {['home', 'restaurant', 'school', 'work', 'other'].map(where => (
                            <div
                                key={where}
                                className={`option ${activeWhere === where ? 'active' : ''}`}
                                onClick={() => handleOptionClick('where', where)}
                            >
                                {where === 'home' && '집'}
                                {where === 'restaurant' && '식당'}
                                {where === 'school' && '학교'}
                                {where === 'work' && '직장'}
                                {where === 'other' && '기타'}
                            </div>
                        ))}
                    </div>
                    {activeWhere === 'other' && (
                        <input
                            type="text"
                            placeholder="입력"
                            className="other-input"
                            value={otherWhere}
                            onChange={(e) => handleOtherInputChange(e, 'where')}
                        />
                    )}
                </div>
                <div className="emotion-group">
                    <label>식사 전 기분은 어때요?</label>
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
                <div className="start-meal">
                    <div className="start-label">자, 이제 식사 하러 가볼까요?</div>
                    <button
                        type="button"
                        onClick={startMeal}
                        className={`start-button ${isFormComplete() ? 'active' : ''}`}
                        disabled={!isFormComplete()}
                    >
                        식사 시작하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MealRecord;
