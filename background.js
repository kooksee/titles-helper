// 能够访问所有的页面，相当于全局变量
let __actived = false;
const MENU_ID = "GETSELECTOR";

const updateIcon = isPressed =>
    chrome.browserAction.setIcon({
        path: `icon_128${isPressed ? "_pressed" : ""}.png`
    });

function IsActivated() {
    return __actived;
}

!(() => {

    chrome.browserAction.onClicked.addListener(tab => {
        __actived = !__actived;
        updateIcon(__actived);

        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, {type: "browser", is_actived: __actived},
                function (response) {
                    console.log(response)
                })
        });

        // if (__actived) {
        //     chrome.contextMenus.create({
        //         id: MENU_ID,
        //         title: "鲁班选择器复制",
        //         contexts: ["all"],
        //         documentUrlPatterns: ["*://*/*"],
        //         onclick: e => {
        //             if (e.menuItemId !== MENU_ID) {
        //                 return;
        //             }
        //
        //             chrome.tabs.getSelected(null, function (tab) {
        //                 chrome.tabs.executeScript(tab.id, {code: "_Copy()"});
        //             });
        //         }
        //     });
        // }
    });

    const __tb = async tab => {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, {type: "tags", is_actived: __actived},
                function (response) {
                    console.log(response)
                })
        });
        console.log(tab, "tabs.onActivated");
    };

    chrome.tabs.onActivated.addListener(__tb);
    chrome.tabs.onUpdated.addListener(__tb);

})();


