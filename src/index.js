import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.scss";

const providerConfig = {
  domain: "dev-ml5ebkupupepircv.us.auth0.com",
  clientId: "iClcdiuo0RvKFAJ4COrum1zp7LXErhNw",
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  cacheLocation: "localstorage",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Auth0Provider {...providerConfig}>
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
