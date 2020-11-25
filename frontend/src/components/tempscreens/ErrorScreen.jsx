// React Libraries
import React from 'react';
import { useHistory } from 'react-router-dom';
// Components
import { Button, Dimmer } from 'semantic-ui-react';

function ErrorScreen() {
  const history = useHistory();

  // This function will send the user home and refresh ALL the components.
  function refreshPage() {
    history.push('/');
    window.location.reload();
  }
  return (
    <>
      <Dimmer active>
        <h1>Something went wrong...</h1>
        <Button onClick={refreshPage} icon="home" content="Go Home" color="red" />
      </Dimmer>
    </>
  );
}
export default ErrorScreen;
