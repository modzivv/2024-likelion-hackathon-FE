import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement } from 'chart.js';
import './TriggerAnalysis.css';

// Register BarElement to use borderRadius property
Chart.register(BarElement);

const TriggerAnalysis = () => {
  // 각 요일별로 발생한 트리거 횟수 합산
  const triggerData = { // 예시 데이터
    '월': ['폭식', '구토', '변비약 복용', '씹고 뱉기'],
    '화': ['구토'],
    '수': ['폭식', '구토', '씹고 뱉기'],
    '목': ['폭식', '변비약 복용'],
    '금': ['폭식', '변비약 복용', '씹고 뱉기'],
    '토': [],
    '일': ['폭식', '구토', '씹고 뱉기'],
  };

  const totalTriggersPerDay = Object.keys(triggerData).map(day => triggerData[day].length);

  const barData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '트리거 발생 횟수',
        data: totalTriggersPerDay,
        backgroundColor: '#FFCF24',
        borderRadius: 7, // 모서리 둥글게
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14
          }
        }
      }
    },
    maintainAspectRatio: false, // 차트 비율 유지 끔
    responsive: true, // 반응형 설정(그래야 내가 원하는 너비로 설정 할 수 있음)
  };

  const symptomData = {
    labels: ['폭식', '구토', '변비약 복용', '씹고 뱉기'],
    datasets: [
      {
        data: [4, 2, 3, 1],
        backgroundColor: ['#FFCF24', '#FFDA57', '#FFE589', '#FFF0BD'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='trigger-analysis'>
      <div className='trigger-title'>식사 트리거 증상 분석</div>
      <div className='trigger-sub-title'>주간 트리거 발생</div>
      <div className='trigger-chart-container'>
        <div className='trigger-chart-wrapper'>
          <Bar data={barData} options={options} />
        </div>
      </div>
      <div className='symptom-container'>
        <div className='symptom-bar'>
          {symptomData.labels.map((label, index) => (
            <div key={index} className='symptom-segment' 
            style={{ backgroundColor: symptomData.datasets[0].backgroundColor[index],
            flexGrow: symptomData.datasets[0].data[index] }}>
            </div>
          ))}
        </div>
        <div className='symptom-labels'>
          {symptomData.labels.map((label, index) => (
            <div key={index} className='symptom-label'>
              <div className='symptom-dot' 
              style={{ backgroundColor: symptomData.datasets[0].backgroundColor[index] }}></div>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TriggerAnalysis;