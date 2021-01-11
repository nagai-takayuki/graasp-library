import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './home/Home';
import Collection from './collection/Collection';
import Header from './layout/Header';
import Footer from './layout/Footer';

const useStyles = makeStyles(() => ({
  main: {},
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Switch>
          <Route path="/collections/:id">
            <Collection />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
