import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

// setup a DOM element as a render target
// eslint-disable-next-line import/no-mutable-exports
let container = null;
beforeEach(() => {
   container = document.createElement('div');
   document.body.appendChild(container);
});

// cleanup on exiting
afterEach(() => {
   unmountComponentAtNode(container);
   container.remove();
   container = null;
});

export {
   render,
   screen,
   userEvent,
   fireEvent, // userEvent strongly preferred
   act,
   container,
};
