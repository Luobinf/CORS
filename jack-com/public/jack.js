
//例子1、例子2共用的AJAX获取数据的代码
// const xhr = new XMLHttpRequest()
// xhr.open('GET','http://qq.com:8008/friends.json')
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.response)
//     }
// }
// xhr.send()

//事先定义好回调函数
// const random = Math.random()
// window[random] = function (data) {
//     console.log(data)
// }

// const script = document.createElement('script')
// script.src = `http://qq.com:8888/friends.js?callback=${random}`
// script.onload = function () {
//     //等到script加载并且执行完了就执行下面的内容
//     script.remove()
// }
// document.body.append(script)


//封装jsonp
//例子3动态创建script标签的代码部分。
function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = Math.random()*10000000 + '$%&jbhdhdhd'  //随机数
        window[random] = function (data) {
            // console.log(data)
            resolve(data)
        }
        const script = document.createElement('script')
        script.src = `${url}?callback=${random}`
        script.onload = function () {
            script.remove()
        }
        script.onerror = function () {
            reject(`失败了`)
        }
        document.body.append(script)
    })
}
jsonp('http://qq.com:8008/friends.js').then( (response) => {
    console.log(response)
}).catch( (error) => {
    console.log(error)
})
