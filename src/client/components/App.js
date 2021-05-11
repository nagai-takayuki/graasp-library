import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Home from './home/Home';
import Collection from './collection/Collection';
import Error from './common/Error';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { HEADER_HEIGHT } from '../config/constants';
import { ERROR_PAGE_NOT_FOUND_CODE } from '../config/messages';
import { LoginModalProvider } from './common/LoginModalContext';

const useStyles = makeStyles(() => ({
  main: {
    paddingTop: HEADER_HEIGHT,
    fontSize: '12w',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
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
    <LoginModalProvider>
      <Header />
      <div className={classes.wrapper}>
        <main className={classes.main}>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/collections/:id">
                <Collection />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route>
                <Error code={ERROR_PAGE_NOT_FOUND_CODE} />
              </Route>
            </Switch>
          </Container>
        </main>
        <Footer />
      </div>
    </LoginModalProvider>
  );
}

export default App;
