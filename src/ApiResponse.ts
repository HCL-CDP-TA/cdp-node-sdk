import { ApiRequest } from "./ApiRequest"

export class ApiResponse {
  public message?: string
  public id?: string
  public request?: Record<string, any>

  constructor(response: Record<string, any>) {
    this.message = response.message
    this.id = response.id || null
  }
}
