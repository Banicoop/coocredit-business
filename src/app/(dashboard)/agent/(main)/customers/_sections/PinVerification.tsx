"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

import { useVerifyLoanPin } from "@/lib/hooks/useLoans";
import Button from "@/components/primitives/buttons/Button";
import {
  PinVerificationFormValues,
  pinVerificationSchema,
} from "@/schema/loan.schema";

type PinVerificationProps = {
  userId: string;
  onVerified?: () => void;
};

type VerificationStep = "CUSTOMER" | "AGENT";

const PinVerification = ({ userId, onVerified }: PinVerificationProps) => {
  const [step, setStep] = useState<VerificationStep>("CUSTOMER");
  const [customerVerified, setCustomerVerified] = useState(false);

  const { mutateAsync, isPending } = useVerifyLoanPin();

  const {
    register,
    resetField,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<PinVerificationFormValues>({
    resolver: zodResolver(pinVerificationSchema),
    mode: "onSubmit",
    defaultValues: { agentPin: "", customerPin: "" },
  });

  const isBusy = isPending;

  // STEP 1: Verify customer PIN
  const verifyCustomerPin = async () => {
    if (!userId || isBusy) return;

    // Validate ONLY the visible field
    const valid = await trigger("customerPin");
    if (!valid) return;

    try {
      await mutateAsync({
        type: "CUSTOMER",
        pin: getValues("customerPin"),
        userId,
      });

      setCustomerVerified(true);
      resetField("customerPin");
      setStep("AGENT");
    } catch {
      // Error toast handled by the mutation's onError.
    }
  };

  // STEP 2: Verify agent PIN
  const verifyAgentPin = async () => {
    if (!customerVerified || isBusy) return;

    const valid = await trigger("agentPin");
    if (!valid) return;

    try {
      await mutateAsync({
        type: "AGENT",
        pin: getValues("agentPin"),
      });

      resetField("agentPin");
      onVerified?.();
    } catch {
      // Error toast handled by the mutation's onError.
    }
  };

  const goBack = () => {
    if (isBusy) return;
    resetField("agentPin");
    setCustomerVerified(false); // customer must be re-verified
    setStep("CUSTOMER");
  };

  const inputClass = (hasError: boolean) =>
    `h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
      hasError ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <ShieldCheck className="text-primary" size={23} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            PIN Verification
          </h2>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Verify the customer and agent PINs to proceed with the loan
            application.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-7 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
              customerVerified
                ? "bg-green-100 text-green-700"
                : "bg-primary text-white"
            }`}
          >
            {customerVerified ? <CheckCircle2 size={18} /> : "1"}
          </div>
          <span
            className={`text-sm font-medium ${
              step === "CUSTOMER" ? "text-gray-900" : "text-green-700"
            }`}
          >
            Customer PIN
          </span>
        </div>

        <div className="h-px flex-1 bg-gray-200" />

        <div className="flex flex-1 items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
              step === "AGENT"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-medium ${
              step === "AGENT" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            Agent PIN
          </span>
        </div>
      </div>

      {/* STEP 1: CUSTOMER */}
      {step === "CUSTOMER" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Verify Customer Identity
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Ask the customer to enter their PIN to authorize this loan
              application.
            </p>
          </div>

          <div>
            <label
              htmlFor="customerPin"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Customer PIN
            </label>
            <div className="relative">
              <LockKeyhole
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="customerPin"
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                maxLength={6}
                placeholder="Enter customer's PIN"
                readOnly={isBusy}
                {...register("customerPin")}
                className={inputClass(!!errors.customerPin)}
              />
            </div>
            {errors.customerPin && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.customerPin.message}
              </p>
            )}
          </div>

          <Button
            onClick={verifyCustomerPin}
            variant="primary"
            disabled={isBusy || !userId}
            loading={isBusy}
            startIcon={<ShieldCheck size={17} />}
          >
            {isBusy ? "Verifying Customer..." : "Verify Customer PIN"}
          </Button>
        </div>
      )}

      {/* STEP 2: AGENT */}
      {step === "AGENT" && (
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 size={17} className="text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Customer PIN successfully verified
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Verify Agent Identity
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter your agent PIN to complete the verification process.
            </p>
          </div>

          <div>
            <label
              htmlFor="agentPin"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Agent PIN
            </label>
            <div className="relative">
              <LockKeyhole
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="agentPin"
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                maxLength={6}
                placeholder="Enter your agent PIN"
                readOnly={isBusy}
                {...register("agentPin")}
                className={inputClass(!!errors.agentPin)}
              />
            </div>
            {errors.agentPin && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.agentPin.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={isBusy}
              startIcon={<ArrowLeft size={16} />}
            >
              Back
            </Button>

            <Button
              onClick={verifyAgentPin}
              variant="primary"
              disabled={isBusy || !customerVerified}
              loading={isBusy}
              startIcon={<ShieldCheck size={17} />}
            >
              {isBusy ? "Verifying Agent..." : "Verify Agent PIN"}
            </Button>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <ShieldCheck size={19} className="mt-0.5 shrink-0 text-blue-600" />
        <div>
          <p className="text-sm font-semibold text-blue-800">
            Security Notice
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            Each PIN is verified independently. Agent verification can only
            proceed after the customer has been verified. Never share your PIN.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PinVerification;
