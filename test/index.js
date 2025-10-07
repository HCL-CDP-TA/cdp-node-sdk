import dotenv from "dotenv"
import {
  ApiClient,
  ApiConfiguration,
  ApiRequest,
  Batch,
  EventType,
  UserIdentity,
  UserIdentityType,
} from "../dist/index.js"

// Load environment variables from .env file
dotenv.config()

console.log("config:", process.env.CDP_API_KEY || "", process.env.CDP_API_PASSKEY || "")
const api = new ApiClient(new ApiConfiguration(process.env.CDP_API_KEY || "", process.env.CDP_API_PASSKEY || ""))

// api.setEndpoint("https://crux.dev.hxcd.now.hclsoftware.cloud")

const batch = new Batch()

// batch.add(
//   new ApiRequest(
//     EventType.Identify,
//     "Identify",
//     new UserIdentity(UserIdentityType.Primary, "mobile_phone", "+3456789012"),
//     {
//       firstName: "Jim",
//     },
//   ),
// )
// batch.add(
//   new ApiRequest(EventType.Track, "Track", new UserIdentity(UserIdentityType.Primary, "mobile_phone", "+3456789012"), {
//     firstName: "Jim",
//   }),
// )
// batch.add(
//   new ApiRequest(EventType.Track, "Track", new UserIdentity(UserIdentityType.Primary, "mobile_phone", "+3456789012"), {
//     firstName: "Jim",
//   }),
// )

const event = new ApiRequest(
  EventType.Track,
  "Track",
  new UserIdentity(UserIdentityType.Secondary, "mobile_phone", "+3456789012"),
  { firstName: "Jim" },
)

const main = async () => {
  console.log(await api.sendBatchEvents(batch))
  console.log(await api.sendEvent(event))
}

main()
