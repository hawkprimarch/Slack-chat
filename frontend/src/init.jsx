import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import resources from './locales/index.js';
import App from './components/App.jsx';
import store from './slices/index.js';
import ChatApiProvider from './contexts/ChatApiProvider.jsx';

const init = (socket) => {
  const defaultLanguage = 'ru';

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
      debug: true,
    });

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    environment: process.env.NODE_ENV,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RProvider config={rollbarConfig}>
          <ErrorBoundary>
            <ChatApiProvider socket={socket}>
              <App />
            </ChatApiProvider>
          </ErrorBoundary>
        </RProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
