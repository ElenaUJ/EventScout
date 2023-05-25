import React from 'react';
import './App.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className="WelcomeScreen">
      <h1>Welcome to the EventScout App</h1>
      <h4>
        Log in to see upcoming events around the world for full-stack
        developers.
      </h4>
      <p>
        With this app, you can easily find and filter events based on cities,
        explore event details, specify the number of displayed events, and even
        use the app offline. Additionally, it provides data visualization
        through charts, allowing you to compare the number of upcoming events in
        different cities at a glance.
      </p>
      <div className="button_cont" align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
          <button
            onClick={() => {
              props.getAccessToken();
            }}
            rel="nofollow noopener"
            className="btn-text"
          >
            <b>Sign in with Google</b>
          </button>
        </div>
      </div>
      <a
        href="https://elenauj.github.io/EventScout/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
}

export { WelcomeScreen };
