# 说明
  1.qq-com文件夹下面有一个server.js，用来模拟qq
  2.jack-com文件夹下面有一个server.js，用来模拟黑客网站

  ## qq-com文件夹
    /index.html是首页
    /qq.js是JS脚本文件
    /friends.json是模拟的好友列表数据
    端口监听为8008，并通过修改hosts文件将http://127.0.0.1:8008映射为http://qq.com:8008

  ## jack-com文件夹
    /index.html是首页
    /jack.js是JS脚本文件
    端口监听为8002，并通过修改hosts文件将http://127.0.0.1:8008映射为http://jack.com:8002


# 步骤
    1. 配置hosts文件，127.0.0.1 jack.com、127.0.0.1 qq.com
    2. 打开qq-com文件夹，在终端中使用 node server.js 8008命令
    3. 打开jack-com文件夹，在终端中使用 node server.js 8002命令


# 例子
    * 例子1：不同源的页面之间不准相互访问数据。假设qq.js访问friends.js中的好友数据。也即qq.js只能访问源为http://qq.com:8008中的数据，那么qq.js可以获取到friends.js中的好友数据，而jack.js由于同源策略无法跨域获取friends中的数据。

    * 例子2：使用CORS来突破跨域的限制，使得jack.js脚本可以获取到源http://qq.com:8008/friends.json中的数据。

    * 例子3：使用JSONP来突破跨域的限制，使得jack.js脚本可以获取到源http://qq.com:8008/friends.json中的数据。

    1 例子1中的qq-com文件夹下面的index.html文件中使用script标签将src指向qq.js文件，qq.js文件中通过AJAX来获取friends.json文件
     中的数据，是可以获取到的。但是在jack-com文件夹下的jack.js文件中同样使用AJAX来获取http://qq.com:8008/friends.json中的数据是获取不到的，说明了不同源之间的页面是不准互相访问数据的，这就是浏览器的同源限制。

    2 例子2中通过在qq-com中的server.js文件中，将路径为/friends.json下设置response.setHeader('Access-Control-Allow-Origin',  'http://jack.com:8002')响应头，写上可以准许访问的源，那么源http://jack.com:8002就可以获取源http://qq.com:8008/    friends.json中的数据了。

    3 例子3中使用jsonp来进行跨域数据访问。请求方jack-com文件夹下面的jack.js文件不再使用AJAX来获取数据，而是通过动态的创建script
    标签，并且将script的标签指向需要获取数据的那一方。服务器再以函数调用的形式将需要获取的数据包裹进去，可以是JSON格式的数据或者xml格式等其它格式的数据。最后通过回调的方式，请求方获取到数据。


