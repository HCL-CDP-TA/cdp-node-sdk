import axios from "axios"
import { ApiRequest } from "./ApiRequest"

export class Batch {
  public batchArray: ApiRequest[] = []

  public add(request: ApiRequest): void {
    this.batchArray.push(request)
  }
}
