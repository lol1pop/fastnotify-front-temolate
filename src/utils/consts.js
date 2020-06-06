const mainColorTheme = {
  background: "#232323",
  main: "#1b5e20",
  secondary: "#",
  dark: "#353535",
  light: "#424242",
}

const toolbarOptions = [
  [{ "font": [] }],
  ["bold", "italic", "underline", "strike"],
  [{ "list": "ordered"}, { "list": "bullet" }, { "align": [] },{ "indent": "-1"}, { "indent": "+1" }],
  ["blockquote", "code-block"],
  [{ "header": [1, 2, 3, 4, 5, 6, false] }],
  [{ "color": [] }, { "background": [] }],
  [{ "script": "sub"}, { "script": "super" }],
  ["link", "image","video"],
  ["clean"]
]

// eslint-disable-next-line no-unused-vars
const modelFullAlert = {
  "alert": {
    "title": "",
    "content": "",
    "create_id": ""
  },
  "schedule_alert": {
    "schedule": false,
    "pattern": 1,
    "start_datime": "2020-02-05T18:45:00.000Z",
    "end_datime": "2020-02-12T17:00:00.000Z",
    "enable": false
  },
  "type": 1,
  "alert_settings": {
    "priority": false,
    "acknowledgement": false,
    "unobtrusive": false,
    "destructing": false,
    "auto": false,
    "auto_num": 1,
    "expire": 60,
    "lifetime": false,
    "manual": false,
    "minutes": 1,
    "print": false
  },
  "alert_appearance": {
    "desktop_alert": true,
    "type": 1,
    "width": 500,
    "height": 500,
    "resizable": false,
    "position": 3
  },
  "device_type": {
    "block": 1
  },
  "messaging_channels": {
    "email": false,
    "sms": false
  },
  "question": {
    "question_text_1": "",
    "option_1": "",
    "option_2": "",
    "question_2": "",
    "question_text_2": ""
  },
  "ticker_speed": {
    "percent": 50
  }
}

const modelAlert = {
  "alert": {
    "title": "",
    "content": "",
    "create_id": 0
  },
  "alert_settings": {
    "priority": false,
    "unobtrusive": false
  },
  "schedule_alert": {
    "schedule": false,
    "pattern": 1,
    "start_datime": "2020-02-05T18:45:00.000Z",
    "end_datime": "2020-02-12T17:00:00.000Z",
    "enable": false
  },
  "type": 1
}

const setAlert = {
  "alert_id": null,
  "sender_id": null,
  "userList": [],
  "groupList": []
}

export {
  modelAlert,
  mainColorTheme,
  toolbarOptions,
  setAlert
};