export enum UserIdentityType {
  Primary,
  Secondary,
}

export class UserIdentity {
  public type: UserIdentityType
  public name: string
  public value: string

  constructor(type: UserIdentityType, name: string, value: string) {
    this.type = type
    this.name = name
    this.value = value
  }
}
