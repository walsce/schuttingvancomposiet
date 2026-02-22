export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cms_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      cms_order_items: {
        Row: {
          created_at: string
          id: string
          options: Json | null
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          options?: Json | null
          order_id: string
          product_id?: string | null
          product_name: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          id?: string
          options?: Json | null
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "cms_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "cms_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "cms_products"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_orders: {
        Row: {
          billing_address: Json | null
          created_at: string
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          id: string
          items: Json | null
          notes: string | null
          order_number: number
          payment_id: string | null
          shipping_address: Json | null
          shipping_cost: number
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          items?: Json | null
          notes?: string | null
          order_number?: number
          payment_id?: string | null
          shipping_address?: Json | null
          shipping_cost?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          items?: Json | null
          notes?: string | null
          order_number?: number
          payment_id?: string | null
          shipping_address?: Json | null
          shipping_cost?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cms_product_faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          product_id: string
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          product_id: string
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          product_id?: string
          question?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_product_faqs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "cms_products"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_product_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          is_primary: boolean | null
          product_id: string
          sort_order: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_primary?: boolean | null
          product_id: string
          sort_order?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
          product_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "cms_products"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_products: {
        Row: {
          category: Database["public"]["Enums"]["product_category"]
          category_id: string | null
          created_at: string
          delivery_time: string | null
          dimensions: Json | null
          durability: Database["public"]["Enums"]["product_durability"] | null
          features: string[] | null
          guarantee: string | null
          highlights: string[] | null
          id: string
          is_published: boolean | null
          long_description: string | null
          name: string
          options: Json | null
          price: number
          price_label: string | null
          product_type: Database["public"]["Enums"]["product_type"] | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          sort_order: number | null
          specifications: Json | null
          tone: Database["public"]["Enums"]["product_tone"] | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["product_category"]
          category_id?: string | null
          created_at?: string
          delivery_time?: string | null
          dimensions?: Json | null
          durability?: Database["public"]["Enums"]["product_durability"] | null
          features?: string[] | null
          guarantee?: string | null
          highlights?: string[] | null
          id?: string
          is_published?: boolean | null
          long_description?: string | null
          name: string
          options?: Json | null
          price?: number
          price_label?: string | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          specifications?: Json | null
          tone?: Database["public"]["Enums"]["product_tone"] | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["product_category"]
          category_id?: string | null
          created_at?: string
          delivery_time?: string | null
          dimensions?: Json | null
          durability?: Database["public"]["Enums"]["product_durability"] | null
          features?: string[] | null
          guarantee?: string | null
          highlights?: string[] | null
          id?: string
          is_published?: boolean | null
          long_description?: string | null
          name?: string
          options?: Json | null
          price?: number
          price_label?: string | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          specifications?: Json | null
          tone?: Database["public"]["Enums"]["product_tone"] | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "cms_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_activities: {
        Row: {
          contact_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          metadata: Json | null
          title: string | null
          type: Database["public"]["Enums"]["crm_activity_type"]
        }
        Insert: {
          contact_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          type?: Database["public"]["Enums"]["crm_activity_type"]
        }
        Update: {
          contact_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          type?: Database["public"]["Enums"]["crm_activity_type"]
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contacts: {
        Row: {
          assigned_to: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          last_contact_at: string | null
          name: string | null
          notes: string | null
          phone: string | null
          pipeline_stage: Database["public"]["Enums"]["crm_pipeline_stage"]
          source: string | null
          tags: string[] | null
          total_revenue: number | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          last_contact_at?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_stage?: Database["public"]["Enums"]["crm_pipeline_stage"]
          source?: string | null
          tags?: string[] | null
          total_revenue?: number | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          last_contact_at?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_stage?: Database["public"]["Enums"]["crm_pipeline_stage"]
          source?: string | null
          tags?: string[] | null
          total_revenue?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      deck_planner_leads: {
        Row: {
          area_m2: number | null
          created_at: string
          email: string
          id: string
          materials_list: Json | null
          name: string | null
          phone: string | null
          selected_product: string | null
          shape_data: Json
        }
        Insert: {
          area_m2?: number | null
          created_at?: string
          email: string
          id?: string
          materials_list?: Json | null
          name?: string | null
          phone?: string | null
          selected_product?: string | null
          shape_data?: Json
        }
        Update: {
          area_m2?: number | null
          created_at?: string
          email?: string
          id?: string
          materials_list?: Json | null
          name?: string | null
          phone?: string | null
          selected_product?: string | null
          shape_data?: Json
        }
        Relationships: []
      }
      google_feed_settings: {
        Row: {
          brand_name: string | null
          currency: string | null
          id: string
          shipping_country: string | null
          shipping_price: number | null
          store_name: string | null
          store_url: string | null
          updated_at: string
        }
        Insert: {
          brand_name?: string | null
          currency?: string | null
          id?: string
          shipping_country?: string | null
          shipping_price?: number | null
          store_name?: string | null
          store_url?: string | null
          updated_at?: string
        }
        Update: {
          brand_name?: string | null
          currency?: string | null
          id?: string
          shipping_country?: string | null
          shipping_price?: number | null
          store_name?: string | null
          store_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      crm_activity_type: "note" | "call" | "email" | "status_change" | "order"
      crm_pipeline_stage:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal"
        | "won"
        | "lost"
      order_status:
        | "pending"
        | "paid"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      product_category: "gevelbekleding" | "schuttingen" | "vlonderplanken"
      product_durability: "standaard" | "premium" | "massief"
      product_tone: "teak" | "zwart" | "walnoot" | "eiken" | "grijs"
      product_type: "plank" | "paneel" | "profiel"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      crm_activity_type: ["note", "call", "email", "status_change", "order"],
      crm_pipeline_stage: [
        "new",
        "contacted",
        "qualified",
        "proposal",
        "won",
        "lost",
      ],
      order_status: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      product_category: ["gevelbekleding", "schuttingen", "vlonderplanken"],
      product_durability: ["standaard", "premium", "massief"],
      product_tone: ["teak", "zwart", "walnoot", "eiken", "grijs"],
      product_type: ["plank", "paneel", "profiel"],
    },
  },
} as const
