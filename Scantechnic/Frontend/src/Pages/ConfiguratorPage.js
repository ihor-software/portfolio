import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import Dropdown from 'react-bootstrap/Dropdown';

import leonardo from '../files/images/leonardo.jpg';
import uno from '../files/images/uno.png';
import dht11 from '../files/images/dht11.png';
import dht22 from '../files/images/dht22.png';
import dht21 from '../files/images/dht21.png';

function ConfiguratorPage() {
  const [deviceInfo, setDeviceInfo] = useState({ board: '', sensor: '' });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/recognise_device');
        setDeviceInfo(response.data);
      } catch (error) {
        console.error('Error fetching device information:', error);
      }
    };
    fetchDeviceInfo();
  }, []);

  const handleDeviceChange = (selectedDevice) => {
    setDeviceInfo(prevState => ({
      ...prevState,
      board: selectedDevice,
    }));
  };

  const handleSensorChange = (selectedSensor) => {
    setDeviceInfo(prevState => ({
      ...prevState,
      sensor: selectedSensor,
    }));
  };

  const imageMapping = {
    'Arduino Leonardo': leonardo,
    'Arduino Uno': uno,
    'DHT11': dht11,
    'DHT22': dht22,
    'DHT21': dht21,
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <Dropdown style={{paddingRight: '10px'}}>
        <Dropdown.Toggle variant="primary" id="dropdown-board">
          Select Board
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleDeviceChange('Arduino Leonardo')}>
            Arduino Leonardo
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleDeviceChange('Arduino Uno')}>
            Arduino Uno
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-sensor">
          Select Sensor
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSensorChange('DHT11')}>
            DHT11
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSensorChange('DHT22')}>
            DHT22
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSensorChange('DHT21')}>
            DHT21
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Draggable>
        <div className="device board">
          <img src={imageMapping[deviceInfo.board]} alt={deviceInfo.board} />
          <p>{deviceInfo.board}</p>
        </div>
      </Draggable>

      <Draggable>
        <div className="device sensor">
          <img src={imageMapping[deviceInfo.sensor]} alt={deviceInfo.sensor} />
          <p>{deviceInfo.sensor}</p>
        </div>
      </Draggable>
    </div>
  );
}

export default ConfiguratorPage;
