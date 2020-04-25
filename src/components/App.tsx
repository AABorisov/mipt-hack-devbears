import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../layouts/Layout';
import DashboardPage from '../pages/DashboardPage';
import EditPage from '../pages/EditPage';

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/edit" component={EditPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
