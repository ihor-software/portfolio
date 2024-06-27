import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function VisualizationPage() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/predict');
        setAnalysis(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (analysis) {
      renderCharts();
    }
  }, [analysis]);

  const renderCharts = () => {
    renderPrecisionRecallChart();

    renderConfusionMatrixPieChart();
  };

  const renderPrecisionRecallChart = () => {
    const ctx = document.getElementById('precisionRecallChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(analysis.report),
        datasets: [
          {
            label: 'Precision',
            data: Object.values(analysis.report).map(item => item.precision),
            backgroundColor: 'rgba(255, 99, 132, 0.5)', 
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Recall',
            data: Object.values(analysis.report).map(item => item.recall),
            backgroundColor: 'rgba(54, 162, 235, 0.5)', 
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderConfusionMatrixPieChart = () => {
    const ctx = document.getElementById('confusionMatrixPieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['True Positive', 'False Positive', 'True Negative', 'False Negative'],
        datasets: [{
          label: 'Confusion Matrix',
          data: analysis.matrix.flat(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', 
            'rgba(54, 162, 235, 0.5)', 
            'rgba(255, 206, 86, 0.5)', 
            'rgba(75, 192, 192, 0.5)', 
          ],
        }],
      },
    });
  };

  return (
    <div className="container" style={{marginTop: '50px'}}>
      {analysis ? (
        <div className="analysis-results" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="chart-container">
            <canvas id="precisionRecallChart" width="400" height="400"></canvas>
          </div>
          <div className="chart-container">
            <canvas id="confusionMatrixPieChart" width="400" height="400"></canvas>
          </div>
        </div>
      ) : (
        <p>Loading analysis...</p>
      )}
    </div>
  );
}

export default VisualizationPage;
