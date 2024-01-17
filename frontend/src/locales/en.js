// eslint-disable-next-line
export default {
  translation: {
    navigation: {
      main: 'Main',
      logOut: 'Exit',
    },
    validations: {
      required: 'Required field',
      loginFail: 'Invalid user name or password',
      minSymbols: 'At least three characters',
      maxSymbols: 'Maximum 20 characters',
      minMaxSymbols: 'From 3 to 20 characters',
      uniquely: 'The value must be unique',
      passwordConfirm: 'The passwords must match',
      minPasswordSymbols: 'At least 6 characters',
      userExists: 'A user with this name already exists',
    },
    errors: {
      error: 'Error',
      404: 'Error 404 - not found',
    },
    form: {
      signIn: 'Sign in',
      signUp: 'Registration',
      signUpBtn: 'Sign up',
      noAccount: 'No account?',
      fields: {
        username: 'User Name',
        username2: 'Your nickname',
        password: 'Password',
        ShowPassword: 'Show / hide password',
        passwordConfirmation: 'Confirm password',
      },
    },
    channels: {
      channels: 'Channels',

    },
    messages: {
      messages: 'Messages',
      inputMessage: 'New message',
      send: 'Send',
    },
    messagesCounter: {
      messages_zero: '{{count}} messages',
      messages_one: '{{count}} message',
      messages_few: '{{count}} messages',
      messages_many: '{{count}} messages',
    },
    modals: {
      addChannel: 'Add channel',
      channelName: 'Channel name',
      send: 'Send',
      cancel: 'Cancel',
      removeChannel: 'Remove channel',
      removeConfirm: 'Are you sure?',
      remove: 'Remove',
      rename: 'Rename channel',
      dropdown: {
        control: 'Channel control',
        remove: 'Remove',
        rename: 'Rename',
      },
    },
    notifications: {
      addChannel: 'The channel has been created',
      removeChannel: 'Channel deleted',
      renameChannel: 'Channel renamed',
      errors: {
        addChannelError: 'Error: channel not added!',
        removeChannelError: 'Error: channel not deleted!',
        renameChannelError: 'Error: channel not renamed!',
        loadDataError: 'There was a problem when loading data',
        loginFail: 'An authorization error occurred',
        regFail: 'There was an error during registration',
        messageError: 'There was a problem when sending a message',
      },
    },
  },
};
