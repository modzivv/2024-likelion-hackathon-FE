import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MealProvider } from '../../MealContext';
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

import Login from '../../pages/Login/Login'; 
import Join from '../../pages/Join/Join'; 
import JoinGeneral from '../../pages/JoinGeneral/JoinGeneral';
import Main from '../../pages/Main/main';
import MealRecord from '../../pages/MealRecord/MealRecord';
import MealGuide from '../../pages/MealGuide/MealGuide';
import MealEnd from '../../pages/MealEnd/MealEnd';
import CombinedMealReport from '../../pages/CombinedMealReport/CombinedMealReport';
import Oauth2RedirectHandler from '../../components/Oauth2RedirectHandler';

function App() {

  const startDate = '7.22';
  const endDate = '7.28';

  return (
    <MealProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/join-general" element={<JoinGeneral />} />
            <Route path="/main" element={<Main />} />
            <Route path="/meal-record" element={<MealRecord />} />
            <Route path="/meal-guide" element={<MealGuide />} />
            <Route path="/meal-end" element={<MealEnd />} />
            <Route path="/combined-meal-report" element={<CombinedMealReport />} />
            <Route path='/mypage' element={
              <>
                <UserInfo name='김예원' daysManaged={72} />
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
            <Route path="/oauth2/redirect" element={<Oauth2RedirectHandler />} />
          </Routes>
        </div>
      </Router>
    </MealProvider>
  );
}

export default App;
