var config = {
  'localhost': {
    apiUrl: 'http://localhost:8080'
  },

  'piq-chad.local': {
    apiUrl: 'http://localhost:8080'
  },

  'health-trackr.surge.sh': {
    apiUrl: 'https://health-trackr.herokuapp.com'
  },

  'prod': {
    apiUrl: 'https://health-trackr.herokuapp.com'
  }

};


export default config[window.location.hostname] || config['prod']
