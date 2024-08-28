import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App'
import Musics from './components/Musics';
import Albums from './components/Albums';
import Artists from './components/Artists';
import { Provider } from 'react-redux';
import store from './app/store';
import MusicForm from './components/MusicForm';
import NotFound from './components/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Musics />,
      },
      {
        path: '/musics',
        element: <Musics />,
      },
      {
        path: '/albums',
        element: <Albums />,
      },
      {
        path: '/artists',
        element: <Artists />,
      },
      {
        path: "musics/new/",
        element: <MusicForm mode='create' />,
      },
      {
        path: "musics/:musicId/edit",
        element: <MusicForm mode='edit' />,
      }
    ]
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)