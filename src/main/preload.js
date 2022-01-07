const NOTIFICATION_TITLE = "通知";
const NOTIFICATION_BODY = "通知内容";
const CLICK_MESSAGE = "通知 clicked!";

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE;