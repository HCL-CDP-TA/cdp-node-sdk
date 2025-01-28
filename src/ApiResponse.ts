import { ApiRequest } from "./ApiRequest"

export class ApiResponse {
  public request?: Record<string, any>
  public response?: {
    message?: string
    id?: string
  }

  constructor(response: Record<string, any>) {
    this.response = {
      message: response.message,
      id: response.id || null,
    }
  }
}
