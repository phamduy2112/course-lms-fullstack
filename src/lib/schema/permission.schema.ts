import { z } from "zod";

export const permissionTabs = ["course", "user", "finance", "cms"] as const;
export type PermissionTab = (typeof permissionTabs)[number];

export const permissionsSchema = z.object({
  roleId: z.string().min(1),
  tab: z.enum(permissionTabs),
  permissions: z.record(z.string(), z.boolean()),
});

export type PermissionsFormValues = z.infer<typeof permissionsSchema>;