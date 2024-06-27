import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParametersTableComponent from '../Components/ParametersTableComponent';
import ApplyButton from '../UIComponents/ApplyButton';
import CardComponent from '../Components/CardComponent';
import LaunchParametersComponent from '../Components/LaunchParametersComponent';
import Button from 'react-bootstrap/Button';

function DiagnosticsPage({ setLaunchParameters }) {
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [launchParameters, setLocalLaunchParameters] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [startDiagnostics, setStartDiagnostics] = useState(false);

  const handleParameterChange = (parameter) => {
    setSelectedParameters(prevSelected => {
      if (prevSelected.includes(parameter)) {
        return prevSelected.filter(item => item !== parameter);
      } else {
        return [...prevSelected, parameter];
      }
    });
  };

  const handleCardChange = (card) => {
    setSelectedCards(prevSelected => {
      if (prevSelected.includes(card)) {
        return prevSelected.filter(item => item !== card);
      } else {
        return [...prevSelected, card];
      }
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newLaunchParameters = {
      Device: ["IoT Temperature"], 
      Parameters: selectedParameters,
      Cards: selectedCards,
      Optimisation: ["k-means", "dbscan"], 
      AnomalyDetection: selectedCards 
    };
    setLocalLaunchParameters(newLaunchParameters);
    setLaunchParameters(newLaunchParameters);
    setStartDiagnostics(true);
    localStorage.setItem('launchParameters', JSON.stringify(newLaunchParameters));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (startDiagnostics && launchParameters?.AnomalyDetection) {
          const promises = launchParameters.AnomalyDetection.map(method => {
            let endpoint = '';
            switch (method) {
              case 'LSTM':
                endpoint = 'http://127.0.0.1:5000/predict';
                break;
              case 'SVM':
                endpoint = 'http://127.0.0.1:5000/predict_svm';
                break;
              case 'Isolation Forest':
                endpoint = 'http://127.0.0.1:5000/predict_isolation_forest';
                break;
              default:
                return null;
            }
            return axios.get(endpoint).then(response => ({ method, data: response.data }));
          });

          const results = await Promise.all(promises);
          setAnalysis(results.reduce((acc, { method, data }) => {
            acc[method] = data;
            return acc;
          }, {}));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [startDiagnostics, launchParameters]);

  return (
    <div className='diagnostics-page' style={{ marginTop: '30px' }}>
      <h3>Parameters selection from IoT device:</h3>
      <ParametersTableComponent onParameterChange={handleParameterChange} />
      <ApplyButton onClick={handleFormSubmit} />
      <h3>Anomaly detection algorithm selection:</h3>
      <div style={{ display: 'flex', marginTop: '30px', justifyContent: 'space-between' }}>
        <CardComponent
          title="LSTM"
          cardText="Long short-term memory networks that use (ANN) artificial neural networks in the field of artificial intelligence (AI) and deep learning. In contrast to normal feed-forward neural networks, also known as recurrent neural networks, these networks feature feedback connections."
          onCardChange={handleCardChange}
        />
        <CardComponent
          title="SVM"
          cardText="A regular support vector machine algorithm tries to find a hyperplane that best separates the two classes of data points. In an SVM that has one class of data points, the task is to predict a hypersphere that separates the cluster of data points from the anomalies."
          onCardChange={handleCardChange}
        />
        <CardComponent
          title="Isolation Forest"
          cardText="Isolation forest is an unsupervised anomaly detection algorithm that uses a random forest algorithm, or decision trees, under the hood to detect outliers in the data set. The algorithm tries to split or divide the data points such that each observation gets isolated from the others."
          onCardChange={handleCardChange}
        />
      </div>
      <ApplyButton onClick={handleFormSubmit} />

      {startDiagnostics && (
        <div className="container">
          {analysis ? (
            Object.entries(analysis).map(([method, data]) => (
              <div key={method} className="analysis-results">
                <h2>{method} Analysis Results</h2>
                <h3>Confusion Matrix</h3>
                <table className="confusion-matrix">
                  <tbody>
                    {data.matrix.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3>AUC</h3>
                <p>{data.auc}</p>
                <h3>Classification Report</h3>
                <pre>{JSON.stringify(data.report, null, 2)}</pre>
              </div>
            ))
          ) : (
            <p>Loading analysis...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DiagnosticsPage;
