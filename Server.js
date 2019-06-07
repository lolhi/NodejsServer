var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');

var server = app.listen(3000, function(){
  console.log("Express server has started on port 3000");
})

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var url = 'http://apis.data.go.kr/1741000/EarthquakeIndoors/getEarthquakeIndoorsList';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=CFChzWsCjrGxW16mSq%2F9diy47VtyHqy8LDip17p%2BYdwmse88ft%2BePRJrfIyJHKIhWlqLJIMcQOtiI6hM7NQ1lQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지번호 */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /* 호출문서 형식 */
queryParams += '&' + encodeURIComponent('flag') + '=' + encodeURIComponent('Y'); /* 신규API */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
    res.status(200).json(body);
});

var router = require('./router/router')(app, fs);
