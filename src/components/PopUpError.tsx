/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import styled from '@emotion/styled';
import { space, color, layout, typography, border } from 'styled-system';
import {
  resetCreateMusicState,
  resetDeleteMusicState,
  resetFetchDataState,
  resetUpdateMusicState
} from '../features/music-data-slice';

interface ErrorPopupProps {
  duration: number;
}

const ErrorPopup = ({ duration }: ErrorPopupProps) => {
  const { createError, deleteError, updateError, loadError } = useAppSelector(state => state.musicData);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (createError || deleteError || updateError || loadError) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);

        if (createError) dispatch(resetCreateMusicState());
        if (deleteError) dispatch(resetDeleteMusicState());
        if (updateError) dispatch(resetUpdateMusicState());
        if (loadError) dispatch(resetFetchDataState());

      }, duration);

      return () => clearTimeout(timer);
    }
  }, [createError, deleteError, updateError, loadError, dispatch, duration]);

  if (!visible) return null;

  return (
    <Popup visible={visible}>
      <p>{createError || deleteError || updateError || loadError}</p>
    </Popup>
  );
};

const Popup = styled.div<{ visible: boolean }>`
  ${space}
  ${layout}
  ${color}
  ${typography}
  ${border}

  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 16px;
  background-color: ${({ visible }) => (visible ? '#ff4d4d' : 'transparent')};
  color: white;
  border-radius: 8px;
  box-shadow: ${({ visible }) => (visible ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.3s ease, transform 0.3s ease;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

export default ErrorPopup;
