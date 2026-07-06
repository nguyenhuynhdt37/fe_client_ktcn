import { axiosClient } from "@/shared/api/axios-client";
import type {
  ConsultationCreatedResponse,
  ConsultationFormPayload,
} from "../types/consultation.types";

export const consultationService = {
  async create(payload: ConsultationFormPayload): Promise<ConsultationCreatedResponse> {
    const response = await axiosClient.post<ConsultationCreatedResponse>(
      "/api/v1/portal/consultations",
      payload,
    );
    return response.data;
  },
};
