import {Message} from "../types";

const browserOrChrome = chrome ?? browser;
const urlRegex = /<span[^<>]*>(.+)<\/span>/;

browserOrChrome.runtime.onMessage.addListener((request: Message, sender, sendResponse) => {
    if (request.contentScriptQuery == "convertLink") {
        fetch(request.href as string, {
            method: 'get',
            mode: 'no-cors'
        }).then(async (result) => {
            if (!result.ok) {
                sendResponse(null);
                return;
            }
            const text = await result.text();
            const match = text.match(urlRegex);
            sendResponse(match === null ? null : match[1]);
        }).catch((error) => {
            console.error(error);
            sendResponse(null);
        });
        return true;
    }
});
