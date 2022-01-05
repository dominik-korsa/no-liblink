import {Message} from "../types";

const linkElements = document.querySelectorAll('.container-message-content a') as NodeListOf<HTMLAnchorElement>;
const linkRegex = /^https:\/\/liblink\.pl\/(\w+)$/;

const browserOrChrome = chrome ?? browser;

linkElements.forEach(async (link) => {
    if (!linkRegex.test(link.href)) return;
    const message: Message = {
        contentScriptQuery: 'convertLink',
        href: link.href,
    }
    await browserOrChrome.runtime.sendMessage(
        message,
        (response: string | null) => {
            if (response === null) return;
            link.title = `Link ${link.href} został ponownie skonwertowany ze względów wygody użytkowania.`;
            link.href = response;
            link.text = response;
        }
    );
});
