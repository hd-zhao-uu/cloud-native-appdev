const {
  SQSClient,
  DeleteMessageCommand,
  ReceiveMessageCommand
} = require("@aws-sdk/client-sqs");

const env = require('./env');

// ...
// Helper function for the "Service Autoscaling" section.
const delay = delayMs => {
  return new Promise(resolve => {
    setTimeout(resolve, delayMs)
  });
};


let running = true;

// TODO Exercise 4-1: Implement SIGINT and SIGTERM handling to stop the processor.
function stop(){
  console.log('About to stop TMS Processor!');
  running = false;
}

function gracefullyShutDown(){
  console.log('About to shut down gracefully!');

  server.close(() => {
      console.log("TMS content shut down gracefully!")
      process.exit(0);

  });
}
process.on('SIGTERM', stop);
process.on('SIGINT', stop);

const processor = async () => {
  while (running) {
    // TODO Exercise 4-2: Send ReceiveMessageCommand to receive messages.
    // Note: This may take up to 20 (WaitTime)Seconds - what happens if a SIGINT/SIGTERM is received in the meantime?
    const client = new SQSClient({ region: "eu-north-1" });
    const out = await client.send(new ReceiveMessageCommand({
      QueueUrl: process.env.COPILOT_QUEUE_URI,
      WaitTimeSeconds: 10,
    }));

    // console.log(`results: ${JSON.stringify(out)}`);

    if (out.Messages === undefined || out.Messages.length === 0) {
      continue;
    }

    // TODO Exercise 4-3: Process messages (if any).
    //
    // Note: For each message (= processor request), add the following code to simulate "processing":
    // (see more about the structure of an SQS message: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/modules/message.html)
    // ...
    //
    for (const message of out.Messages) {
      const {
        Body,
        ReceiptHandle
      } = message;

      const body = JSON.parse(Body);
      const requestId = body.Message;

      console.log(`Request with ID: ${requestId} processed successfully.`);


      // TODO Exercise 4-4: For each message, send DeleteMessageCommand to instruct the queue the the message has been handled and can be removed.
      await client.send(new DeleteMessageCommand({
        QueueUrl: process.env.COPILOT_QUEUE_URI,
        ReceiptHandle: out.Messages[0].ReceiptHandle,
      }));
    }


  }
}

processor();