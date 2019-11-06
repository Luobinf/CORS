var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8008 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method


  console.log('有人发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/index.html'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    let string = fs.readFileSync('./public/index.html','utf-8')
    response.write(string)
    response.end()
  } else if(path === '/qq.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    let string = fs.readFileSync('./public/qq.js','utf-8')
    response.write(string)
    response.end()
  } else if (path === '/friends.json') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    // 下面这句话的意思是允许http://jack.com:8001这个源来访问
    response.setHeader('Access-Control-Allow-Origin','http://jack.com:8002')
    
    // console.log(request.headers['referer'])
    let string = fs.readFileSync('./public/friends.json','utf-8')
    response.write(string)
    response.end()
  } else if (path === '/friends.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')

    // console.log(query.callback)
    //  jsonp引入动态的script标签之后，这样所有的网站都可以访问了，但是我们可以做一个referer检查，
    //来检查访问的那个源是不是http://jack.com:8001,即使做了referer检查也还是会有安全问题，还可以做
    //一些更加严格的限制。
    if (request.headers['referer'].indexOf("http://jack.com:8002") !== -1) {
        let string = fs.readFileSync('./public/friends.js','utf-8').toString()
        const data = fs.readFileSync('./public/friends.json','utf-8').toString()
        const newString = string.replace('{{data}}',data).replace('{{xxx}}',query.callback)
        response.write(newString)
        response.end()
    } else {
        response.write(`不允许访问`)
        response.end()
    }
    
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

})

server.listen(port)
console.log('监听 ' + port + ' 成功\n打开 http://localhost:' + port)