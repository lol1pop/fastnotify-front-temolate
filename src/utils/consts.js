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


export {
  mainColorTheme,
  toolbarOptions
};