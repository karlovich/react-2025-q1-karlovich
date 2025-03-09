import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { add, reset } from '../../features/cardStoreSlice';
import { ToastMessage } from './ToastMessage';
import { mockedCharacterId1 } from '../../mocks/data';

describe('ToastMessage Component', () => {
  beforeEach(() => {
    store.dispatch(reset());
  });

  it('appears correctly when count > 0', async () => {
    render(
      <Provider store={store}>
        <ToastMessage />
      </Provider>
    );

    await act(async () => {
      store.dispatch(add(mockedCharacterId1));
    });

    const toastMessage = screen.getByTestId('toast-message-container');
    expect(toastMessage).toHaveClass('block');
    expect(screen.getByText('Count Of Selected Items: 1')).toBeInTheDocument();
  });

  it('does not appear when count = 0', () => {
    render(
      <Provider store={store}>
        <ToastMessage />
      </Provider>
    );

    const toastMessage = screen.getByTestId('toast-message-container');
    expect(toastMessage).toHaveClass('hidden');
    expect(screen.getByText('Count Of Selected Items: 0')).toBeInTheDocument();
  });

  it('calls reset action when "Unselect All" button is clicked', async () => {
    render(
      <Provider store={store}>
        <ToastMessage />
      </Provider>
    );

    await act(async () => {
      store.dispatch(add(mockedCharacterId1));
    });

    const unselectBtn = screen.getByText('Unselect All');
    fireEvent.click(unselectBtn);

    expect(store.getState().cardStore.characters.length).toBe(0);
  });
});
