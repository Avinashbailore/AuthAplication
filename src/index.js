import React from 'react';
import ReactDOM from 'react-dom';
import AuthApplication from './Apps/AuthApplication/index';
import { Container } from 'react-bootstrap'

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <AuthApplication />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
