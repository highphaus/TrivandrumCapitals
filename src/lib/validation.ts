import { z } from "zod";

export function checkDobEligibility(dobString: string, cutoffDateString: string): boolean {
  if (!dobString) return true;
  const dob = new Date(dobString);
  const cutoff = new Date(cutoffDateString);
  if (isNaN(dob.getTime()) || isNaN(cutoff.getTime())) return true;
  return dob >= cutoff;
}

const isValidIndianPhone = (val: string) => {
  const clean = val.replace(/[\s\-\(\)]/g, "");
  return /^(\+91)?[6-9]\d{9}$/.test(clean);
};

export const playerRosterItemSchema = z.object({
  name: z.string().default(""),
  dob: z.string().default(""),
});

export const schoolRegistrationSchema = z
  .object({
    schoolName: z
      .string()
      .trim()
      .min(2, "School Name must be at least 2 characters long."),
    schoolAddress: z
      .string()
      .trim()
      .min(5, "Complete School Address is required."),
    syllabus: z.string().min(1, "Please select the syllabus followed in your school."),
    otherSyllabus: z.string().optional().default(""),
    schoolEmail: z.string().trim().email("Please enter a valid School Email ID."),
    schoolPhone: z
      .string()
      .trim()
      .refine(isValidIndianPhone, {
        message: "Please enter a valid 10-digit School Contact Number (e.g. 9876543210).",
      }),

    repName: z
      .string()
      .trim()
      .min(2, "Name of School Representative is required."),
    repDesignation: z.string().min(1, "Please select the Designation."),
    otherDesignation: z.string().optional().default(""),
    repPhone: z
      .string()
      .trim()
      .refine(isValidIndianPhone, {
        message: "Please enter a valid 10-digit Representative Contact Number.",
      }),
    repEmail: z
      .string()
      .trim()
      .email("Please enter a valid Representative Email ID."),

    registerU10Boys: z.boolean().default(false),
    registerU10Girls: z.boolean().default(false),
    registerU12Boys: z.boolean().default(false),
    registerU12Girls: z.boolean().default(false),

    u10BoysPlayers: z.array(playerRosterItemSchema).default([]),
    u10GirlsPlayers: z.array(playerRosterItemSchema).default([]),
    u12BoysPlayers: z.array(playerRosterItemSchema).default([]),
    u12GirlsPlayers: z.array(playerRosterItemSchema).default([]),

    consent: z.boolean().refine((val) => val === true, {
      message: "You must confirm authorization for school team registration.",
    }),
  })
  .superRefine((data, ctx) => {
    // 1. Must select at least one team category
    if (
      !data.registerU10Boys &&
      !data.registerU10Girls &&
      !data.registerU12Boys &&
      !data.registerU12Girls
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["categorySelection"],
        message: "Please select at least one team category to participate (U10 / U12 Boys/Girls).",
      });
    }

    // 2. Validate roster for each registered category
    const validateCategoryRoster = (
      registered: boolean,
      players: { name: string; dob: string }[],
      pathKey: string,
      categoryName: string,
      cutoffDate: string,
      cutoffLabel: string
    ) => {
      if (registered) {
        if (players.length < 10) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [pathKey],
            message: `Each registered team must consist of 10 players. Currently ${players.length}/10 players added for ${categoryName}.`,
          });
        }
        players.forEach((p, idx) => {
          if (!p.name || p.name.trim().length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`${pathKey}_${idx}_name`],
              message: `${categoryName} Player ${idx + 1} Name is required.`,
            });
          }
          if (!p.dob || p.dob.trim().length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`${pathKey}_${idx}_dob`],
              message: `${categoryName} Player ${idx + 1} Date of Birth is required.`,
            });
          } else if (!checkDobEligibility(p.dob, cutoffDate)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [`${pathKey}_${idx}_dob`],
              message: `${categoryName} Player ${idx + 1} must be ${cutoffLabel}.`,
            });
          }
        });
      }
    };

    validateCategoryRoster(
      data.registerU10Boys,
      data.u10BoysPlayers,
      "u10BoysPlayers",
      "U10 Boys",
      "2017-01-01",
      "Born on or after 01-01-2017"
    );
    validateCategoryRoster(
      data.registerU10Girls,
      data.u10GirlsPlayers,
      "u10GirlsPlayers",
      "U10 Girls",
      "2017-01-01",
      "Born on or after 01-01-2017"
    );
    validateCategoryRoster(
      data.registerU12Boys,
      data.u12BoysPlayers,
      "u12BoysPlayers",
      "U12 Boys",
      "2015-01-01",
      "Born on or after 01-01-2015"
    );
    validateCategoryRoster(
      data.registerU12Girls,
      data.u12GirlsPlayers,
      "u12GirlsPlayers",
      "U12 Girls",
      "2015-01-01",
      "Born on or after 01-01-2015"
    );
  });

export type SchoolRegistrationFormData = z.infer<typeof schoolRegistrationSchema>;
