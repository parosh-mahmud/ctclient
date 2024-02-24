// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { AuthProvider } from './components/auth/AuthContext';

// // Create a theme object
// const theme = createTheme();

// // Use ReactDOM.render instead of createRoot
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {/* Wrap your App component inside ThemeProvider and pass the theme object */}
//       <ThemeProvider theme={theme}>
//         <Router>
//           <Provider store={store}>
//             <AuthProvider>
//             <App />
//             </AuthProvider>
//           </Provider>
//         </Router>
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Only need to import this once
import { Provider } from 'react-redux';
import store, { persistor } from './/..//src/redux/store'; // Make sure you're exporting both store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './components/auth/AuthContext';

// Create a theme object
const theme = createTheme();

// Use ReactDOM.render to render your app component
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Use PersistGate here */}
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
