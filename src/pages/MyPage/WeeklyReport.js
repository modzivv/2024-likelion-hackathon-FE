// src/components/WeeklyReport.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import './WeeklyReport.css';

const WeeklyReport = (props) => {
  const { startDate, endDate } = props;
  
  const data = {
    labels: ['점심', '저녁', '야식'],
    datasets: [
      {
        data: [20, 40, 40], // 임의로 데이터 입력
        backgroundColor: ['#FFCF24', '#696A73', '#FFE589'],
        borderWidth: 0, // 차트 사이에 있는 흰색 구분선 제거
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true, // 원형으로 표시
          pointStyle: 'circle', // 원형으로 표시
        },
      },
    },
  };

  return (
    <div className='weekly-report'>
      <div className='weekly-report-title-container'>
        <div className='weekly-report-title'>주간 리포트
          <span className='weekly-report-date'>({startDate} - {endDate})</span>
        </div>
      </div>
      <div className='weekly-report-chart-container'>
        <Pie data={data} options={options} />
      </div>
      <div className='weekly-report-message-container'>
        <div className='weekly-report-message'>규칙적으로 세끼 식사를 하는게 좋아요!</div>
      </div>
    </div>
  );
};

export default WeeklyReport;
