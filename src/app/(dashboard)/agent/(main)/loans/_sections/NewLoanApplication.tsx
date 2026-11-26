"use client";

import { useState } from "react";
import { FormProvider, useForm, FieldPath, FieldErrors } from "react-hook-form";
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
import PinVerification from "../../customers/_sections/PinVerification";

interface NewLoanApplicationProps {
  businessId: string;
  userId: string;
  onSubmit: (payload: LoanApplicationPayload) => Promise<void>;
}

/**
 * Step order (must match LOAN_APPLICATION_STEPS in "@/constant/data"):
 * 0 = Loan details
 * 1 = Guarantors
 * 2 = PIN verification
 * 3 = Review
 */
const STEP = {
  DETAILS: 0,
  GUARANTORS: 1,
  PIN: 2,
  REVIEW: 3,
} as const;

const STEP_FIELDS: FieldPath<LoanApplicationPayload>[][] = [
  [
    "amount",
    "loanTenure",
    "repaymentFrequency",
    "purpose",
    "excludeWeekends",
    "interestRate",
  ], // 0 Details
  ["guarantors"], // 1 Guarantors
  ["pinVerificationToken.customer", "pinVerificationToken.agent"], // 2 PIN
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
  const [currentStep, setCurrentStep] = useState<number>(STEP.DETAILS);

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
      loanTenure: 0,
      repaymentFrequency: 0,
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
  const isPinStep = currentStep === STEP.PIN;
  const isLastStep = currentStep === lastStepIndex;
  // Review has its own "Edit" and "Re-verify" actions, so no "Previous" there:
  // an accidental click would throw away both verifications.
  const canGoBack = currentStep > STEP.DETAILS && !isLastStep;

  const clearTokens = () => {
    setValue("pinVerificationToken.customer", "");
    setValue("pinVerificationToken.agent", "");
  };

  /**
   * Jump to a step. Going to the PIN step or anything before it wipes the
   * tokens, so the PINs always authorize the details that get submitted.
   */
  const goToStep = (step: number) => {
    if (step <= STEP.PIN) clearTokens();
    setCurrentStep(step);
  };

  const goNext = async () => {
    const isValid = await trigger(STEP_FIELDS[currentStep], {
      shouldFocus: true,
    });
    if (!isValid) return;

    setCurrentStep((prev) => Math.min(prev + 1, lastStepIndex));
  };

  const goBack = () => {
    goToStep(Math.max(currentStep - 1, STEP.DETAILS));
  };

  const submitApplication = async (data: LoanApplicationPayload) => {
    await onSubmit(data);
  };

  /** If final validation fails, take the user to the first step with an error. */
  const handleInvalidSubmit = (
    formErrors: FieldErrors<LoanApplicationPayload>,
  ) => {
    const invalidStep = [STEP.DETAILS, STEP.GUARANTORS, STEP.PIN].find((step) =>
      STEP_FIELDS[step].some((field) => field.split(".")[0] in formErrors),
    );

    if (invalidStep !== undefined) goToStep(invalidStep);
  };

  const handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Never submit from the PIN step; it advances itself after both PINs pass.
    if (isPinStep) return;

    if (!isLastStep) {
      void goNext();
      return;
    }

    void handleSubmit(submitApplication, handleInvalidSubmit)(event);
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
          {/* STEP 0: LOAN DETAILS */}
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

                <div>
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
                  <FieldError message={errors.loanTenure?.message} />
                </div>

                <div>
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
                  <FieldError message={errors.repaymentFrequency?.message} />
                </div>

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

          {/* STEP 1: GUARANTORS */}
          {currentStep === STEP.GUARANTORS && (
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <GuarantorFields />
            </section>
          )}

          {/* STEP 2: PIN VERIFICATION */}
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
                setCurrentStep(STEP.REVIEW);
              }}
              onReset={clearTokens}
            />
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
                    disabled={isSubmitting}
                    className="text-sm font-medium text-primary disabled:opacity-50"
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
                    disabled={isSubmitting}
                    className="text-sm font-medium text-primary disabled:opacity-50"
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
                    disabled={isSubmitting}
                    className="text-sm font-medium text-primary disabled:opacity-50"
                  >
                    Re-verify
                  </button>
                </div>

                <div className="space-y-3">
                  <VerificationStatus
                    label="Customer PIN Verification"
                    verified={!!formValues.pinVerificationToken?.customer}
                  />

                  <VerificationStatus
                    label="Agent PIN Verification"
                    verified={!!formValues.pinVerificationToken?.agent}
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
                  processing. Editing any details will require both PINs to be
                  verified again.
                </p>
              </div>
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
            <div>
              {canGoBack && (
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
              {/* No right-hand button on the PIN step: it advances itself.
                  Distinct keys stop React from reusing the same DOM button
                  and letting the "Continue" click fire a submit. */}
              {isLastStep ? (
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
              ) : !isPinStep ? (
                <Button
                  key="continue"
                  type="button"
                  variant="primary"
                  onClick={goNext}
                  className="w-full sm:w-auto"
                >
                  Continue
                </Button>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null;

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
