import { UserIdentity, UserIdentityType } from "./UserIdentity"
import packageJson from "../package.json"

export class ApiRequest {
  public eventType?: EventType
  public eventName?: string = ""
  public properties?: Record<string, any>
  public userIdentity?: UserIdentity

  public getPayload(): Record<string, any> {
    const payload: Record<string, any> = {
      type: this.eventType,
      eventname: this.eventName,
      properties: this.properties,
      context: {
        library: {
          name: "@hcl-cdp-ta/cdp-node-sdk",
          version: packageJson.version,
        },
      },
    }

    console.log(this.userIdentity)

    if (this.userIdentity?.type === UserIdentityType.Primary) {
      payload[this.userIdentity?.name as string] = this.userIdentity?.value
    } else {
      payload.otherIds = {
        [this.userIdentity?.name as string]: this.userIdentity?.value,
      }
    }

    return payload
  }

  constructor(
    eventType: EventType,
    eventName: string,
    userIdentity: UserIdentity,
    properties: Record<string, any> = {},
  ) {
    this.eventType = eventType
    this.eventName = eventName
    this.properties = properties
    this.userIdentity = userIdentity
  }
}

export enum EventType {
  Identify = "identify",
  Track = "track",
}
