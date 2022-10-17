'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const consumer = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/623507191376/packages.fifo',
  handleMessage: async (data) => {
    const parsedMessageBody = JSON.parse(data.Body);
    const order = JSON.parse(parsedMessageBody.Message);
    console.log('DATA:', data);
    console.log('PARSED BODY:', parsedMessageBody);
    console.log('PARSED ORDER:', order);

    const producer = Producer.create({
      queueUrl: order.vendorId,
      region: 'us-east-2',
    });

    const messageString = JSON.stringify(`ORDER ID ${order.orderId} DELIVERED FROM VENDOR ID ${order.vendorId} FOR ${order.customer}.`);

    const payload = {
      id: order.orderId,
      body: messageString,
    };

    setTimeout(async () => {
      const response = await producer.send(payload);
      console.log('RESPONSE:', response);
    }, Math.floor(Math.random() * 5000));
  },
});

consumer.start();
