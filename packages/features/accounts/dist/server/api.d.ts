import * as _kit_supabase_database from '@kit/supabase/database';
import { Database } from '@kit/supabase/database';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Class representing an API for interacting with user accounts.
 * @constructor
 * @param {SupabaseClient<Database>} client - The Supabase client instance.
 */
declare class AccountsApi {
    private readonly client;
    constructor(client: SupabaseClient<Database>);
    /**
     * @name getAccount
     * @description Get the account data for the given ID.
     * @param id
     */
    getAccount(id: string): Promise<{
        address: _kit_supabase_database.Json | null;
        auth_user_id: string;
        avatar_url: string | null;
        company_name: string | null;
        created_at: string;
        email: string | null;
        first_name: string | null;
        full_name: string | null;
        id: string;
        is_guest: boolean;
        last_name: string | null;
        metadata: _kit_supabase_database.Json | null;
        phone_number: string | null;
        preferences: _kit_supabase_database.Json | null;
        updated_at: string;
        visibility_flags: _kit_supabase_database.Json | null;
    }>;
}
declare function createAccountsApi(client: SupabaseClient<Database>): AccountsApi;

export { createAccountsApi };
