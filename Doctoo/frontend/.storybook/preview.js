import '../src/index.css';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { BrowserRouter } from 'react-router-dom';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [(Story) => <Provider store={store}><BrowserRouter><Story /></BrowserRouter></Provider>]
