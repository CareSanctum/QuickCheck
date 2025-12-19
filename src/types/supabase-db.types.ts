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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          account_id: number
          beta_access: boolean | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          account_id?: number
          beta_access?: boolean | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          account_id?: number
          beta_access?: boolean | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_activity_log: {
        Row: {
          action_type: string
          admin_email: string
          changes: Json | null
          created_at: string
          id: string
          record_id: string
          table_name: string
        }
        Insert: {
          action_type: string
          admin_email: string
          changes?: Json | null
          created_at?: string
          id?: string
          record_id: string
          table_name: string
        }
        Update: {
          action_type?: string
          admin_email?: string
          changes?: Json | null
          created_at?: string
          id?: string
          record_id?: string
          table_name?: string
        }
        Relationships: []
      }
      admin_checklist: {
        Row: {
          aadhar_back_status: string | null
          aadhar_front_status: string | null
          created_at: string
          device_access_given: boolean | null
          device_app_downloaded: boolean | null
          device_explained: boolean | null
          device_handed_over: boolean | null
          device_registered_admin: boolean | null
          handover_form_signed: boolean | null
          id: string
          m2m_sim_assigned: boolean | null
          m2m_sim_kyc_done: boolean | null
          m2m_sim_number_added: boolean | null
          monthly_finance_updated: boolean | null
          numbers_whitelisted_telephony_portal: boolean | null
          onboarding_email_sent: boolean | null
          profile_id: string
          sos_configured_in_app: boolean | null
          updated_at: string
        }
        Insert: {
          aadhar_back_status?: string | null
          aadhar_front_status?: string | null
          created_at?: string
          device_access_given?: boolean | null
          device_app_downloaded?: boolean | null
          device_explained?: boolean | null
          device_handed_over?: boolean | null
          device_registered_admin?: boolean | null
          handover_form_signed?: boolean | null
          id?: string
          m2m_sim_assigned?: boolean | null
          m2m_sim_kyc_done?: boolean | null
          m2m_sim_number_added?: boolean | null
          monthly_finance_updated?: boolean | null
          numbers_whitelisted_telephony_portal?: boolean | null
          onboarding_email_sent?: boolean | null
          profile_id: string
          sos_configured_in_app?: boolean | null
          updated_at?: string
        }
        Update: {
          aadhar_back_status?: string | null
          aadhar_front_status?: string | null
          created_at?: string
          device_access_given?: boolean | null
          device_app_downloaded?: boolean | null
          device_explained?: boolean | null
          device_handed_over?: boolean | null
          device_registered_admin?: boolean | null
          handover_form_signed?: boolean | null
          id?: string
          m2m_sim_assigned?: boolean | null
          m2m_sim_kyc_done?: boolean | null
          m2m_sim_number_added?: boolean | null
          monthly_finance_updated?: boolean | null
          numbers_whitelisted_telephony_portal?: boolean | null
          onboarding_email_sent?: boolean | null
          profile_id?: string
          sos_configured_in_app?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_checklist_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_settings: {
        Row: {
          account_id: number
          automation_type: string
          created_at: string
          id: string
          is_enabled: boolean
          settings: Json | null
          updated_at: string
        }
        Insert: {
          account_id: number
          automation_type: string
          created_at?: string
          id?: string
          is_enabled?: boolean
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          account_id?: number
          automation_type?: string
          created_at?: string
          id?: string
          is_enabled?: boolean
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          category: string
          created_at: string | null
          criteria_type: string
          criteria_value: Json | null
          description: string
          icon_url: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          criteria_type: string
          criteria_value?: Json | null
          description: string
          icon_url?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          criteria_type?: string
          criteria_value?: Json | null
          description?: string
          icon_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      button_analytics: {
        Row: {
          account_id: number
          button_name: string
          clicked_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          account_id: number
          button_name: string
          clicked_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          account_id?: number
          button_name?: string
          clicked_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      certificate_rules: {
        Row: {
          certificate_template_url: string | null
          certificate_tier: string
          created_at: string | null
          criteria: Json
          id: string
          is_active: boolean | null
          rule_name: string
          rule_type: string
          updated_at: string | null
        }
        Insert: {
          certificate_template_url?: string | null
          certificate_tier: string
          created_at?: string | null
          criteria: Json
          id?: string
          is_active?: boolean | null
          rule_name: string
          rule_type: string
          updated_at?: string | null
        }
        Update: {
          certificate_template_url?: string | null
          certificate_tier?: string
          created_at?: string | null
          criteria?: Json
          id?: string
          is_active?: boolean | null
          rule_name?: string
          rule_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_url: string | null
          child_profile_id: string
          created_at: string | null
          id: string
          month_year: string
          tier: string
          total_points: number
        }
        Insert: {
          certificate_url?: string | null
          child_profile_id: string
          created_at?: string | null
          id?: string
          month_year: string
          tier: string
          total_points: number
        }
        Update: {
          certificate_url?: string | null
          child_profile_id?: string
          created_at?: string | null
          id?: string
          month_year?: string
          tier?: string
          total_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "certificates_child_profile_id_fkey"
            columns: ["child_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_analytics_targets: {
        Row: {
          created_at: string | null
          id: string
          importance: string
          metric_key: string
          metric_name: string
          target_unit: string
          target_value: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          importance: string
          metric_key: string
          metric_name: string
          target_unit: string
          target_value: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          importance?: string
          metric_key?: string
          metric_name?: string
          target_unit?: string
          target_value?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      cs_cadence_flows: {
        Row: {
          created_at: string | null
          customer_type: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          priority: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_type?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          priority?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_type?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          priority?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cs_cadence_rules: {
        Row: {
          call_script: string | null
          contact_method: string
          created_at: string | null
          created_by: string | null
          customer_type: string
          description: string | null
          email_template: string | null
          fallback_action: string | null
          fallback_after_attempts: number | null
          id: string
          is_active: boolean | null
          last_fallback: string | null
          priority: number | null
          rule_name: string
          trigger_conditions: Json
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          call_script?: string | null
          contact_method: string
          created_at?: string | null
          created_by?: string | null
          customer_type?: string
          description?: string | null
          email_template?: string | null
          fallback_action?: string | null
          fallback_after_attempts?: number | null
          id?: string
          is_active?: boolean | null
          last_fallback?: string | null
          priority?: number | null
          rule_name: string
          trigger_conditions: Json
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          call_script?: string | null
          contact_method?: string
          created_at?: string | null
          created_by?: string | null
          customer_type?: string
          description?: string | null
          email_template?: string | null
          fallback_action?: string | null
          fallback_after_attempts?: number | null
          id?: string
          is_active?: boolean | null
          last_fallback?: string | null
          priority?: number | null
          rule_name?: string
          trigger_conditions?: Json
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cs_cadence_steps: {
        Row: {
          action_template: string | null
          action_type: string
          condition: string | null
          created_at: string | null
          flow_id: string
          id: string
          name: string
          parent_step_id: string | null
          step_order: number
          trigger_type: string
          trigger_unit: string | null
          trigger_value: number | null
        }
        Insert: {
          action_template?: string | null
          action_type: string
          condition?: string | null
          created_at?: string | null
          flow_id: string
          id?: string
          name: string
          parent_step_id?: string | null
          step_order: number
          trigger_type: string
          trigger_unit?: string | null
          trigger_value?: number | null
        }
        Update: {
          action_template?: string | null
          action_type?: string
          condition?: string | null
          created_at?: string | null
          flow_id?: string
          id?: string
          name?: string
          parent_step_id?: string | null
          step_order?: number
          trigger_type?: string
          trigger_unit?: string | null
          trigger_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_cadence_steps_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "cs_cadence_flows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_cadence_steps_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "cs_cadence_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_call_logs: {
        Row: {
          account_id: number
          call_datetime: string | null
          call_duration_seconds: number | null
          call_status: string
          call_type: string
          created_at: string | null
          id: string
          logged_by: string | null
          logged_by_email: string | null
          next_action_date: string | null
          next_steps: string | null
          notes: string | null
          profile_id: string | null
        }
        Insert: {
          account_id: number
          call_datetime?: string | null
          call_duration_seconds?: number | null
          call_status: string
          call_type: string
          created_at?: string | null
          id?: string
          logged_by?: string | null
          logged_by_email?: string | null
          next_action_date?: string | null
          next_steps?: string | null
          notes?: string | null
          profile_id?: string | null
        }
        Update: {
          account_id?: number
          call_datetime?: string | null
          call_duration_seconds?: number | null
          call_status?: string
          call_type?: string
          created_at?: string | null
          id?: string
          logged_by?: string | null
          logged_by_email?: string | null
          next_action_date?: string | null
          next_steps?: string | null
          notes?: string | null
          profile_id?: string | null
        }
        Relationships: []
      }
      cs_step_executions: {
        Row: {
          account_id: number
          executed_at: string | null
          id: string
          outcome: string | null
          step_id: string
          task_id: string | null
        }
        Insert: {
          account_id: number
          executed_at?: string | null
          id?: string
          outcome?: string | null
          step_id: string
          task_id?: string | null
        }
        Update: {
          account_id?: number
          executed_at?: string | null
          id?: string
          outcome?: string | null
          step_id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_step_executions_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "cs_cadence_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_step_executions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "cs_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_task_history: {
        Row: {
          change_type: string
          changed_by_email: string | null
          created_at: string | null
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
          task_id: string
        }
        Insert: {
          change_type: string
          changed_by_email?: string | null
          created_at?: string | null
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_id: string
        }
        Update: {
          change_type?: string
          changed_by_email?: string | null
          created_at?: string | null
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cs_task_history_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "cs_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      cs_tasks: {
        Row: {
          account_id: number
          assigned_to: string | null
          attempt_count: number | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          profile_id: string | null
          remarks: string | null
          rule_id: string | null
          status: string | null
          step_id: string | null
          task_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          account_id: number
          assigned_to?: string | null
          attempt_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          profile_id?: string | null
          remarks?: string | null
          rule_id?: string | null
          status?: string | null
          step_id?: string | null
          task_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          assigned_to?: string | null
          attempt_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          profile_id?: string | null
          remarks?: string | null
          rule_id?: string | null
          status?: string | null
          step_id?: string | null
          task_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cs_tasks_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "cs_cadence_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cs_tasks_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "cs_cadence_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          cc_recipients: string[] | null
          created_at: string
          email_type: string
          error_message: string | null
          id: string
          profile_id: string | null
          recipient_email: string
          sent_at: string
          status: string
          subject: string
        }
        Insert: {
          cc_recipients?: string[] | null
          created_at?: string
          email_type: string
          error_message?: string | null
          id?: string
          profile_id?: string | null
          recipient_email: string
          sent_at?: string
          status?: string
          subject: string
        }
        Update: {
          cc_recipients?: string[] | null
          created_at?: string
          email_type?: string
          error_message?: string | null
          id?: string
          profile_id?: string | null
          recipient_email?: string
          sent_at?: string
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expo_push_tokens: {
        Row: {
          created_at: string
          id: number
          is_active: boolean | null
          platform: Database["public"]["Enums"]["push_token_platform"] | null
          project_id: string | null
          push_token: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_active?: boolean | null
          platform?: Database["public"]["Enums"]["push_token_platform"] | null
          project_id?: string | null
          push_token?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_active?: boolean | null
          platform?: Database["public"]["Enums"]["push_token_platform"] | null
          project_id?: string | null
          push_token?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      families: {
        Row: {
          created_at: string
          created_by: string | null
          family_code: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          family_code?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          family_code?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      family_invitations: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          family_id: string
          id: string
          invited_by: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          family_id: string
          id?: string
          invited_by: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          family_id?: string
          id?: string
          invited_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_invitations_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      family_join_requests: {
        Row: {
          created_at: string
          family_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          family_id: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          family_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_join_requests_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      family_member_permissions: {
        Row: {
          can_delete: boolean
          can_edit: boolean
          can_view: boolean
          family_member_id: string
          id: string
          resource_type: Database["public"]["Enums"]["permission_resource"]
        }
        Insert: {
          can_delete?: boolean
          can_edit?: boolean
          can_view?: boolean
          family_member_id: string
          id?: string
          resource_type: Database["public"]["Enums"]["permission_resource"]
        }
        Update: {
          can_delete?: boolean
          can_edit?: boolean
          can_view?: boolean
          family_member_id?: string
          id?: string
          resource_type?: Database["public"]["Enums"]["permission_resource"]
        }
        Relationships: [
          {
            foreignKeyName: "family_member_permissions_family_member_id_fkey"
            columns: ["family_member_id"]
            isOneToOne: false
            referencedRelation: "family_members"
            referencedColumns: ["id"]
          },
        ]
      }
      family_members: {
        Row: {
          family_id: string
          id: string
          invited_by: string | null
          joined_at: string
          role: Database["public"]["Enums"]["family_role"]
          user_id: string
        }
        Insert: {
          family_id: string
          id?: string
          invited_by?: string | null
          joined_at?: string
          role?: Database["public"]["Enums"]["family_role"]
          user_id: string
        }
        Update: {
          family_id?: string
          id?: string
          invited_by?: string | null
          joined_at?: string
          role?: Database["public"]["Enums"]["family_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      family_messages: {
        Row: {
          account_id: number
          attachment_name: string | null
          attachment_type: string | null
          attachment_url: string | null
          created_at: string
          id: string
          is_deleted: boolean | null
          message: string
          sender_id: string
          sender_name: string
        }
        Insert: {
          account_id: number
          attachment_name?: string | null
          attachment_type?: string | null
          attachment_url?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          message: string
          sender_id: string
          sender_name: string
        }
        Update: {
          account_id?: number
          attachment_name?: string | null
          attachment_type?: string | null
          attachment_url?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          message?: string
          sender_id?: string
          sender_name?: string
        }
        Relationships: []
      }
      feature_request_comments: {
        Row: {
          comment: string
          created_at: string
          feature_request_id: string
          id: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          feature_request_id: string
          id?: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          feature_request_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_request_comments_feature_request_id_fkey"
            columns: ["feature_request_id"]
            isOneToOne: false
            referencedRelation: "feature_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_request_updates: {
        Row: {
          created_at: string
          created_by: string
          feature_request_id: string
          id: string
          update_text: string
        }
        Insert: {
          created_at?: string
          created_by: string
          feature_request_id: string
          id?: string
          update_text: string
        }
        Update: {
          created_at?: string
          created_by?: string
          feature_request_id?: string
          id?: string
          update_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_request_updates_feature_request_id_fkey"
            columns: ["feature_request_id"]
            isOneToOne: false
            referencedRelation: "feature_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_request_upvotes: {
        Row: {
          created_at: string
          feature_request_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feature_request_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          feature_request_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_request_upvotes_feature_request_id_fkey"
            columns: ["feature_request_id"]
            isOneToOne: false
            referencedRelation: "feature_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_requests: {
        Row: {
          created_at: string
          created_by: string
          description: string
          id: string
          merged_into: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          id?: string
          merged_into?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          merged_into?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_requests_merged_into_fkey"
            columns: ["merged_into"]
            isOneToOne: false
            referencedRelation: "feature_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          account_id: number
          created_at: string
          feedback_month: string
          id: string
          rating: number
        }
        Insert: {
          account_id: number
          created_at?: string
          feedback_month: string
          id?: string
          rating: number
        }
        Update: {
          account_id?: number
          created_at?: string
          feedback_month?: string
          id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "feedback_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_id"]
          },
        ]
      }
      feedback_snooze: {
        Row: {
          account_id: number
          created_at: string
          feedback_month: string
          id: string
          snoozed_until: string
        }
        Insert: {
          account_id: number
          created_at?: string
          feedback_month: string
          id?: string
          snoozed_until: string
        }
        Update: {
          account_id?: number
          created_at?: string
          feedback_month?: string
          id?: string
          snoozed_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_snooze_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_id"]
          },
        ]
      }
      finance_attachments: {
        Row: {
          file_name: string
          file_path: string
          file_type: string | null
          id: string
          monthly_finance_id: string
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          file_name: string
          file_path: string
          file_type?: string | null
          id?: string
          monthly_finance_id: string
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          file_name?: string
          file_path?: string
          file_type?: string | null
          id?: string
          monthly_finance_id?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "finance_attachments_monthly_finance_id_fkey"
            columns: ["monthly_finance_id"]
            isOneToOne: false
            referencedRelation: "monthly_finances"
            referencedColumns: ["id"]
          },
        ]
      }
      identity_documents: {
        Row: {
          created_at: string
          document_number: string | null
          document_type: string
          expiry_date: string | null
          file_url: string | null
          id: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          document_number?: string | null
          document_type: string
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          document_number?: string | null
          document_type?: string
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "identity_documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      incomplete_payments: {
        Row: {
          created_at: string
          expected_due_date: string | null
          id: string
          is_resolved: boolean | null
          month_year: string
          owner: string | null
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expected_due_date?: string | null
          id?: string
          is_resolved?: boolean | null
          month_year: string
          owner?: string | null
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expected_due_date?: string | null
          id?: string
          is_resolved?: boolean | null
          month_year?: string
          owner?: string | null
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "incomplete_payments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard: {
        Row: {
          child_profile_id: string
          id: string
          month_year: string
          rank: number | null
          total_points: number | null
          updated_at: string | null
        }
        Insert: {
          child_profile_id: string
          id?: string
          month_year: string
          rank?: number | null
          total_points?: number | null
          updated_at?: string | null
        }
        Update: {
          child_profile_id?: string
          id?: string
          month_year?: string
          rank?: number | null
          total_points?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_child_profile_id_fkey"
            columns: ["child_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_read_status: {
        Row: {
          account_id: number
          created_at: string
          id: string
          last_read_at: string
          user_id: string
        }
        Insert: {
          account_id: number
          created_at?: string
          id?: string
          last_read_at?: string
          user_id: string
        }
        Update: {
          account_id?: number
          created_at?: string
          id?: string
          last_read_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mission_submissions: {
        Row: {
          ai_verification_details: Json | null
          ai_verified: boolean | null
          child_profile_id: string
          content_url: string | null
          created_at: string | null
          id: string
          is_approved_for_wall: boolean | null
          mission_id: string
          points_earned: number | null
          quiz_answers: Json | null
          submission_type: string
          submitted_at: string | null
          text_content: string | null
        }
        Insert: {
          ai_verification_details?: Json | null
          ai_verified?: boolean | null
          child_profile_id: string
          content_url?: string | null
          created_at?: string | null
          id?: string
          is_approved_for_wall?: boolean | null
          mission_id: string
          points_earned?: number | null
          quiz_answers?: Json | null
          submission_type: string
          submitted_at?: string | null
          text_content?: string | null
        }
        Update: {
          ai_verification_details?: Json | null
          ai_verified?: boolean | null
          child_profile_id?: string
          content_url?: string | null
          created_at?: string | null
          id?: string
          is_approved_for_wall?: boolean | null
          mission_id?: string
          points_earned?: number | null
          quiz_answers?: Json | null
          submission_type?: string
          submitted_at?: string | null
          text_content?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mission_submissions_child_profile_id_fkey"
            columns: ["child_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_submissions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          ai_scoring_criteria: string | null
          award_badge: boolean | null
          badge_criteria_min_points: number | null
          badge_description: string | null
          badge_icon_url: string | null
          badge_name: string | null
          created_at: string | null
          description: string
          end_date: string
          icon_url: string | null
          id: string
          is_archived: boolean | null
          is_published: boolean | null
          mission_type: string
          points: number
          quiz_json: Json | null
          start_date: string
          title: string
          updated_at: string | null
          week_number: number
        }
        Insert: {
          ai_scoring_criteria?: string | null
          award_badge?: boolean | null
          badge_criteria_min_points?: number | null
          badge_description?: string | null
          badge_icon_url?: string | null
          badge_name?: string | null
          created_at?: string | null
          description: string
          end_date: string
          icon_url?: string | null
          id?: string
          is_archived?: boolean | null
          is_published?: boolean | null
          mission_type: string
          points?: number
          quiz_json?: Json | null
          start_date: string
          title: string
          updated_at?: string | null
          week_number: number
        }
        Update: {
          ai_scoring_criteria?: string | null
          award_badge?: boolean | null
          badge_criteria_min_points?: number | null
          badge_description?: string | null
          badge_icon_url?: string | null
          badge_name?: string | null
          created_at?: string | null
          description?: string
          end_date?: string
          icon_url?: string | null
          id?: string
          is_archived?: boolean | null
          is_published?: boolean | null
          mission_type?: string
          points?: number
          quiz_json?: Json | null
          start_date?: string
          title?: string
          updated_at?: string | null
          week_number?: number
        }
        Relationships: []
      }
      monthly_finances: {
        Row: {
          created_at: string
          id: string
          invoice_number: string | null
          month_year: string
          notes: string | null
          payment_collected: number | null
          profile_id: string
          razorpay_reference: string | null
          realized_revenue: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          invoice_number?: string | null
          month_year: string
          notes?: string | null
          payment_collected?: number | null
          profile_id: string
          razorpay_reference?: string | null
          realized_revenue?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          invoice_number?: string | null
          month_year?: string
          notes?: string | null
          payment_collected?: number | null
          profile_id?: string
          razorpay_reference?: string | null
          realized_revenue?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "monthly_finances_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          read_at: string | null
          reference_id: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          read_at?: string | null
          reference_id?: string | null
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          read_at?: string | null
          reference_id?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_plan_settings: {
        Row: {
          id: string
          is_active: boolean | null
          payment_url: string
          plan_description: string | null
          plan_key: string
          plan_name: string
          plan_price: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          payment_url: string
          plan_description?: string | null
          plan_key: string
          plan_name: string
          plan_price: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          is_active?: boolean | null
          payment_url?: string
          plan_description?: string | null
          plan_key?: string
          plan_name?: string
          plan_price?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          due_date: string | null
          id: string
          payment_date: string | null
          payment_type: string
          profile_id: string
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          due_date?: string | null
          id?: string
          payment_date?: string | null
          payment_type: string
          profile_id: string
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string | null
          id?: string
          payment_date?: string | null
          payment_type?: string
          profile_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_mission_emails: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          email_queue_position: number | null
          email_type: string
          html_content: string
          id: string
          profile_id: string | null
          recipient_email: string
          recipient_name: string
          scheduled_time: string
          sent_at: string | null
          status: string
          subject: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          email_queue_position?: number | null
          email_type: string
          html_content: string
          id?: string
          profile_id?: string | null
          recipient_email: string
          recipient_name: string
          scheduled_time: string
          sent_at?: string | null
          status?: string
          subject: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          email_queue_position?: number | null
          email_type?: string
          html_content?: string
          id?: string
          profile_id?: string | null
          recipient_email?: string
          recipient_name?: string
          scheduled_time?: string
          sent_at?: string | null
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_mission_emails_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_attachments: {
        Row: {
          category: string
          date_of_issue: string | null
          description: string | null
          doctor_clinic_name: string | null
          expiry_date: string | null
          file_name: string
          file_path: string
          file_type: string | null
          id: string
          notes: string | null
          profile_id: string
          uploaded_at: string | null
          uploaded_by: string | null
          visibility: string
        }
        Insert: {
          category?: string
          date_of_issue?: string | null
          description?: string | null
          doctor_clinic_name?: string | null
          expiry_date?: string | null
          file_name: string
          file_path: string
          file_type?: string | null
          id?: string
          notes?: string | null
          profile_id: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          visibility?: string
        }
        Update: {
          category?: string
          date_of_issue?: string | null
          description?: string | null
          doctor_clinic_name?: string | null
          expiry_date?: string | null
          file_name?: string
          file_path?: string
          file_type?: string | null
          id?: string
          notes?: string | null
          profile_id?: string
          uploaded_at?: string | null
          uploaded_by?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_attachments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_audit_log: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          changed_by_name: string | null
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
          profile_id: string
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          changed_by_name?: string | null
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          profile_id: string
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          changed_by_name?: string | null
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_audit_log_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_families: {
        Row: {
          family_id: string
          id: string
          linked_at: string | null
          linked_by: string | null
          profile_id: string
          visibility_settings: Json | null
        }
        Insert: {
          family_id: string
          id?: string
          linked_at?: string | null
          linked_by?: string | null
          profile_id: string
          visibility_settings?: Json | null
        }
        Update: {
          family_id?: string
          id?: string
          linked_at?: string | null
          linked_by?: string | null
          profile_id?: string
          visibility_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_families_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_families_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_merge_requests: {
        Row: {
          conflicts: Json | null
          created_at: string | null
          family_id: string
          id: string
          requested_by: string | null
          resolution_data: Json | null
          resolved_at: string | null
          source_profile_id: string
          status: string | null
          target_profile_id: string
        }
        Insert: {
          conflicts?: Json | null
          created_at?: string | null
          family_id: string
          id?: string
          requested_by?: string | null
          resolution_data?: Json | null
          resolved_at?: string | null
          source_profile_id: string
          status?: string | null
          target_profile_id: string
        }
        Update: {
          conflicts?: Json | null
          created_at?: string | null
          family_id?: string
          id?: string
          requested_by?: string | null
          resolution_data?: Json | null
          resolved_at?: string | null
          source_profile_id?: string
          status?: string | null
          target_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_merge_requests_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_merge_requests_source_profile_id_fkey"
            columns: ["source_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_merge_requests_target_profile_id_fkey"
            columns: ["target_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          aadhar_back_url: string | null
          aadhar_front_url: string | null
          account_holder_name: string | null
          account_id: number | null
          account_last4_digits: string | null
          address: string | null
          admin_watch_photo_path: string | null
          allergies: string | null
          anniversary: string | null
          bank_accounts: Json | null
          bank_name: string | null
          billing_start_date: string | null
          blood_donation_notes: string | null
          blood_group: string | null
          created_at: string
          created_by: string | null
          current_medication_list: string | null
          current_medications: string | null
          current_residential_address: string | null
          date_of_birth: string | null
          device_imei: string | null
          device_reg_code: string | null
          disability_mobility_info: string | null
          doctor_phone_number: string | null
          email: string | null
          emergency_contact: string | null
          first_sos_number: string | null
          food_preferences: string | null
          full_name: string | null
          gender: string | null
          handover_date: string | null
          height: number | null
          hobbies: string | null
          id: string
          ifsc_code: string | null
          insurance_provider: string | null
          internal_notes: string | null
          is_active: boolean
          known_medical_conditions: string | null
          languages_spoken: string | null
          lifestyle_notes: string | null
          m2m_sim_number: string | null
          major_surgeries: string | null
          marital_status: string | null
          nominee_name: string | null
          notes: string | null
          occupation: string | null
          organization: string | null
          payment_reference_number: string | null
          payment_status: string | null
          payment_type: string | null
          permanent_address: string | null
          policy_number: string | null
          preferred_hospital: string | null
          primary_contact: string | null
          primary_doctor: string | null
          primary_doctor_name: string | null
          profile_code: string | null
          profile_photo_url: string | null
          promo_code: string | null
          razorpay_link: string | null
          relationship: string | null
          second_sos_number: string | null
          secondary_contact: string | null
          secondary_emergency_contact_name: string | null
          secondary_emergency_contact_phone: string | null
          secondary_emergency_contact_relationship: string | null
          security_amount: number | null
          status: string | null
          terms_accepted: boolean | null
          third_whitelist_number: string | null
          updated_at: string
          user_id: string
          watch_holder_age: number | null
          watch_holder_name: string | null
          weight: number | null
          welcome_email_sent: boolean | null
          whatsapp_number: string | null
        }
        Insert: {
          aadhar_back_url?: string | null
          aadhar_front_url?: string | null
          account_holder_name?: string | null
          account_id?: number | null
          account_last4_digits?: string | null
          address?: string | null
          admin_watch_photo_path?: string | null
          allergies?: string | null
          anniversary?: string | null
          bank_accounts?: Json | null
          bank_name?: string | null
          billing_start_date?: string | null
          blood_donation_notes?: string | null
          blood_group?: string | null
          created_at?: string
          created_by?: string | null
          current_medication_list?: string | null
          current_medications?: string | null
          current_residential_address?: string | null
          date_of_birth?: string | null
          device_imei?: string | null
          device_reg_code?: string | null
          disability_mobility_info?: string | null
          doctor_phone_number?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_sos_number?: string | null
          food_preferences?: string | null
          full_name?: string | null
          gender?: string | null
          handover_date?: string | null
          height?: number | null
          hobbies?: string | null
          id?: string
          ifsc_code?: string | null
          insurance_provider?: string | null
          internal_notes?: string | null
          is_active?: boolean
          known_medical_conditions?: string | null
          languages_spoken?: string | null
          lifestyle_notes?: string | null
          m2m_sim_number?: string | null
          major_surgeries?: string | null
          marital_status?: string | null
          nominee_name?: string | null
          notes?: string | null
          occupation?: string | null
          organization?: string | null
          payment_reference_number?: string | null
          payment_status?: string | null
          payment_type?: string | null
          permanent_address?: string | null
          policy_number?: string | null
          preferred_hospital?: string | null
          primary_contact?: string | null
          primary_doctor?: string | null
          primary_doctor_name?: string | null
          profile_code?: string | null
          profile_photo_url?: string | null
          promo_code?: string | null
          razorpay_link?: string | null
          relationship?: string | null
          second_sos_number?: string | null
          secondary_contact?: string | null
          secondary_emergency_contact_name?: string | null
          secondary_emergency_contact_phone?: string | null
          secondary_emergency_contact_relationship?: string | null
          security_amount?: number | null
          status?: string | null
          terms_accepted?: boolean | null
          third_whitelist_number?: string | null
          updated_at?: string
          user_id: string
          watch_holder_age?: number | null
          watch_holder_name?: string | null
          weight?: number | null
          welcome_email_sent?: boolean | null
          whatsapp_number?: string | null
        }
        Update: {
          aadhar_back_url?: string | null
          aadhar_front_url?: string | null
          account_holder_name?: string | null
          account_id?: number | null
          account_last4_digits?: string | null
          address?: string | null
          admin_watch_photo_path?: string | null
          allergies?: string | null
          anniversary?: string | null
          bank_accounts?: Json | null
          bank_name?: string | null
          billing_start_date?: string | null
          blood_donation_notes?: string | null
          blood_group?: string | null
          created_at?: string
          created_by?: string | null
          current_medication_list?: string | null
          current_medications?: string | null
          current_residential_address?: string | null
          date_of_birth?: string | null
          device_imei?: string | null
          device_reg_code?: string | null
          disability_mobility_info?: string | null
          doctor_phone_number?: string | null
          email?: string | null
          emergency_contact?: string | null
          first_sos_number?: string | null
          food_preferences?: string | null
          full_name?: string | null
          gender?: string | null
          handover_date?: string | null
          height?: number | null
          hobbies?: string | null
          id?: string
          ifsc_code?: string | null
          insurance_provider?: string | null
          internal_notes?: string | null
          is_active?: boolean
          known_medical_conditions?: string | null
          languages_spoken?: string | null
          lifestyle_notes?: string | null
          m2m_sim_number?: string | null
          major_surgeries?: string | null
          marital_status?: string | null
          nominee_name?: string | null
          notes?: string | null
          occupation?: string | null
          organization?: string | null
          payment_reference_number?: string | null
          payment_status?: string | null
          payment_type?: string | null
          permanent_address?: string | null
          policy_number?: string | null
          preferred_hospital?: string | null
          primary_contact?: string | null
          primary_doctor?: string | null
          primary_doctor_name?: string | null
          profile_code?: string | null
          profile_photo_url?: string | null
          promo_code?: string | null
          razorpay_link?: string | null
          relationship?: string | null
          second_sos_number?: string | null
          secondary_contact?: string | null
          secondary_emergency_contact_name?: string | null
          secondary_emergency_contact_phone?: string | null
          secondary_emergency_contact_relationship?: string | null
          security_amount?: number | null
          status?: string | null
          terms_accepted?: boolean | null
          third_whitelist_number?: string | null
          updated_at?: string
          user_id?: string
          watch_holder_age?: number | null
          watch_holder_name?: string | null
          weight?: number | null
          welcome_email_sent?: boolean | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          referral_code: string
          referred_family_account_id: number | null
          referring_child_id: string
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code: string
          referred_family_account_id?: number | null
          referring_child_id: string
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_family_account_id?: number | null
          referring_child_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_family_account_id_fkey"
            columns: ["referred_family_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "referrals_referring_child_id_fkey"
            columns: ["referring_child_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_missions_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          created_at: string
          description: string
          id: string
          profile_id: string | null
          status: string | null
          ticket_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          description: string
          id?: string
          profile_id?: string | null
          status?: string | null
          ticket_type?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          description?: string
          id?: string
          profile_id?: string | null
          status?: string | null
          ticket_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_history: {
        Row: {
          change_type: string
          changed_at: string
          changed_by: string | null
          changed_by_email: string | null
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
          task_id: string
        }
        Insert: {
          change_type: string
          changed_at?: string
          changed_by?: string | null
          changed_by_email?: string | null
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_id: string
        }
        Update: {
          change_type?: string
          changed_at?: string
          changed_by?: string | null
          changed_by_email?: string | null
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_history_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          closed_at: string | null
          created_at: string
          description: string | null
          expected_closure_date: string | null
          id: string
          notes: string | null
          reference_id: string | null
          status: Database["public"]["Enums"]["task_status"]
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          closed_at?: string | null
          created_at?: string
          description?: string | null
          expected_closure_date?: string | null
          id?: string
          notes?: string | null
          reference_id?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          closed_at?: string | null
          created_at?: string
          description?: string | null
          expected_closure_date?: string | null
          id?: string
          notes?: string | null
          reference_id?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task_type?: Database["public"]["Enums"]["task_type"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ticket_responses: {
        Row: {
          created_at: string
          created_by: string
          created_by_email: string
          id: string
          is_admin: boolean
          response_text: string
          ticket_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          created_by_email: string
          id?: string
          is_admin?: boolean
          response_text: string
          ticket_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          created_by_email?: string
          id?: string
          is_admin?: boolean
          response_text?: string
          ticket_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_responses_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      todo_items: {
        Row: {
          assigned_to: string | null
          content: string
          created_at: string
          due_date: string | null
          id: string
          is_completed: boolean | null
          item_order: number
          list_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          content: string
          created_at?: string
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          item_order?: number
          list_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          content?: string
          created_at?: string
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          item_order?: number
          list_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "todo_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "todo_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      todo_list_shares: {
        Row: {
          created_at: string
          id: string
          list_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          list_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          list_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todo_list_shares_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "todo_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      todo_lists: {
        Row: {
          account_id: number
          archived_at: string | null
          created_at: string
          created_by: string
          id: string
          is_archived: boolean
          is_minimized: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          account_id: number
          archived_at?: string | null
          created_at?: string
          created_by: string
          id?: string
          is_archived?: boolean
          is_minimized?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          account_id?: number
          archived_at?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_archived?: boolean
          is_minimized?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_materials: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          media_type: string | null
          media_url: string | null
          parent_section_id: string | null
          section_order: number
          section_type: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          media_type?: string | null
          media_url?: string | null
          parent_section_id?: string | null
          section_order?: number
          section_type?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          media_type?: string | null
          media_url?: string | null
          parent_section_id?: string | null
          section_order?: number
          section_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_materials_parent_section_id_fkey"
            columns: ["parent_section_id"]
            isOneToOne: false
            referencedRelation: "training_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          child_profile_id: string
          earned_at: string | null
          id: string
        }
        Insert: {
          badge_id: string
          child_profile_id: string
          earned_at?: string | null
          id?: string
        }
        Update: {
          badge_id?: string
          child_profile_id?: string
          earned_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_child_profile_id_fkey"
            columns: ["child_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_todo_list: {
        Args: { _list_id: string; _user_id: string }
        Returns: boolean
      }
      create_todo_list: {
        Args: { _title: string }
        Returns: {
          account_id: number
          archived_at: string | null
          created_at: string
          created_by: string
          id: string
          is_archived: boolean
          is_minimized: boolean | null
          title: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "todo_lists"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_accessible_list_ids: { Args: { _user_id: string }; Returns: string[] }
      get_profile_email_logs: {
        Args: { profile_uuid: string }
        Returns: {
          email_type: string
          error_message: string
          id: string
          sent_at: string
          status: string
        }[]
      }
      get_public_tables: {
        Args: never
        Returns: {
          table_name: string
        }[]
      }
      get_user_account_id: { Args: { _user_id: string }; Returns: number }
      has_family_permission: {
        Args: {
          _family_id: string
          _permission_type: string
          _resource: Database["public"]["Enums"]["permission_resource"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_user: { Args: never; Returns: boolean }
      is_family_admin: {
        Args: { _family_id: string; _user_id: string }
        Returns: boolean
      }
      is_list_creator: {
        Args: { _list_id: string; _user_id: string }
        Returns: boolean
      }
      is_member_of_family: {
        Args: { _family_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      family_role: "owner" | "admin" | "member"
      permission_resource:
        | "profiles"
        | "chat"
        | "todos"
        | "documents"
        | "financials"
        | "support"
        | "settings"
        | "concierge"
        | "second_opinion"
        | "quickcheck"
      push_token_platform: "android" | "ios"
      task_status: "open" | "wip" | "blocked" | "closed"
      task_type:
        | "incomplete_payment"
        | "incomplete_profile"
        | "support_ticket"
        | "low_feedback"
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
      family_role: ["owner", "admin", "member"],
      permission_resource: [
        "profiles",
        "chat",
        "todos",
        "documents",
        "financials",
        "support",
        "settings",
        "concierge",
        "second_opinion",
        "quickcheck",
      ],
      push_token_platform: ["android", "ios"],
      task_status: ["open", "wip", "blocked", "closed"],
      task_type: [
        "incomplete_payment",
        "incomplete_profile",
        "support_ticket",
        "low_feedback",
      ],
    },
  },
} as const
