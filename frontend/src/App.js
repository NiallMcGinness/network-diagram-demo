import React, { useContext, useReducer } from 'react';
import { Router } from '@reach/router';
import UploadForm from './components/upload/UploadForm';
import LandingPage from './components/landing/LandingPage';
import DetailsPage from './components/landing/DetailsPage';
import DetailsContext from './contexts/DetailsContext';
import DetailsReducer from './reducers/DetailsReducer';

function App() {
  const initialState = useContext(DetailsContext)
  const [state, dispatch] = useReducer(DetailsReducer, initialState)
  return (
    <div className="App">
      <DetailsContext.Provider value={{ state, dispatch }}>
        <Router>
             
          <LandingPage path="/" />
          <UploadForm path='/uploadform' />
          <DetailsPage path='/details' />
        </Router>
      </DetailsContext.Provider >

    </div>
  );
}

export default App;

