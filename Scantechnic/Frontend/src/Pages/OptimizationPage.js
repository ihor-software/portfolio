import React, { useState } from 'react';
import CardComponent from '../Components/CardComponent';
import { Button, Alert } from 'react-bootstrap'; 

const OptimizationPage = () => {
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [error, setError] = useState(null);

  const methods = [
    { title: 'Imputation', description: 'Fill in missing values with statistical methods or estimations.' },
    { title: 'Noise Reduction', description: 'Reduce noise in the dataset to improve model performance.' },
    { title: 'Feature Selection', description: 'Select the most relevant features for model training.' },
    { title: 'Normalization', description: 'Scale the data to a standard range.' },
    { title: 'Outlier Removal', description: 'Remove outliers that can skew model training.' },
    { title: 'Synthetic Data Generation', description: 'Generate synthetic data to augment the dataset.' },
    { title: 'Data Augmentation', description: 'Increase the diversity of the dataset by adding new data points.' },
    { title: 'Polynomial Features', description: 'Create polynomial features to capture non-linear relationships.' },
    { title: 'Interaction Features', description: 'Create interaction features to capture relationships between variables.' },
    { title: 'Hyperparameter Tuning', description: 'Optimize hyperparameters for the best model performance.' },
    { title: 'Ensemble Methods', description: 'Combine multiple models to improve performance.' },
    { title: 'Threshold Optimization', description: 'Optimize decision thresholds for classification models.' },
    { title: 'Calibration', description: 'Adjust the output probabilities to reflect the true likelihood of an event.' }
  ];

  const handleCardChange = (method) => {
    setSelectedMethods((prevSelected) => {
      if (prevSelected.includes(method)) {
        return prevSelected.filter((item) => item !== method);
      } else {
        return [...prevSelected, method];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ methods: selectedMethods }),
      });

      if (!response.ok) {
        throw new Error('Failed to apply optimizations');
      }

      const data = await response.json();
      console.log('Optimization results:', data);
      setOptimizationResults(data); 
      setError(null); 
    } catch (error) {
      console.error('Error applying optimizations:', error);
      setError('Failed to apply optimizations'); 
      setOptimizationResults(null); 
    }
  };

  return (
    <div className="optimization-page" style={{ marginTop: '30px', overflowY: 'scroll' }}>
      <h3>Select Optimization Methods</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {methods.map((method, index) => (
          <CardComponent 
            key={index}
            title={method.title}
            description={method.description}
            onCardChange={() => handleCardChange(method.title)}
          />
        ))}
      </div>
      <Button variant="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Apply Optimizations
      </Button>

      {error && <Alert variant="danger" style={{ marginTop: '10px' }}>{error}</Alert>}

      {optimizationResults && (
        <div style={{ marginTop: '20px' }}>
          <h4>Optimization Results</h4>
          <pre>{JSON.stringify(optimizationResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OptimizationPage;
