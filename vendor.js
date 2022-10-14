'use strict';

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs-us-east-2.amazonaws.com/435095930434/messages-demo',
  handleMessage: (data) => {
    console.log('DATA BODY:', data.Body);
    const body = JSON.parse(data.Body);
    console.log('BODY MESSAGE:', body.Message);
  },
});

app.start();
