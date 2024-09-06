import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Page/login.jsx';
import RegisterPage from './Page/register.jsx';
import UserPage from './Page/user.jsx';
import Todoapp from './components/ToDolist/Todoapp.jsx';
import ErrorPage from './Page/error.jsx';
import BookPage from './Page/book.jsx';
import { AuthSwapper } from './components/context/auth.context.jsx';
import Privateround from './Page/Private.round.jsx';
import 'nprogress/nprogress.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Todoapp />
      },
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/book",
        element: <Privateround>  <BookPage /></Privateround>


      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },

  {
    path: "/register",
    element: <RegisterPage />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthSwapper>
      <RouterProvider router={router} />
    </AuthSwapper >
  </React.StrictMode>,
)
