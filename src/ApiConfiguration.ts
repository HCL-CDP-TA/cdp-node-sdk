export class ApiConfiguration {
  public apiKey?: string
  public apiPasskey?: string

  constructor(apiKey: string, apiPasskey: string) {
    this.apiKey = apiKey
    this.apiPasskey = apiPasskey
  }
}
