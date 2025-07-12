export const DepartmentType = {
    EVENT_BASED: "EVENT_BASED",
    SELF_PAY: "SELF_PAY"
} as const;

export type DepartmentType = typeof DepartmentType[keyof typeof DepartmentType];
