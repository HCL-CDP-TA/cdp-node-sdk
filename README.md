## HCL CDP Node SDK

This repo is a NodeJS wrapper around the HCL CDP API. It provides a simple interface to send events to the HCL CDP server.

## Installation

```
npm install hcl-cdp-node-sdk
```

## Usage

Data can be sent in individual requests or in batches. The `sendEvent` method sends a single event, while the `sendBatchEvents` method sends multiple events at sequentially. Each method returns a promise that resolves to both the request object as well as the response from the HCL CDP server.

### Example Response

```
{
  request: {
    type: 'track',
    eventname: 'Test Track Event',
    userid: 'user1',
    properties: { prop1: 'value' }
  },
  response: {
    message: 'Data Processed successfully',
    id: '3a8535eb-dee7-411a-8d9f-113b7e822f7f'
  }
}
```

### Example Usage

```
import { ApiClient, ApiConfiguration, ApiRequest, Batch, EventType } from "../dist/index.js"

const api = new ApiClient(new ApiConfiguration("", ""))

const batch = new Batch()

batch.add(new ApiRequest(EventType.Identify, "Test Identify Event", "user1", { source: "batch" }))
batch.add(new ApiRequest(EventType.Track, "Test Identify Track", "user1", { source: "batch" }))

const event = new ApiRequest(EventType.Track, "Test Track Event", "user1", { source: "single" })

const main = async () => {
  console.log(await api.sendBatchEvents(batch))
  console.log(await api.sendEvent(event))
}

main()

```
