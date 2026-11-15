"use client";

import { useState } from "react";
import { FormProvider, useForm, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GuarantorFields from "./GuarantorFields";
import { TextField } from "@/components/primitives/inputs/TextField";
import CustomSelect from "@/components/primitives/inputs/CustomSelect";
import Button from "@/components/primitives/buttons/Button";
import { Flex } from "@/components/ui/ui-layout";
import {
  LoanApplicationPayload,
  loanApplicationSchema,
  LoanApplicationValidatedPayload,
} from "@/schema/loan.schema";
import { LOAN_APPLICATION_STEPS } from "@/constant/data";
import PinVerification from "./PinVerification";

interface NewLoanApplicationProps {
  businessId: string;
  userId: string;
  onSubmit: (payload: LoanApplicationPayload) => Promise<void>;
}

/**
 * Step order (must match LOAN_APPLICATION_STEPS in "@/constant/data"):
 * 0 = PIN verification
 * 1 = Loan details
 * 2 = Guarantors
 * 3 = Review
 */
const STEP = {
  PIN: 0,
  DETAILS: 1,
  GUARANTORS: 2,
  REVIEW: 3,
} as const;

const STEP_FIELDS: FieldPath<LoanApplicationPayload>[][] = [
  ["pinVerificationToken.customer", "pinVerificationToken.agent"], // 0 PIN
  [
    "amount",
    "loanTenure",
    "repaymentFrequency",
    "purpose",
    "excludeWeekends",
    "interestRate",
  ], // 1 Details
  ["guarantors"], // 2 Guarantors
  [], // 3 Review
];

const REPAYMENT_FREQUENCY_LABELS: Record<number, string> = {
  1: "Daily",
  2: "Two days",
  3: "Three days",
  7: "Weekly",
  14: "Every 14 Days",
  30: "Monthly",
};

const NewLoanApplication = ({
  businessId,
  userId,
  onSubmit,
}: NewLoanApplicationProps) => {
  const [currentStep, setCurrentStep] = useState<number>(STEP.PIN);

  const methods = useForm<
    LoanApplicationPayload,
    any,
    LoanApplicationValidatedPayload
  >({
    resolver: zodResolver(loanApplicationSchema),
    shouldUnregister: false,
    mode: "onTouched",
    defaultValues: {
      businessId,
      userId,
      amount: "",
      excludeWeekends: false,
      interestRate: 0,
      loanTenure: 4,
      repaymentFrequency: 30,
      purpose: "",
      pinVerificationToken: {
        agent: "",
        customer: "",
      },
      guarantors: [
        {
          fullName: "",
          email: "",
          relationship: "",
          phoneNumber: "",
          bvn: "",
        },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const formValues = watch();

  const lastStepIndex = LOAN_APPLICATION_STEPS.length - 1;
  const isFirstStep = currentStep === STEP.PIN;
  const isLastStep = currentStep === lastStepIndex;
  const isPinStep = currentStep === STEP.PIN;

  const clearTokens = () => {
    setValue("pinVerificationToken.customer", "");
    setValue("pinVerificationToken.agent", "");
  };

  /** Jump to a step. Re-entering the PIN step wipes stale tokens. */
  const goToStep = (step: number) => {
    if (step === STEP.PIN) clearTokens();
    setCurrentStep(step);
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[currentStep];

    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;

    setCurrentStep((prev) => Math.min(prev + 1, lastStepIndex));
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const submitApplication = async (data: LoanApplicationPayload) => {
    await onSubmit(data);
  };

  const handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Never submit from the PIN step; it advances itself after both PINs pass.
    if (isPinStep) return;

    if (!isLastStep) {
      void goNext();
      return;
    }

    void handleSubmit(submitApplication)(event);
  };

  const formatCurrency = (value: string | number) => {
    return `₦${Number(value || 0).toLocaleString("en-NG")}`;
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full space-y-6 pb-10">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            New Loan Application
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Complete the steps below to submit a loan application for this
            customer.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Step {currentStep + 1} of {LOAN_APPLICATION_STEPS.length}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {LOAN_APPLICATION_STEPS[currentStep].description}
              </p>
            </div>

            <span className="text-sm font-medium text-primary">
              {Math.round(
                ((currentStep + 1) / LOAN_APPLICATION_STEPS.length) * 100,
              )}
              %
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / LOAN_APPLICATION_STEPS.length) * 100}%`,
              }}
            />
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-4 gap-2">
            {LOAN_APPLICATION_STEPS.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div key={step.title} className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        isCompleted
                          ? "bg-green-100 text-green-700"
                          : isActive
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                  </div>

                  <p
                    className={`truncate text-xs font-medium ${
                      isActive
                        ? "text-primary"
                        : isCompleted
                          ? "text-green-700"
                          : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* STEP 0: PIN VERIFICATION */}
          {currentStep === STEP.PIN && (
            <PinVerification
              userId={userId}
              onCustomerVerified={(token) =>
                setValue("pinVerificationToken.customer", token, {
                  shouldValidate: true,
                })
              }
              onAgentVerified={(token) => {
                setValue("pinVerificationToken.agent", token, {
                  shouldValidate: true,
                });
                // Advance only after BOTH PINs are verified.
                setCurrentStep(STEP.DETAILS);
              }}
              onReset={clearTokens}
            />
          )}

          {/* STEP 1: LOAN DETAILS */}
          {currentStep === STEP.DETAILS && (
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Loan Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the loan amount and repayment preferences.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <TextField
                  label="Loan Amount (₦)"
                  type="number"
                  min="1"
                  placeholder="e.g. 50000"
                  {...register("amount")}
                  descClassName="text-xs text-red-500"
                  desc={errors.amount?.message}
                />

                <CustomSelect
                  label="Loan Tenure"
                  className="text-[#94A3B8] border"
                  wrapperClass="h-11"
                  {...register("loanTenure", {
                    valueAsNumber: true,
                  })}
                  options={[
                    { value: 1, label: "1 month" },
                    { value: 2, label: "2 months" },
                    { value: 3, label: "3 months" },
                    { value: 4, label: "4 months" },
                    { value: 6, label: "6 months" },
                    { value: 12, label: "12 months" },
                  ]}
                />

                <CustomSelect
                  label="Repayment Frequency"
                  className="text-[#94A3B8] border"
                  wrapperClass="h-11"
                  {...register("repaymentFrequency", {
                    valueAsNumber: true,
                  })}
                  options={[
                    { value: 1, label: "Daily" },
                    { value: 2, label: "Two days" },
                    { value: 3, label: "Three days" },
                    { value: 7, label: "Weekly" },
                    { value: 14, label: "Every 14 Days" },
                    { value: 30, label: "Monthly" },
                  ]}
                />

                <TextField
                  label="Loan Purpose"
                  placeholder="e.g. Repairs"
                  {...register("purpose")}
                  descClassName="text-xs text-red-500"
                  desc={errors.purpose?.message}
                />
              </div>

              <Flex className="mt-4 w-full justify-between gap-4">
                <div className="w-full md:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
                    <input
                      {...register("excludeWeekends")}
                      type="checkbox"
                      className="h-4 w-4 rounded"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Exclude weekends
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Exclude Saturdays and Sundays from repayment
                        calculations.
                      </p>
                    </div>
                  </label>
                </div>

                <TextField
                  label="Interest Rate"
                  placeholder="e.g. 1"
                  wrapperClassName="w-full"
                  type="number"
                  min={1}
                  {...register("interestRate", { valueAsNumber: true })}
                  descClassName="text-xs text-red-500"
                  desc={errors.interestRate?.message}
                />
              </Flex>
            </section>
          )}

          {/* STEP 2: GUARANTORS */}
          {currentStep === STEP.GUARANTORS && (
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <GuarantorFields />
            </section>
          )}

          {/* STEP 3: REVIEW APPLICATION */}
          {currentStep === STEP.REVIEW && (
            <section className="space-y-5">
              {/* Loan Summary */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Loan Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Review the loan details.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToStep(STEP.DETAILS)}
                    className="text-sm font-medium text-primary"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <ReviewItem
                    label="Loan Amount"
                    value={formatCurrency(formValues.amount)}
                  />

                  <ReviewItem
                    label="Loan Tenure"
                    value={`${formValues.loanTenure} ${
                      formValues.loanTenure === 1 ? "Month" : "Months"
                    }`}
                  />

                  <ReviewItem
                    label="Repayment Frequency"
                    value={
                      REPAYMENT_FREQUENCY_LABELS[
                        Number(formValues.repaymentFrequency)
                      ] ?? "Not specified"
                    }
                  />

                  <ReviewItem
                    label="Interest Rate"
                    value={
                      formValues.interestRate !== undefined &&
                      formValues.interestRate !== null
                        ? `${formValues.interestRate}%`
                        : ""
                    }
                  />

                  <ReviewItem label="Loan Purpose" value={formValues.purpose} />

                  <ReviewItem
                    label="Exclude Weekends"
                    value={formValues.excludeWeekends ? "Yes" : "No"}
                  />
                </div>
              </div>

              {/* Guarantor Summary */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Guarantors
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {formValues.guarantors?.length ?? 0} guarantor(s) added.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToStep(STEP.GUARANTORS)}
                    className="text-sm font-medium text-primary"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  {formValues.guarantors?.map((guarantor, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                    >
                      <p className="mb-3 text-sm font-semibold text-gray-800">
                        Guarantor {index + 1}
                      </p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <ReviewItem
                          label="Full Name"
                          value={guarantor.fullName}
                        />
                        <ReviewItem label="Email" value={guarantor.email} />
                        <ReviewItem
                          label="Phone Number"
                          value={guarantor.phoneNumber}
                        />
                        <ReviewItem
                          label="Relationship"
                          value={guarantor.relationship}
                        />
                        <ReviewItem
                          label="BVN"
                          value={
                            guarantor.bvn
                              ? `•••••••${guarantor.bvn.slice(-4)}`
                              : ""
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Summary */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      PIN Verification
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Verification status.
                    </p>
                  </div>

                  {/* Re-verifying clears the old tokens */}
                  <button
                    type="button"
                    onClick={() => goToStep(STEP.PIN)}
                    className="text-sm font-medium text-primary"
                  >
                    Re-verify
                  </button>
                </div>

                <div className="space-y-3">
                  <VerificationStatus
                    label="Agent PIN Verification"
                    verified={!!formValues.pinVerificationToken?.agent}
                  />

                  <VerificationStatus
                    label="Customer PIN Verification"
                    verified={!!formValues.pinVerificationToken?.customer}
                  />
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">
                  Before you submit
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-700">
                  Please ensure that all information provided is accurate.
                  Submitting this application will send the loan request for
                  processing.
                </p>
              </div>
            </section>
          )}

          {/* Navigation Buttons (hidden on the PIN step, which advances itself) */}
          {!isPinStep && (
            <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
              <div>
                {/* Going back from Details to the PIN step is not allowed:
                    tokens are single-use, so re-verification is explicit. */}
                {currentStep > STEP.DETAILS && !isFirstStep && (
                  <Button
                    key="previous"
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div>
                {/* Distinct keys stop React from reusing the same DOM button
                    and letting the "Continue" click fire a submit. */}
                {!isLastStep ? (
                  <Button
                    key="continue"
                    type="button"
                    variant="primary"
                    onClick={goNext}
                    className="w-full sm:w-auto"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    key="submit"
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Loan Application"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </FormProvider>
  );
};

const ReviewItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div className="min-w-0">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 break-words text-sm font-medium text-gray-900">
      {value || "Not provided"}
    </p>
  </div>
);

const VerificationStatus = ({
  label,
  verified,
}: {
  label: string;
  verified: boolean;
}) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-sm text-gray-700">{label}</span>

    <span
      className={`flex items-center gap-1.5 text-xs font-medium ${
        verified ? "text-green-600" : "text-red-500"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          verified ? "bg-green-500" : "bg-red-500"
        }`}
      />
      {verified ? "Provided" : "Missing"}
    </span>
  </div>
);

export default NewLoanApplication;
