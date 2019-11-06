const xhr = new XMLHttpRequest()
xhr.open('GET','/friends.json')
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response)
    }
}
xhr.send()