const wsUrl = "wss://echo-ws-service.herokuapp.com"

const btnSend = document.querySelector('.btn-send')
const btnGeo = document.querySelector('.btn-geo')
const chatField = document.querySelector('.chat-field')
const inputMessage = document.querySelector('.input')
const infoField = document.querySelector('.info')

let websocket = new WebSocket(wsUrl)

function writeToScreen(message) {
    let tag = document.createElement("p");
    tag.style = "break-word";
    tag.innerHTML = message;
    chatField.appendChild(tag);
    chatField.scrollTop = chatField.scrollHeight;
  }


  btnSend.addEventListener('click', () => {
    const message = inputMessage.value
    if (message != '') {
        writeToScreen('<span class="user">' + message + '</span>')
        websocket.send(message)
        inputMessage.value = ''
    }
  })


  websocket.onopen = function(e) {
    infoField.innerHTML = '<span style="color: green;">Соединение установлено</span>'
}


websocket.onmessage = function(evt) {
    if (evt.data !== 'echo.websocket.events') {
        writeToScreen('<span class="server">' + evt.data +'</span>')
    }
}

websocket.onclose = function(e) {
    infoField.innerHTML = '<span style="color: blue;">Соединение прервано</span>\
    <button id="reset" class="btn-reset">Обновить страницу</button>'
    const btn = document.querySelector('.btn-reset')
    btn.addEventListener('click', () => {
        location.reload()
    })
}

websocket.onerror = function(evt) {
    writeToScreen('<span class="server" style="color: red;">ERROR: </span> ' + evt.data)
  }


  btnGeo.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position
            writeToScreen(`<a class="user" href = https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude} \
            id="map-link" target="_blank">Геолокация</a>`)
        }, () => {
            writeToScreen(`<span class="server" style="color: blue;">Разрешите доступ к вашему местоположению</span>`)
        })
    }
  })