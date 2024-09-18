import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setDeleteError, setMusicDataError } from '../features/music-data-slice';
import { setUserDataError } from '../features/user-data-slice';
import { EmptyResponseContainer, Popup } from '../styles/popup';

interface ErrorPopupProps {
  duration: number;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

const ErrorPopup = ({ duration, position = 'bottom-right' }: ErrorPopupProps) => {
  const { musicDataError, deleteError } = useAppSelector(state => state.musicData);
  const { userDataError } = useAppSelector(state => state.userData);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (musicDataError || userDataError || deleteError) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        if (musicDataError) dispatch(setMusicDataError(null));
        if (userDataError) dispatch(setUserDataError(null));
        if (deleteError) dispatch(setDeleteError(null));
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [dispatch, duration, userDataError, musicDataError, deleteError]);

  if (!visible) return null;

  return (
    <Popup visible={visible} position={position}>
      <p>{musicDataError || userDataError || deleteError}</p>
    </Popup>
  );
};

const EmptyResponse = ({ message }: { message: string }) => {
  return (
    <EmptyResponseContainer
      p={3}
      bg="gray.100"
      color="gray.700"
      fontSize={2}
    >
      <p>{message}</p>
    </EmptyResponseContainer>
  );
};

export default ErrorPopup;
export { EmptyResponse }