import React, { useState, useEffect } from 'react';

const ParametersTableComponent = ({ onParameterChange }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/data')
      .then(response => response.json())
      .then(data => {
        setColumns(data.columns);
        setData(data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderTable = () => {
    if (columns.length === 0 || data.length === 0) {
      return <div>Loading...</div>;
    }

    const transposedData = columns.map((column, columnIndex) => ({
      column,
      values: data.map(row => row[column])
    }));

    return (
      <table style={{ width: '100%', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Parameter</th>
            {data.map((_, index) => (
              <th key={index} style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                Value {index + 1}
              </th>
            ))}
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Select</th>
          </tr>
        </thead>
        <tbody>
          {transposedData.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                {row.column}
              </td>
              {row.values.map((value, columnIndex) => (
                <td key={`cell-${rowIndex}-${columnIndex}`} style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                  {value}
                </td>
              ))}
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  onChange={() => onParameterChange(row.column)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {renderTable()}
    </div>
  );
};

export default ParametersTableComponent;
