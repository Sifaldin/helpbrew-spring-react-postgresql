import React from 'react';



function Calendar() {
    var gapi = window.gapi
    var CLIENT_ID = "204518444291-bddqabgcutns2p6k670tbpfefm7v85ui.apps.googleusercontent.com"
    var API_KEY = ""
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly"
  
    const handleClick = () => {
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
  
        gapi.auth2.getAuthInstance().signIn()
          .then(() => {
            var event = {
              'summary': 'Awesome Event!',
              'location': '800 Howard St., San Francisco, CA 94103',
              'description': 'Really great refreshments',
              'start': {
                'dateTime': '2020-06-28T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
              },
              'end': {
                'dateTime': '2020-06-28T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
              },
              'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
              ],
              'attendees': [
                { 'email': 'lpage@example.com' },
                { 'email': 'sbrin@example.com' }
              ],
              'reminders': {
                'useDefault': false,
                'overrides': [
                  { 'method': 'email', 'minutes': 24 * 60 },
                  { 'method': 'popup', 'minutes': 10 }
                ]
              }
            }
  
            var request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event,
            })
  
            request.execute(event => {
              console.log(event)
              window.open(event.htmlLink)
            })
            // get events
            gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            }).then(response => {
              const events = response.result.items
              console.log('EVENTS: ', events)
            })
  
          
          })
      })
    }
  


  return (
    <div className="App">
     
    </div>
  );
}

export default App;