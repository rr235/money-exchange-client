import React from 'react';
import { render } from 'react-dom';
import Main from '../src/components/templates/main';

const rootElement = document.querySelector('#root');

render(<Main />, rootElement);
