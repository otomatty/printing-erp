"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server/api.ts
var api_exports = {};
__export(api_exports, {
  createAccountsApi: () => createAccountsApi
});
module.exports = __toCommonJS(api_exports);
var AccountsApi = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * @name getAccount
   * @description Get the account data for the given ID.
   * @param id
   */
  async getAccount(id) {
    const { data, error } = await this.client.from("user_accounts").select("*").eq("id", id).single();
    if (error) {
      throw error;
    }
    return data;
  }
};
function createAccountsApi(client) {
  return new AccountsApi(client);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAccountsApi
});
