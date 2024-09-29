var proxy = require('redbird')({ port: 8080 });

proxy.register('optimalbits.com', 'http://167.23.42.67:8000');
