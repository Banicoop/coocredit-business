import z from "zod";

export const guarantorSchema = z.object({
  email: z.email("Enter a valid email address"),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  relationship: z.string().min(1, "Select a relationship"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
  bvn: z
    .string()
    .length(11, "BVN must contain exactly 11 digits")
    .regex(/^\d+$/, "BVN must contain only numbers"),
});

export const loanApplicationSchema = z.object({
  businessId: z.string().min(1, "Business is required"),
  userId: z.string().min(1, "Customer is required"),

  amount: z
    .string()
    .min(100, "Loan amount must be at leadt 100")
    .refine((value) => Number(value) > 0, "Amount must be greater than zero"),

  excludeWeekends: z.boolean(),

  loanTenure: z.coerce.number().min(1, "Select a loan tenure"),

  repaymentFrequency: z
    .number()
    .min(1, "Select a repayment frequency"),
  interestRate: z.coerce.number()
    .min(1, "Interest Rate must be at least 1%")
    .max(100, 'Interest rate must not exceed 100%'),
  purpose: z.string().min(3, "Enter the loan purpose"),

  pinVerificationToken: z.object({
    agent: z.string().min(1, "Agent PIN verification is required"),
    customer: z.string().min(1, "Customer PIN verification is required"),
  }),
  guarantors: z
    .array(guarantorSchema)
    .min(1, "At least one guarantor is required")
    .max(3, "You can add a maximum of three guarantors"),
});

export const pinVerificationSchema = z.object({
  agentPin: z
    .string()
    .min(1, "Agent PIN is required")
    .regex(/^\d{4,6}$/, "Agent PIN must contain 4–6 digits"),

  customerPin: z
    .string()
    .min(1, "Customer PIN is required")
    .regex(/^\d{4,6}$/, "Customer PIN must contain 4–6 digits"),
});

export type PinVerificationFormValues = z.infer<
  typeof pinVerificationSchema
>;

export type LoanApplicationPayload = z.input<
  typeof loanApplicationSchema
>;

export type LoanApplicationValidatedPayload = z.output<
  typeof loanApplicationSchema
>;

export type GuarantorInput = z.infer<typeof guarantorSchema>;
