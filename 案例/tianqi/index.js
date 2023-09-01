const axios = require('axios');

const config = {
   method: 'get',
   url: 'http://hmajax.itheima.net/api/weather/city?city=北',
   headers: { 
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
   }
};

axios(config)
.then(function (response) {
   console.log(JSON.stringify(response.data));
})
.catch(function (error) {
   console.log(error);
});