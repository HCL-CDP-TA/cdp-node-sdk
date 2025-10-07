import axios, { AxiosError, AxiosInstance } from "axios"
import { ApiConfiguration } from "./ApiConfiguration"
import { ApiRequest } from "./ApiRequest"
import { ApiResponse } from "./ApiResponse"
import { Batch } from "./Batch"

export class ApiClient {
  private axiosInstance: AxiosInstance
  public endpoint: string = "https://crux.dev.hxcd.now.hclsoftware.cloud"

  constructor(configuration: ApiConfiguration) {
    this.endpoint = this.endpoint.replace(/\/+$/, "")
    this.axiosInstance = axios.create({
      baseURL: this.endpoint,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": configuration.apiKey,
        "x-api-passkey": configuration.apiPasskey,
      },
    })
  }

  private sendPayload = async (apiRequest: Record<string, any>): Promise<ApiResponse> => {
    try {
      const response = await this.axiosInstance.post("/v3/data", apiRequest)
      const apiResponse: ApiResponse = new ApiResponse(response.data)
      apiResponse.request = apiRequest

      return apiResponse
    } catch (error: unknown) {
      if (axios.isAxiosError<{ error?: { message: string } }>(error)) {
        const apiResponse: ApiResponse = new ApiResponse(error.response?.data as Record<string, any>)
        apiResponse.request = apiRequest
        return apiResponse
      } else {
        throw new Error("Unexpected error occurred while sending payload")
      }
    }
  }

  public sendEvent = async (apiRequest: ApiRequest): Promise<ApiResponse> => {
    return this.sendPayload(apiRequest.getPayload())
  }

  public sendBatchEvents = async (batch: Batch): Promise<ApiResponse[]> => {
    const { batchArray } = batch

    const responses = await Promise.all(
      batchArray.map(async request => {
        return this.sendPayload(request.getPayload())
      }),
    )

    return responses as ApiResponse[]
  }

  public setEndpoint = (newEndpoint: string): void => {
    this.endpoint = newEndpoint
    this.axiosInstance.defaults.baseURL = newEndpoint
  }
}
