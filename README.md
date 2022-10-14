# LAB - Class 19

## Project: CAPS Cloud

### Author: Branden Ge

### Problem Domain

This lab demonstrates how to create and deploy an event-driven application using AWS Services: SQS, SNS, and Lambda.

#### Running the app

- `node flowers.js` to send a flower order to the SNS pickup notification, and poll its queue for delivery confirmations.
- `node widgets.js` to send a widgets order to the SNS pickup notification, and poll its queue for delivery confirmations.
- `node driver.js` to poll the packages queue and send delivery confirmations to the respective queue for the vendor of the order.

#### Processes

1) Create a pickup.fifo SNS
2) Create a packages.fifo SQS
3) Create a SQS standard queue for each vendor for delivery notifications
4) Subscribe the packages queue to the pickup event notification
5) Create vendor modules (such as flowers and widgets) that send messages for orders to the pickup SNS
6) Create a driver module that subscribes to/consumes the packages queue.
7) Send delivery confirmation messages from the driver module to the SQS standard queue for the respective vendor of each order.

#### Whiteboard

[CAPS Cloud UML Diagram](caps-cloud.png)

Diagram created with [Figma](https://www.figma.com/)

#### Credits: [Demo code from Ryan Gallaway at Code Fellows](https://github.com/codefellows/seattle-code-javascript-401d48/tree/main/class-19/inclass-demo)
