'use strict';

const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
AWS.config.update({ region: 'us-east-2' });
const { Chance } = require('chance');
const chance = new Chance();

const sns = new AWS.SNS();
const topic = 'arn:aws:sns:us-east-2:623507191376:pickup.fifo';
const queueUrl = 'https://sqs.us-east-2.amazonaws.com/623507191376/widgets';

setInterval(() => {
  const orderDetails = {
    orderId: chance.guid(),
    customer: chance.name(),
    vendorId: queueUrl,
  };

  const payload = {
    Message: JSON.stringify(orderDetails),
    TopicArn: topic,
    MessageGroupId: 'widgets',
    MessageDeduplicationId: chance.guid(),
  };

  sns.publish(payload).promise()
    .then(data => console.log('DATA:', data))
    .catch(err => console.log('ERROR IN WIDGETS', err));
}, 5000);

const consumer = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: (data) => {
    console.log('DATA:', data);
    const parsedMessageBody = JSON.parse(data.Body);
    console.log('PARSED BODY:', parsedMessageBody);
  },
});

consumer.start();
