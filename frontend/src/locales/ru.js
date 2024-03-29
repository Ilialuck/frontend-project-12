// eslint-disable-next-line
export default {
  translation: {
    navigation: {
      main: 'На главную',
      logOut: 'Выйти',
    },
    validations: {
      required: 'Обязательное поле',
      loginFail: 'Неверные имя пользователя или пароль',
      minSymbols: 'Не менее трех символов',
      maxSymbols: 'Максимум 20 символов',
      minMaxSymbols: 'От 3 до 20 символов',
      uniquely: 'Значение должно быть уникальным',
      passwordConfirm: 'Пароли должны совпадать',
      minPasswordSymbols: 'Не менее 6 символов',
      userExists: 'Пользователь с таким именем уже существует',
    },
    errors: {
      error: 'Ошибка',
      404: 'Ошибка 404 - Страница не найдена',
    },
    form: {
      signIn: 'Войти',
      signUp: 'Регистрация',
      signUpBtn: 'Зарегистрироваться',
      noAccount: 'Нет аккаунта?',
      fields: {
        username: 'Имя пользователя',
        username2: 'Ваш ник',
        password: 'Пароль',
        ShowPassword: 'Показать / скрыть пароль',
        passwordConfirmation: 'Подтвердите пароль',
      },
    },
    channels: {
      channels: 'Каналы',

    },
    messages: {
      messages: 'Сообщения',
      inputMessage: 'Новое сообщение',
      send: 'Отправить',
    },
    messagesCounter: {
      messages_zero: '{{count}} сообщений',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },
    modals: {
      addChannel: 'Добавить канал',
      channelName: 'Имя канала',
      send: 'Отправить',
      cancel: 'Отменить',
      removeChannel: 'Удалить канал',
      removeConfirm: 'Уверены?',
      remove: 'Удалить',
      rename: 'Переименовать канал',
      dropdown: {
        control: 'Управление каналом',
        remove: 'Удалить',
        rename: 'Переименовать',
      },
    },
    notifications: {
      addChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
      errors: {
        addChannelError: 'Ошибка: канал не добавлен!',
        removeChannelError: 'Ошибка: канал не удален!',
        renameChannelError: 'Ошибка: канал не переименован!',
        loadDataError: 'Возникла проблема при загрузке данных',
        loginFail: 'Возникла ошибка авторизации',
        regFail: 'Возникла ошибка при регистрации',
        messageError: 'Возникла проблема при отправке сообщения',
      },
    },
  },
};
