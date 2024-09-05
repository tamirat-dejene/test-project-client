// import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './app/store';
import App from './components/App'
import NotFound from './404';
import Musics from './components/_Musics';
import Albums from './components/_Albums';
import Artists from './components/_Artists';
import MusicForm from './components/MusicForm';

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
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  /* </StrictMode>, */
)