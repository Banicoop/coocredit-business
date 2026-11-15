"use client";

import CustomSelect from "@/components/primitives/inputs/CustomSelect";
import { TextField } from "@/components/primitives/inputs/TextField";
import { LoanApplicationPayload } from "@/schema/loan.schema";
import { useFieldArray, useFormContext } from "react-hook-form";


const GuarantorFields = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LoanApplicationPayload>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guarantors",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Guarantor Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Provide at least one guarantor. You can add up to three.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {fields.length}/3 Guarantors
        </span>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-xl border border-gray-200 p-5 space-y-5"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">
              Guarantor {index + 1}
            </h4>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TextField label="Full Name" {...register(`guarantors.${index}.fullName`)} desc={errors.guarantors?.[index]?.fullName?.message} placeholder="Enter full name" descClassName="text-xs text-red-500"/>
    

            <TextField label="Email Address" type="email" {...register(`guarantors.${index}.email`)} desc={errors.guarantors?.[index]?.email?.message} placeholder="Enter email address" descClassName="text-xs text-red-500"/>

            <TextField label="Phone Number" {...register(`guarantors.${index}.phoneNumber`)} desc={errors.guarantors?.[index]?.phoneNumber?.message} placeholder="Enter phone number" descClassName="text-xs text-red-500"/>

             <CustomSelect
                label="Relationship"
                className="text-[#94A3B8] border"
                wrapperClass="h-11"
                {...register(`guarantors.${index}.relationship`)}
                options={[
                  { value: "Sibling", label: "Sibling" },
                  { value: "Parent", label: "Parent" },
                  { value: "Spouse", label: "Spouse" },
                  { value: "Friend", label: "Friend" },
                  { value: "Colleague", label: "Colleague" },
                  { value: "Business Partner", label: "Business Partner" },
                  { value: "Other", label: "Other" },
                ]}
              />
        

            <TextField label=" Bank Verification Number (BVN)" {...register(`guarantors.${index}.bvn`)} desc={errors.guarantors?.[index]?.bvn?.message} placeholder="Enter 11-digit BVN" descClassName="text-xs text-red-500"/>

          </div>
        </div>
      ))}

      {fields.length < 3 && (
        <button
          type="button"
          onClick={() =>
            append({
              fullName: "",
              email: "",
              relationship: "",
              phoneNumber: "",
              bvn: "",
            })
          }
          className="flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <span className="text-lg">+</span>
          Add Another Guarantor
        </button>
      )}

      {typeof errors.guarantors?.message === "string" && (
        <p className="text-sm text-red-500">
          {errors.guarantors.message}
        </p>
      )}
    </div>
  );
};


export default GuarantorFields;
