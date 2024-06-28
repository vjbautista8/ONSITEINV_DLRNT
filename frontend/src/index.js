import { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

// ----------------------------------------------------------------------

window.ZOHO.CREATOR.init().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const loginUserState = window.ZOHO.CREATOR.UTIL.getInitParams();
  root.render(
    <Provider store={store}>
      <>
        <BrowserRouter>
          <Suspense>
            {/* <App tab="home" /> */}
            <App />
          </Suspense>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      </>
    </Provider>
  );
});

// window.ZOHO.CREATOR.init().then(function () {
//   let loginUserInfo = window.ZOHO.CREATOR.UTIL.getInitParams();
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <Provider store={store}>
//       <App2 tab="home" loginUserInfo={loginUserInfo} />
//     </Provider>
//   );
// });
