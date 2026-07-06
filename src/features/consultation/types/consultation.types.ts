export type ConsultationRequestType =
  "ADMISSION_CONSULTING" | "CAMPUS_VISIT" | "RECEIVE_MATERIALS" | "APPLICATION_REGISTRATION";

export interface ConsultationFormPayload {
  full_name: string;
  phone: string;
  email: string;
  interested_major: string;
  request_type: ConsultationRequestType;
  message?: string;
  consent_given: boolean;
  website?: string;
}

export interface ConsultationCreatedResponse {
  id: string;
  reference_code: string;
  status: "NEW";
  created_at: string;
  message: string;
}
