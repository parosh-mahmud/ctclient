import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Only need to import this once
import { Provider } from "react-redux";
import store, { persistor } from ".//..//src/redux/store"; // Make sure you're exporting both store and persistor
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./components/auth/AuthContext";

// Your theme customization
const theme = createTheme({
  typography: {
    fontFamily: "Google Sans, sans-serif",
  },
  palette: {
    primary: {
      main: "#0067FF",
      bg: "rgba(255,255,255,0.5)",
      contrastText: "#ffffff", // Optional: if you want a specific text color for contrast
    },
  }, // Added missing comma here
});
// Use ReactDOM.render to render your app component
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Use PersistGate here */}
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
  document.getElementById("root")
);
