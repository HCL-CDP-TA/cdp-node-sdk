export class ApiRequest {
  public eventType?: EventType
  public eventName?: string = ""
  public userId: string = ""
  public properties?: Record<string, any>

  public getPayload(): Record<string, any> {
    return {
      type: this.eventType,
      eventname: this.eventName,
      userid: this.userId,
      properties: this.properties,
    }
  }

  constructor(eventType: EventType, eventName: string, userId: string, properties: Record<string, any> = {}) {
    this.eventType = eventType
    this.eventName = eventName
    this.userId = userId
    this.properties = properties
  }
}

export enum EventType {
  Identify = "identify",
  Track = "track",
}
