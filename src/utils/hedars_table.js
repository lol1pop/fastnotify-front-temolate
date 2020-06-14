const headersTableAlert = [
  {
    text: 'ВИД',
    align: 'start',
    sortable: false,
    value: 'type',
  },
  { text: 'ЗАГОЛОВОК', value: 'title' },
  { text: 'ДАДА СОЗДАНИЯ', value: 'date_create' },
  { text: 'ОТПРАВИТЕЛЬ', value: 'sender' },
  { text: ' ', value: 'actions', sortable: false },
]

const headersTableUserGroup = {
  users: [{
    text: 'ОТОБРОЖАЕМОЕ ИМЯ',
    align: 'start',
    sortable: true,
    value: 'display_name',
  },
    { text: 'ЛОГИН', value: 'login' },
    { text: 'СТАТУС', value: 'online' }],
  groups: [{
    text: 'ГРУППА',
    align: 'start',
    sortable: true,
    value: 'name',
  },
    { text: 'ID', value: 'group_id' }]
}

const typeAlert = {
  "1": "mdi-calendar-blank",
  "3": "mdi-calendar-alert",
  "5": "mdi-calendar-blank-multiple"
}

const typePolicyRule = [
  "ADMIN",
  "SYSADMIN",
  "USER"
]

const headerTablePublisher = [{
  text: "ЛОГИН",
  align: "start",
  value: "login",
},
  {text: "РОЛЬ", value: "role"},
  { text: ' ', value: 'actions', sortable: false }
]

const headerTableGroups = [{
  text: "ГРУППА",
  align: "start",
  sortable: true,
  value: "name",
},
  {text: "ID", value: "group_id"},
  { text: ' ', value: 'actions', sortable: false}]

export {
  typePolicyRule,
  headerTablePublisher,
  headerTableGroups,
  headersTableUserGroup,
  typeAlert,
  headersTableAlert
};