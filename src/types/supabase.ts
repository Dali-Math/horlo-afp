// types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      measurements: {
        Row: {
          id: string;
          created_at: string;
          calibre: string | null;
          position: string | null;
          amplitude_avg: number | null;
          rate_avg: number | null;
          user_id: string | null;
          is_public: boolean | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          calibre?: string | null;
          position?: string | null;
          amplitude_avg?: number | null;
          rate_avg?: number | null;
          user_id?: string | null;
          is_public?: boolean | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          calibre?: string | null;
          position?: string | null;
          amplitude_avg?: number | null;
          rate_avg?: number | null;
          user_id?: string | null;
          is_public?: boolean | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
