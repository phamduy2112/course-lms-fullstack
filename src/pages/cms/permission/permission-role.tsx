import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { permissionsSchema, permissionTabs, type PermissionsFormValues, type PermissionTab } from "@/lib/schema/permission.schema";



type Role = {
  id: string;
  name: string;
  description: string;
  userCount: number;
};

type PermissionItem = {
  key: string;
  label: string;
  group: string; // ví dụ: "Course Content & Curriculum"
  tab: PermissionTab;
  disabled?: boolean;
};

const roles: Role[] = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Full system access and authority. Can manage all roles and system settings.",
    userCount: 3,
  },
  {
    id: "course_creator",
    name: "Course Creator",
    description: "Manage curriculum, lesson content, and student quizzes across all tracks.",
    userCount: 12,
  },
];

const allPermissions: PermissionItem[] = [
  { key: "course.create", label: "Create New Courses", group: "Course Content & Curriculum", tab: "course" },
  { key: "lesson.edit", label: "Edit Existing Lessons", group: "Course Content & Curriculum", tab: "course" },
  { key: "module.delete", label: "Delete Course Modules", group: "Course Content & Curriculum", tab: "course" },

  { key: "quiz.modify", label: "Modify Quiz Parameters", group: "Quizzes & Assessments", tab: "course" },
  { key: "quiz.override_grade", label: "Override Student Grades", group: "Quizzes & Assessments", tab: "course" },

  { key: "finance.view", label: "View Revenue Analytics", group: "Financial Operations", tab: "finance" },
  { key: "finance.refund", label: "Issue Refunds", group: "Financial Operations", tab: "finance", disabled: true },
];

// giả lập data từ server theo roleId
function getRolePermissionMap(roleId: string): Record<string, boolean> {
  if (roleId === "super_admin") {
    return Object.fromEntries(allPermissions.map((p) => [p.key, true]));
  }
  if (roleId === "course_creator") {
    return {
      "course.create": true,
      "lesson.edit": true,
      "module.delete": false,
      "quiz.modify": true,
      "quiz.override_grade": false,
      "finance.view": false,
      "finance.refund": false,
    };
  }
  return Object.fromEntries(allPermissions.map((p) => [p.key, false]));
}

export default function RolesPermissionsPage() {
  const [activeRoleId, setActiveRoleId] = useState<string>(roles[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState<PermissionTab>("course");

  const defaultPermissions = useMemo(() => getRolePermissionMap(activeRoleId), [activeRoleId]);

  const form = useForm<PermissionsFormValues>({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      roleId: activeRoleId,
      tab: activeTab,
      permissions: defaultPermissions,
    },
  });

  // khi đổi role => reset form theo role mới
  const handleSelectRole = (roleId: string) => {
    setActiveRoleId(roleId);
    const next = getRolePermissionMap(roleId);
    form.reset({
      roleId,
      tab: activeTab,
      permissions: next,
    });
  };

  const onSubmit = (values: PermissionsFormValues) => {
    // call API: PATCH /roles/:id/permissions
    console.log("SAVE", values.roleId, values.permissions);
  };

  const role = roles.find((r) => r.id === activeRoleId);

  const permissionsInTab = allPermissions.filter((p) => p.tab === activeTab);

  // group theo "group"
  const grouped = useMemo(() => {
    const m = new Map<string, PermissionItem[]>();
    for (const p of permissionsInTab) {
      m.set(p.group, [...(m.get(p.group) ?? []), p]);
    }
    return Array.from(m.entries());
  }, [permissionsInTab]);

  return (
    <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-background-dark relative">
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-white text-4xl font-black tracking-tight mb-2">Roles &amp; Permissions</h2>
            <p className="text-[#909acb] text-base">
              Configure system-wide access levels and granular module permissions.
            </p>
          </div>

          <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-sm">add</span>
            Create New Role
          </button>
        </div>
      </div>

      {/* Two columns */}
      <div className="flex-1 px-8 pb-8 flex gap-6 overflow-hidden">
        {/* Left: roles list */}
        <div className="w-1/3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          {roles.map((r) => {
            const active = r.id === activeRoleId;
            return (
              <div
                key={r.id}
                onClick={() => handleSelectRole(r.id)}
                className={
                  active
                    ? "bg-primary/10 border-2 border-primary rounded-xl p-5 relative cursor-pointer group"
                    : "glass hover:bg-[#1f2647] border-[#313a68] rounded-xl p-5 cursor-pointer transition-colors group"
                }
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold text-lg">{r.name}</h3>
                  <span className={active ? "material-symbols-outlined text-primary" : "material-symbols-outlined text-[#313a68] group-hover:text-[#909acb]"}>
                    {active ? "check_circle" : "radio_button_unchecked"}
                  </span>
                </div>
                <p className="text-[#909acb] text-sm leading-relaxed">{r.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] bg-[#222949] text-white px-2 py-0.5 rounded uppercase font-bold">
                    {r.userCount} Users
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: permission matrix */}
        <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            {/* Header + Tabs */}
            <div className="p-6 border-b border-[#313a68]">
              <h3 className="text-xl font-bold text-white mb-6">
                Permission Matrix: <span className="text-primary">{role?.name ?? "-"}</span>
              </h3>

              <Tabs
                value={activeTab}
                onValueChange={(v) => {
                  const tab = v as PermissionTab;
                  setActiveTab(tab);
                  form.setValue("tab", tab, { shouldDirty: false });
                }}
              >
                <TabsList className="bg-transparent border-b border-[#313a68] rounded-none p-0 h-auto gap-8">
                  {permissionTabs.map((t) => (
                    <TabsTrigger
                      key={t}
                      value={t}
                      className="rounded-none px-0 pb-3 pt-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white text-[#909acb] font-bold text-sm"
                    >
                      {tabLabel(t)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  <TabsContent value={activeTab} className="m-0">
                    <div className="space-y-8">
                      {grouped.map(([groupName, items]) => (
                        <div key={groupName}>
                          <h4 className="text-xs uppercase tracking-widest text-[#909acb] font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">{groupIcon(groupName)}</span>
                            {groupName}
                          </h4>

                          <div className="grid grid-cols-1 gap-3">
                            {items.map((p) => (
                              <div
                                key={p.key}
                                className="flex items-center justify-between p-3 rounded-lg bg-[#181d34] border border-[#313a68]"
                              >
                                <span className={p.disabled ? "text-sm font-medium text-[#909acb]" : "text-sm font-medium text-white"}>
                                  {p.label}
                                </span>

                                <Controller
                                  control={form.control}
                                  name={`permissions.${p.key}`}
                                  render={({ field }) => (
                                    <Switch
                                      checked={!!field.value}
                                      onCheckedChange={(val) => field.onChange(val)}
                                      disabled={p.disabled}
                                    />
                                  )}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Footer Bar */}
            <div className="p-6 bg-[#181d34] border-t border-[#313a68] flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() =>
                  form.reset({
                    roleId: activeRoleId,
                    tab: activeTab,
                    permissions: getRolePermissionMap(activeRoleId),
                  })
                }
                className="px-6 py-2 text-sm font-bold text-[#909acb] hover:text-white transition-colors"
              >
                Reset to Default
              </button>

              <Button type="submit" className="px-8 py-2.5 font-bold text-sm shadow-lg shadow-primary/20">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function tabLabel(t: PermissionTab) {
  switch (t) {
    case "course":
      return "Course Management";
    case "user":
      return "User Management";
    case "finance":
      return "Financials";
    case "cms":
      return "CMS Content";
  }
}

function groupIcon(group: string) {
  if (group.includes("Course")) return "auto_stories";
  if (group.includes("Quiz")) return "quiz";
  if (group.includes("Financial")) return "payments";
  return "tune";
}
