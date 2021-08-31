import { FC, ReactElement } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundPage from '../components/pages/notFoundPage';
import App from '../app';
import Home from '../components/pages/home';
import searchReducer from '../reducers/searchSlice';
import APIItemsReducer from '../reducers/APIItemsSlice';
import APIItemReducer from '../reducers/APIItemSlice';
import * as mockRequest from '../../public/request.json';
import ItemDiscription from '../components/pages/itemDiscription';

function render(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { search: searchReducer, APIItems: APIItemsReducer, APIItem: APIItemReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  const Wrapper: FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

jest.mock('axios');

test('render App', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const linkElement = screen.getByText(/HOME/i);
  expect(linkElement).toBeInTheDocument();
});

test('set search params', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const popularityRadio = screen.getByDisplayValue('popularity');
  expect(popularityRadio).toBeInTheDocument();
  userEvent.click(popularityRadio);
  expect(popularityRadio).toBeChecked();
  const publishedRadio = screen.getByDisplayValue('publishedAt');
  expect(publishedRadio).toBeInTheDocument();
  userEvent.click(publishedRadio);
  expect(publishedRadio).toBeChecked();
  const textInput = screen.getByRole('textbox');
  userEvent.type(textInput, 'apple');
  expect(textInput).toHaveValue('apple');
});

test('get search response', async () => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(() => Promise.resolve({ data: mockRequest }));
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const popularityRadio = screen.getByDisplayValue('popularity');
  userEvent.click(popularityRadio);
  const textInput = screen.getByRole('textbox');
  userEvent.type(textInput, 'apple');
  const buttonInput = screen.getByTestId('search-btn');
  userEvent.click(buttonInput);
  const images = await screen.findAllByAltText('image');
  expect(images).toHaveLength(15);
});

test('get search reject', async () => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(() => Promise.reject(new Error('error')));
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const popularityRadio = screen.getByDisplayValue('popularity');
  userEvent.click(popularityRadio);
  const textInput = screen.getByRole('textbox');
  userEvent.type(textInput, 'apple');
  const buttonInput = screen.getByTestId('search-btn');
  userEvent.click(buttonInput);
  const spinner = await screen.findByTestId('ripple');
  expect(spinner).toBeInTheDocument();
});

test('render notFoundPage', () => {
  render(<NotFoundPage />);
  const linkElement = screen.getByTestId('notFound');
  expect(linkElement).toBeInTheDocument();
});

test('render Home Page', () => {
  render(<Home />);
  const linkElement = screen.getByTestId('table');
  expect(linkElement).toBeInTheDocument();
});

test('render Details routes', () => {
  const history = createMemoryHistory();
  history.push('/details');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const linkElement = screen.getByTestId('notFound');
  expect(linkElement).toBeInTheDocument();
  history.push('/details/');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(linkElement).toBeInTheDocument();
  history.push('/details/hhhfgrty');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(linkElement).toBeInTheDocument();
});

test('full app rendering/navigating NotFoundFage', () => {
  const history = createMemoryHistory();
  history.push('/sssss/ssss');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const linkElement = screen.getByTestId('notFound');
  expect(linkElement).toBeInTheDocument();
});

test('full app rendering/navigating About', () => {
  const history = createMemoryHistory();
  history.push('/about');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const linkElement = screen.getByTestId('custom');
  expect(linkElement).toBeInTheDocument();
});

test('get itemDiscription Page', async () => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(() => Promise.resolve({ data: mockRequest }));
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const textInput = screen.getByRole('textbox');
  userEvent.type(textInput, 'apple');
  const buttonInput = screen.getByTestId('search-btn');
  userEvent.click(buttonInput);
  const images = await screen.findAllByAltText('image');
  expect(images).toHaveLength(15);
  const link = await screen.findAllByRole('link');
  userEvent.click(link[5]);
  const paragraphs = await screen.findAllByRole('paragraph');
  expect(paragraphs).toHaveLength(6);
});

test('get itemDiscription Page not found item', async () => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(() => Promise.resolve({ data: mockRequest }));
  const history = createMemoryHistory();
  history.push('/details/aaasd456');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const linkElement = await screen.findByTestId('notFound');
  expect(linkElement).toBeInTheDocument();
});

test('get itemDiscription Page rejected', async () => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(() => Promise.reject(new Error('error')));
  const history = createMemoryHistory();
  history.push('/details/aaasd456');
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const spinner = await screen.findByTestId('ripple');
  expect(spinner).toBeInTheDocument();
});

test('change search state', async () => {
  window.scrollTo = jest.fn()
  axios.get.mockImplementation(() => Promise.resolve({ data: mockRequest }));
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const relevancyRadio = screen.getByDisplayValue('relevancy');
  userEvent.click(relevancyRadio);
  const textInput = screen.getByRole('textbox');
  userEvent.type(textInput, 'apple');
  const buttonInput = screen.getByTestId('search-btn');
  userEvent.click(buttonInput);
  const images = await screen.findAllByAltText('image');
  expect(images).toHaveLength(15);
  const pageSelector = await screen.findByTestId('page-selector');
  userEvent.selectOptions(pageSelector, ['2']);
  expect(pageSelector).toHaveValue('2');
  const updateImages = await screen.findAllByAltText('image');
  expect(updateImages).toHaveLength(15);
  userEvent.selectOptions(pageSelector, ['1']);
  expect(pageSelector).toHaveValue('1');
  const pageLimitSelector = screen.getByTestId('pageLimit-selector');
  userEvent.selectOptions(pageLimitSelector, ['20']);
  expect(pageLimitSelector).toHaveValue('20');
  const updateAgainImages = await screen.findAllByAltText('image');
  expect(updateAgainImages).toHaveLength(15);
});
