import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Settings from '../../pages/Settings/Settings';
import SettingsProfile from '../../pages/Settings/SettingsProfile';
import SettingsPassword from '../../pages/Settings/SettingsPassword';
import PraiseMyself from '../../pages/PraiseMyself/PraiseMyself';
import BingeEatingAnalysis from '../../pages/MyPage/BingeEatingAnalysis';
import PositiveMealAnalysis from '../../pages/MyPage/PositiveMealAnalysis';
import TriggerAnalysis from '../../pages/MyPage/TriggerAnalysis';
import UserInfo from '../../pages/MyPage/UserInfo';
import WeeklyReport from '../../pages/MyPage/WeeklyReport';



function App() {

  const startDate = '7.22';
  const endDate = '7.28';

  //모바일 실제 화면 크기에 맞추기
  // function setScreenSize() {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }
  // useEffect(() => {
  //   setScreenSize();
  // });

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/mypage' element={
            <>
              <UserInfo name='김예원' daysManaged={72} 
              mealManagement={6} complimentDone={6}/>
              <WeeklyReport startDate={startDate} endDate={endDate} />
              <TriggerAnalysis />
              <BingeEatingAnalysis />
              <PositiveMealAnalysis />
            </>
          } />
          <Route path='/settings' element={<Settings />} />
          <Route path='/settings/profile' element={<SettingsProfile />} />
          <Route path='/settings/password' element={<SettingsPassword />} />
          <Route path='/praisemyself' element={<PraiseMyself />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;