import { ApiClient, ApiConfiguration, ApiRequest, Batch, EventType } from "../dist/index.js"

const api = new ApiClient(new ApiConfiguration("", ""))

api.setEndpoint("https://api.hclcdp.com/v1")

const batch = new Batch()

batch.add(new ApiRequest(EventType.Identify, "Test Identify Event", "user1", { source: "batch" }))
batch.add(new ApiRequest(EventType.Track, "Test Identify Track", "user1", { source: "batch" }))

const event = new ApiRequest(EventType.Track, "Test Track Event", "user1", { source: "single" })

const main = async () => {
  console.log(await api.sendBatchEvents(batch))
  console.log(await api.sendEvent(event))
}

main()
