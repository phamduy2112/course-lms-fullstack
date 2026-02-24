import React, { useEffect, useMemo, useRef, useState } from "react";
export type RoleKey = "admin" | "moderator" | "instructor" | "student";

export const ROLE_OPTIONS: { value: RoleKey; label: string }[] = [
  { value: "admin", label: "Administrator" },
  { value: "moderator", label: "Moderator" },
  { value: "instructor", label: "Instructor" },
  { value: "student", label: "Student" },
];

export type UserRow = {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  lastActive: string;
  status: "Active" | "Pending" | "Suspended";
  roles: RoleKey[]; // ✅ nhiều role
};
type Props = {
  value: RoleKey[];
  onChange: (next: RoleKey[]) => void;
  placeholder?: string;
};

export default function MultiRoleSelect({
  value,
  onChange,
  placeholder = "Select roles...",
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // click outside
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selectedLabels = useMemo(() => {
    const map = new Map(ROLE_OPTIONS.map((r) => [r.value, r.label]));
    return value.map((v) => map.get(v) ?? v);
  }, [value]);

  const toggleRole = (role: RoleKey) => {
    if (value.includes(role)) onChange(value.filter((x) => x !== role));
    else onChange([...value, role]);
  };

  const clear = () => onChange([]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full min-w-[220px] bg-[#222949] text-white text-xs rounded-lg py-2 px-3 flex items-center justify-between hover:bg-[#2a315c] transition-colors"
      >
        <div className="flex flex-wrap gap-1 items-center">
          {value.length === 0 ? (
            <span className="text-[#909acb]">{placeholder}</span>
          ) : (
            <>
              {selectedLabels.slice(0, 2).map((l) => (
                <span
                  key={l}
                  className="px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30"
                >
                  {l}
                </span>
              ))}
              {value.length > 2 && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-white">
                  +{value.length - 2}
                </span>
              )}
            </>
          )}
        </div>

        <span className="material-symbols-outlined text-[18px] text-[#909acb]">
          expand_more
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#222949] bg-[#1a1f37] shadow-2xl overflow-hidden">
          <div className="p-2 max-h-[240px] overflow-auto custom-scrollbar">
            {ROLE_OPTIONS.map((r) => {
              const checked = value.includes(r.value);
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => toggleRole(r.value)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "size-4 rounded border flex items-center justify-center",
                        checked
                          ? "bg-primary border-primary"
                          : "bg-[#222949] border-[#313a68]",
                      ].join(" ")}
                    >
                      {checked && (
                        <span className="material-symbols-outlined text-[14px] text-white">
                          check
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-white">{r.label}</span>
                  </div>

                  {checked && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold uppercase">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#222949] p-2 flex justify-between">
            <button
              type="button"
              onClick={clear}
              className="text-xs text-[#909acb] hover:text-white px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-white bg-primary/90 hover:bg-primary px-3 py-2 rounded-lg font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
