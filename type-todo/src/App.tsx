import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

// import PrivateRoute from './routes/private-route';
// import PublicRoute from './routes/public-route';
import Main from './views/main';
import Login from './views/login';
import RegisterPage from './views/register';
import Dashboard from './views/dashboard';
import RetrospectBoard from './views/retrospectBoard';
import LoadingIndicator from './components/LoadingIndicator';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
  const isLoading = false;

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Main} />
        {/* <Route exact path="/auth" component={RegisterPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/retrospect" component={RetrospectBoard} /> */}
        <Route component={() => <h1>Error!!</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
