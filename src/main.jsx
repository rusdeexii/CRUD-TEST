import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Edit from './components/Edit.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Edit/:id",
    element: <Edit />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <ConfigProvider 
   theme={{
    token: {
      colorPrimary : "#69B61B",
    },
   }}>
    <RouterProvider router={router} />
   </ConfigProvider>
)
