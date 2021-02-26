import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Home from './home/Home';
import Collection from './collection/Collection';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { HEADER_HEIGHT } from '../config/constants';

const useStyles = makeStyles(() => ({
  main: {
    paddingTop: HEADER_HEIGHT,
    fontSize: '12w',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <main className={classes.main}>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/collections/:id">
                <Collection />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
