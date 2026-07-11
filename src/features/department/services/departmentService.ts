import { httpClient } from "@/shared/api/httpClient";
import type { DepartmentOverview, PortalDepartment } from "../types/department.types";

export const departmentService = {
  getOverview(slug: string): Promise<DepartmentOverview | null> {
    return httpClient.get<DepartmentOverview>(`/api/v1/portal/departments/${slug}/overview`, {
      revalidate: 300,
      tags: [`department-${slug}`],
    });
  },

  getDepartment(slug: string): Promise<PortalDepartment | null> {
    return httpClient.get<PortalDepartment>(`/api/v1/portal/departments/${slug}`, {
      revalidate: 300,
      tags: [`department-${slug}`],
    });
  },
};
