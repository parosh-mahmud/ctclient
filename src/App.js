import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Eagerly loaded components
import Homepage from './pages/Homepage';
import AuthPage from './components/auth/AuthPage';
import FlightResult from './components/FlightResults/FlightResults'; // Fixed the path
import ResetPassword from './components/auth/ResetPassword';
import AirPreBookForm from './components/FlightBooking/AirPreBookForm';
import AirBookForm from './components/FlightBooking/AirBookForm';
import ProfilePage from './components/profile/ProfilePage';
import SignUp from './components/auth/SignUp';

// Lazy-loaded components
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));

function App() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/signin" component={AuthPage} />
            <Route path="/flight-results" component={FlightResult} />
            <Route path="/forgot-password" component={ResetPassword} />
            <Route path="/airprebookform" component={AirPreBookForm} />
            <Route path="/airbook" component={AirBookForm} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/signup" component={SignUp} />

            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/refund-policy" component={RefundPolicy} />
            <Route path="/terms-conditions" component={TermsConditions} />
            {/* Add more lazy-loaded routes here as needed */}
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
