import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App'
import EditMusic from './components/EditMusic';
import Music from './components/Music';
import Songs from './components/Songs';
import Albums from './components/Albums';
import Artists from './components/Artists';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops! Something went wrong. Try again later.</div>,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        index: true,
        path: '/',
        element: <Songs />,
      },
      {
        path: '/songs',
        element: <Songs />,
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
        path: 'musics/:musicId',
        element: <Music />,
        // loader: contactLoader,
        // action: contactAction
      }, {
        path: "musics/:musicId/edit",
        element: <EditMusic />,
        // loader: contactLoader,
        // action: editAction
      }, {
        path: "musics/:musicId/destroy",
        // action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      }
    ]
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)