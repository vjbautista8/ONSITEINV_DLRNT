import { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
