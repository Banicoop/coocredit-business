
"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, LockKeyhole } from "lucide-react";
import { useVerifyLoanPins } from "@/lib/hooks/useLoans";
import { PinVerificationFormValues, pinVerificationSchema } from "@/schema/loan.schema";
import Button from "@/components/primitives/buttons/Button";



type PinVerificationProps = {
  userId: string;
  onVerified?: () => void;
};

const PinVerification = ({
  userId,
  onVerified,
}: PinVerificationProps) => {
  const { mutateAsync, isPending } = useVerifyLoanPins();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PinVerificationFormValues>({
    resolver: zodResolver(pinVerificationSchema),
    mode: "onSubmit",
    defaultValues: {
      agentPin: "",
      customerPin: "",
    },
  });

  const onSubmit = async (values: PinVerificationFormValues) => {
    try {
      await mutateAsync({
        userId,
        agentPin: values.agentPin,
        customerPin: values.customerPin,
      });

      // Clear sensitive PIN values after successful verification.
      reset();

      // Allow the parent loan application to proceed.
      onVerified?.();
    } catch {
      // Error notification is handled by the mutation's onError.
    }
  };

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
              Verify both the agent and customer's identity
              before proceeding with the loan application.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Agent PIN */}
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
                disabled={isPending}
                {...register("agentPin")}
                className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                  errors.agentPin
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
              />
            </div>

            {errors.agentPin && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.agentPin.message}
              </p>
            )}
          </div>

          {/* Customer PIN */}
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
                id="pin"
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                maxLength={6}
                placeholder="Enter customer's PIN"
                disabled={isPending}
                {...register("customerPin")}
                className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                  errors.customerPin
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
              />
            </div>

            {errors.customerPin && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.customerPin.message}
              </p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <p className="text-sm font-semibold text-blue-800">
              Security Notice
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Both PINs will be verified securely before you
              can proceed. Never share your PIN with anyone
              outside this authorized verification process.
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="primary"
            disabled={isPending || isSubmitting || !userId}
            loading={isPending || isSubmitting}
            startIcon={ <ShieldCheck size={17} />}
            
          >
            {isPending || isSubmitting
              ? "Verifying PINs..."
              : "Verify PINs & Continue"}
          </Button>
        </div>
      </section>
  );
};

export default PinVerification;
