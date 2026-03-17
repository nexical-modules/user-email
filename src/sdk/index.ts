// GENERATED CODE - DO NOT MODIFY
import { ApiClient, BaseResource } from '@nexical/sdk-core';
import { UserEmailSDK as BaseUserEmailSDK } from './user-email-sdk.js';
export * from './types.js';
export * from './user-email-sdk.js';

/** Main SDK for the user-email module. */
export class UserEmailModule extends BaseResource {
  public userEmail: BaseUserEmailSDK;
  public static readonly roles: Record<string, string> = {};

  constructor(client: ApiClient) {
    super(client);
    this.userEmail = new BaseUserEmailSDK(client);
  }
}
