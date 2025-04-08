import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ErrorAlert({ message }) {
  useEffect(() => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      
    });
  }, [message]);

  return <ToastContainer />;
}

export default ErrorAlert;
