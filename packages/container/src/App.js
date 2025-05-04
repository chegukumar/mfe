import React, { lazy, Suspense, useState, useEffect } from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';
// import MarketingApp from '../components/MarketingApp';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from '../components/Header';
import { createBrowserHistory } from 'history';
// import Auth from '../components/Auth'
import Progress from '../components/Progress';
const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})


const MarketingLazy = lazy(() => import('../components/MarketingApp'));
const AuthLazy = lazy(() => import('../components/Auth'))
const DahboardLazy = lazy(() => import('../components/Dashboard'))

const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth'>
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {
                  !isSignedIn && <Redirect to='/' />
                }
                <DahboardLazy />
              </Route>
              <Route path='/' component={MarketingLazy} />

            </Switch>
          </Suspense>
        </div>;
      </StylesProvider>
    </Router>
  );
};
