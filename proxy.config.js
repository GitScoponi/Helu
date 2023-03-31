const proxy = [
    {
      context: ['/api'],
      target: 'http://localhost:61300/',
      secure:false,
      logLevel:'debug',
      changeOringen: false
      
    }
  ];
  module.exports = proxy;