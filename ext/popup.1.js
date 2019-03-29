// Copyright (c) 2013 TANIGUCHI Takaki
// License: GPL version 3 or later

$('#1234567').change(function (e) {
    clear()
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(
            tab.id, {
                type: 'css',
                query: e.currentTarget.value
            },
            function (response) {
                console.log(response.length)
            }.bind(this))
    }.bind(this))
})

function getInitialState() {
    var selector = localStorage['selector']
    var type = localStorage['type']
    return {
        type: type,
        selector: selector,
        match: 0
    }
}

function _onRadioChange(e) {
    var val = e.currentTarget.value
    localStorage['type'] = val
    this.setState({
        type: val
    })
    this.pickup()
}

function _onTextChange(e) {
    var val = e.currentTarget.value
    localStorage['selector'] = val
    this.setState({
        selector: val
    })
    this.pickup()
}

function clear() {
    chrome.tabs.executeScript(
        null, {
            code: "document.querySelectorAll('*').forEach(function(e){e.style.background=''});" +
                "document.querySelectorAll('*').forEach(function(e){e.style.border=''});"
        }
    )
}

function pickup() {
    clear()
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(
            tab.id, {
                type: 'css',
                query: this.state.selector
            },
            function (response) {
                console.log(response.length)
            }.bind(this))
    }.bind(this))
}
