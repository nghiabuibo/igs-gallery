import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

import Home from './pages/Home';
import Upload from './pages/Upload';
import Vote from './pages/Vote';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import VoteNotification from './sections/VoteNotification';
import Loading from './utils/Loading';

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { GoogleOAuthProvider } from "@react-oauth/google"

import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/upload',
    element: <Upload />
  },
  {
    path: '/upload/:code',
    element: <Upload />
  },
  {
    path: '/vote',
    element: <Vote />
  },
  {
    path: '/finalround',
    element: <Vote isFinal={true} />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GG_CLIENT_ID}>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
      <VoteNotification />
      <Loading />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
