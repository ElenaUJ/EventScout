import React from 'react';
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div class="WelcomeScreen">
      <h1>Welcome to the EventScout App</h1>
      <h4>
        Log in to see upcoming events around the world for full-stack developers
      </h4>
      <div class="button_cont" align="center">
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img
              class="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
          <button
            onClick={() => {
              props.getAccessToken();
            }}
            rel="nofollow noopener"
            class="btn-text"
          >
            <b>Sign in with Google</b>
          </button>
        </div>
      </div>
      <a
        href="https://elenauj.github.io/eventscout/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
}

export { WelcomeScreen };
