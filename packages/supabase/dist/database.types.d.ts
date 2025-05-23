type Json = string | number | boolean | null | {
    [key: string]: Json | undefined;
} | Json[];
type Database = {
    public: {
        Tables: {
            news: {
                Row: {
                    author_id: string | null;
                    category_id: string | null;
                    content: string;
                    created_at: string;
                    id: string;
                    is_featured: boolean | null;
                    publish_end_date: string | null;
                    published_at: string | null;
                    slug: string;
                    status: string;
                    summary: string | null;
                    thumbnail_url: string | null;
                    title: string;
                    updated_at: string;
                };
                Insert: {
                    author_id?: string | null;
                    category_id?: string | null;
                    content: string;
                    created_at?: string;
                    id?: string;
                    is_featured?: boolean | null;
                    publish_end_date?: string | null;
                    published_at?: string | null;
                    slug: string;
                    status?: string;
                    summary?: string | null;
                    thumbnail_url?: string | null;
                    title: string;
                    updated_at?: string;
                };
                Update: {
                    author_id?: string | null;
                    category_id?: string | null;
                    content?: string;
                    created_at?: string;
                    id?: string;
                    is_featured?: boolean | null;
                    publish_end_date?: string | null;
                    published_at?: string | null;
                    slug?: string;
                    status?: string;
                    summary?: string | null;
                    thumbnail_url?: string | null;
                    title?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "news_author_id_fkey";
                        columns: ["author_id"];
                        isOneToOne: false;
                        referencedRelation: "user_accounts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "news_category_id_fkey";
                        columns: ["category_id"];
                        isOneToOne: false;
                        referencedRelation: "news_categories";
                        referencedColumns: ["id"];
                    }
                ];
            };
            news_attachments: {
                Row: {
                    created_at: string;
                    file_name: string;
                    file_path: string;
                    file_size: number;
                    file_type: string;
                    id: string;
                    news_id: string | null;
                };
                Insert: {
                    created_at?: string;
                    file_name: string;
                    file_path: string;
                    file_size: number;
                    file_type: string;
                    id?: string;
                    news_id?: string | null;
                };
                Update: {
                    created_at?: string;
                    file_name?: string;
                    file_path?: string;
                    file_size?: number;
                    file_type?: string;
                    id?: string;
                    news_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "news_attachments_news_id_fkey";
                        columns: ["news_id"];
                        isOneToOne: false;
                        referencedRelation: "news";
                        referencedColumns: ["id"];
                    }
                ];
            };
            news_categories: {
                Row: {
                    created_at: string;
                    description: string | null;
                    display_order: number | null;
                    id: string;
                    name: string;
                    slug: string;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    description?: string | null;
                    display_order?: number | null;
                    id?: string;
                    name: string;
                    slug: string;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    description?: string | null;
                    display_order?: number | null;
                    id?: string;
                    name?: string;
                    slug?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            user_accounts: {
                Row: {
                    address: Json | null;
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
                    metadata: Json | null;
                    phone_number: string | null;
                    preferences: Json | null;
                    updated_at: string;
                    visibility_flags: Json | null;
                };
                Insert: {
                    address?: Json | null;
                    auth_user_id: string;
                    avatar_url?: string | null;
                    company_name?: string | null;
                    created_at?: string;
                    email?: string | null;
                    first_name?: string | null;
                    full_name?: string | null;
                    id?: string;
                    is_guest?: boolean;
                    last_name?: string | null;
                    metadata?: Json | null;
                    phone_number?: string | null;
                    preferences?: Json | null;
                    updated_at?: string;
                    visibility_flags?: Json | null;
                };
                Update: {
                    address?: Json | null;
                    auth_user_id?: string;
                    avatar_url?: string | null;
                    company_name?: string | null;
                    created_at?: string;
                    email?: string | null;
                    first_name?: string | null;
                    full_name?: string | null;
                    id?: string;
                    is_guest?: boolean;
                    last_name?: string | null;
                    metadata?: Json | null;
                    phone_number?: string | null;
                    preferences?: Json | null;
                    updated_at?: string;
                    visibility_flags?: Json | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            check_is_admin: {
                Args: Record<PropertyKey, never>;
                Returns: boolean;
            };
        };
        Enums: {
            admin_role: "admin" | "staff";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    system: {
        Tables: {
            admin_quick_access: {
                Row: {
                    admin_user_id: string;
                    created_at: string | null;
                    display_order: number;
                    id: string;
                    is_visible: boolean | null;
                    item_id: string;
                    updated_at: string | null;
                };
                Insert: {
                    admin_user_id: string;
                    created_at?: string | null;
                    display_order: number;
                    id?: string;
                    is_visible?: boolean | null;
                    item_id: string;
                    updated_at?: string | null;
                };
                Update: {
                    admin_user_id?: string;
                    created_at?: string | null;
                    display_order?: number;
                    id?: string;
                    is_visible?: boolean | null;
                    item_id?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "admin_quick_access_admin_user_id_fkey";
                        columns: ["admin_user_id"];
                        isOneToOne: false;
                        referencedRelation: "admin_users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "admin_quick_access_item_id_fkey";
                        columns: ["item_id"];
                        isOneToOne: false;
                        referencedRelation: "quick_access_items";
                        referencedColumns: ["id"];
                    }
                ];
            };
            admin_users: {
                Row: {
                    auth_user_id: string;
                    created_at: string;
                    email: string | null;
                    first_name: string | null;
                    id: string;
                    is_active: boolean;
                    last_name: string | null;
                    role: Database["public"]["Enums"]["admin_role"];
                    updated_at: string;
                };
                Insert: {
                    auth_user_id: string;
                    created_at?: string;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    is_active?: boolean;
                    last_name?: string | null;
                    role?: Database["public"]["Enums"]["admin_role"];
                    updated_at?: string;
                };
                Update: {
                    auth_user_id?: string;
                    created_at?: string;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    is_active?: boolean;
                    last_name?: string | null;
                    role?: Database["public"]["Enums"]["admin_role"];
                    updated_at?: string;
                };
                Relationships: [];
            };
            quick_access_items: {
                Row: {
                    category_id: string;
                    created_at: string | null;
                    description: string;
                    display_order: number;
                    href: string;
                    icon: string;
                    id: string;
                    is_default: boolean | null;
                    is_enabled: boolean | null;
                    title: string;
                    updated_at: string | null;
                };
                Insert: {
                    category_id: string;
                    created_at?: string | null;
                    description: string;
                    display_order: number;
                    href: string;
                    icon: string;
                    id?: string;
                    is_default?: boolean | null;
                    is_enabled?: boolean | null;
                    title: string;
                    updated_at?: string | null;
                };
                Update: {
                    category_id?: string;
                    created_at?: string | null;
                    description?: string;
                    display_order?: number;
                    href?: string;
                    icon?: string;
                    id?: string;
                    is_default?: boolean | null;
                    is_enabled?: boolean | null;
                    title?: string;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            check_is_admin: {
                Args: Record<PropertyKey, never>;
                Returns: boolean;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};
type DefaultSchema = Database[Extract<keyof Database, "public">];
type Tables<DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) | {
    schema: keyof Database;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"]) : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
} ? R : never : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
    Row: infer R;
} ? R : never : never;
type TablesInsert<DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
} ? I : never : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I;
} ? I : never : never;
type TablesUpdate<DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
} ? U : never : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U;
} ? U : never : never;
type Enums<DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | {
    schema: keyof Database;
}, EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"] : never = never> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
} ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName] : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions] : never;
type CompositeTypes<PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | {
    schema: keyof Database;
}, CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"] : never = never> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName] : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions] : never;
declare const Constants: {
    readonly public: {
        readonly Enums: {
            readonly admin_role: readonly ["admin", "staff"];
        };
    };
    readonly system: {
        readonly Enums: {};
    };
};

export { type CompositeTypes, Constants, type Database, type Enums, type Json, type Tables, type TablesInsert, type TablesUpdate };
