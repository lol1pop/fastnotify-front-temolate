const headersTableAlert = [
  {
    text: 'Type',
    align: 'start',
    sortable: false,
    value: 'type',
  },
  { text: 'Title', value: 'title' },
  { text: 'Creation date', value: 'date_create' },
  { text: 'Sender', value: 'sender' },
  { text: 'Actions', value: 'actions', sortable: false },
]

const headersTableUserGroup = {
  users: [{
    text: 'Display name',
    align: 'start',
    sortable: true,
    value: 'display_name',
  },
    { text: 'Name', value: 'login' },
    { text: 'Online', value: 'online' }],
  groups: [{
    text: 'Name',
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
  text: "Login",
  align: "start",
  value: "login",
},
  {text: "Role", value: "role"},
  { text: 'Actions', value: 'actions', sortable: false }
]

const headerTableGroups = [{
  text: "Display name",
  align: "start",
  sortable: true,
  value: "display_name",
},
  {text: "Name", value: "login"},
  {text: "Online", value: "online"}]

export {
  typePolicyRule,
  headerTablePublisher,
  headerTableGroups,
  headersTableUserGroup,
  typeAlert,
  headersTableAlert
};