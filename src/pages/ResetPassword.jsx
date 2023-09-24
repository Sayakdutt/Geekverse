import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../components";
import { CustomButton } from "../components";
const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {};
  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold">Reset Password</p>
        <span className="text-sm text-ascent-2">
          Enter email address used during registration
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-4 flex flex-col gap-5"
        >
          {/* email */}
          <TextInput
            name="email"
            placeholder="email@example.com"
            label="Email Address"
            type="email"
            register={register("email", {
              required: "Email Address is required",
            })}
            styles="w-full rounded-xl"
            labelStyle="ml-2"
            error={errors.email ? errors.email.message : ""}
          />
          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={`inline-flex justify-center rounded-3xl bg-violet px-8 py-3 text-xl
                font-medium text-white outline-none font-bold`}
              title="Next"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
