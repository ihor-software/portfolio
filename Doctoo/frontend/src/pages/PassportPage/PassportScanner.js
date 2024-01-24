import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Button } from 'src/ui/common';

function PassportScanner() {
  const [passportCode, setPassportCode] = useState(null);
  const [passportName, setPassportName] = useState(null);
  const [passportSurname, setPassportSurname] = useState(null);
  const [passportReg, setPassportReg] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const fileInputRef = useRef(null);

  const resetState = () => {
    setValidationMessage('');
    setPassportCode(null);
    setPassportName(null);
    setPassportSurname(null);
    setPassportReg(null);
    setSelectedFile(null);
    setShowCard(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRetry = () => {
    resetState();
  };

  const handleApply = () => {
    setShowCard(false);
  };

  const onFileInputChange = async event => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setValidationMessage('File size exceeds 50MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setValidationMessage('File must be an image.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const imageDataURL = reader.result;
        setValidationMessage('');
        setSelectedFile(file.name);

        try {
          const {
            data: { text },
          } = await Tesseract.recognize(imageDataURL, 'eng');

          const lines = text
            .trim()
            .split('\n')
            .filter(line => line !== '');
          if (lines.length >= 2) {
            const linePassportCodeReg = lines[2].split(' ');
            const passportCode = linePassportCodeReg[linePassportCodeReg.length - 1];
            const passportReg = linePassportCodeReg[linePassportCodeReg.length - 2];
            const linePassportSurname = lines[4].split('/');
            const passportSurname = linePassportSurname[linePassportSurname.length - 1];
            const linePassportName = lines[6].split('/');
            const passportName = linePassportName[linePassportName.length - 1];
            setPassportName(passportName);
            setPassportSurname(passportSurname);
            setPassportCode(passportCode);
            setPassportReg(passportReg);
            setShowCard(true);
          } else {
            resetState();
          }
        } catch (error) {
          console.error('Error parsing text:', error);
          resetState();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='mt-4 mb-4'>
      <div>
        <input
          type='file'
          accept='image/*'
          onChange={onFileInputChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <Button variant='secondary' onClick={handleChooseFile} additionalStyle='w-full'>
          <div className='flex items-center justify-center gap-2'>
            <span className='font-sans '>Add Passport</span>
          </div>
        </Button>
        {selectedFile && <p>Selected File: {selectedFile}</p>}
      </div>

      {validationMessage && <p className='text-red'>{validationMessage}</p>}

      {showCard && passportCode ? (
        <div className='p-4 border rounded-md bg-gray-100 mt-4'>
          <h2 className='text-lg font-semibold mb-4'>Personal Info</h2>
          <div className='flex flex-row'>
            <h3 className='mr-2'>Name:</h3>
            <pre>
              {' '}
              {passportName} {passportSurname}
            </pre>
          </div>
          <div className='flex flex-row'>
            <h3 className='mr-2'>Passport Region:</h3>
            <pre>{passportReg}</pre>
          </div>
          <div className='flex flex-row'>
            <h3 className='mr-2'>Passport Code:</h3>
            <pre>{passportCode}</pre>
          </div>
          <div className='mt-4 flex justify-between'>
            <button onClick={handleRetry}>Retry</button>
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PassportScanner;
