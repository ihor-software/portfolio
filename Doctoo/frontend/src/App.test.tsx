import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

//at least 1 test is required to running
test('k', () => {
  const sum = (a: number, b: number) => a + b;
  expect(sum(2, 2)).toBe(4);
});
