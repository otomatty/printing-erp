// src/server/api.ts
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
    const { data, error } = await this.client.from("profiles").select("*").eq("id", id).single();
    if (error) {
      throw error;
    }
    return data;
  }
};
function createAccountsApi(client) {
  return new AccountsApi(client);
}
export {
  createAccountsApi
};
