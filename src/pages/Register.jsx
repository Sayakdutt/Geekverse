import { useForm } from "react-hook-form";
import { TextInput, Loading, CustomButton } from "../components/index";
import { BsShare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginImg, Frame, F } from "../assets/index";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {};
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-10">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-black rounded-3xl overflow-hidden shadow-2xl justify-center border-4 border-secondary drop-shadow-2xl">
        {/* LEFT */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-end bg-black">
          <div className="w-full flex flex-col items-center justify-center">
            <img
              src={F}
              alt="Bg Img"
              className=" w-full  2xl:w-full 2xl:h-full object-cover"
            />
            {/* styling */}
            <div className="flex justify-content-space-between h-1/4 p-5 bg-black gap-5 ">
              <div className=" flex items-center gap-3 bg-black border-secondary border-2 py-2 px-5 rounded-full text-white">
                <BsShare size={14} />
                <span className="text-xs font-medium">Share</span>
              </div>
              <div className=" flex items-center gap-3 bg-black border-secondary border-2 text-white  py-2 px-5 rounded-full">
                <ImConnection />
                <span className="text-xs font-medium">Connect</span>
              </div>
              <div className="  flex items-center gap-3 text-white bg-black border-secondary border-2  py-2 px-5 rounded-full">
                <AiOutlineInteraction />
                <span className="text-xs font-medium">Get hired</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT*/}
        <div className="w-1/2 lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full  flex justify-center gap-4 items-center mb-6 mt-6">
            <img src="logo.svg" alt="" height={45} width={45} />
            <span className="text-4xl text-violet font-semibold  ">
              Geekverse
            </span>
          </div>
          <p className="text-ascent-1 text-3xl mt-5 text-base ">
            Create Account
          </p>
          <form
            className="py-4 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* name */}
            <div className="flex gap-4">
              {/* first name */}
              <TextInput
                name="firstName"
                placeholder="Enter your First Name"
                label="First Name"
                type="text"
                register={register("firstName", {
                  required: "First Name is required",
                })}
                styles="w-full rounded-xl"
                labelStyle="ml-2"
                error={errors.firstName ? errors.firstName.message : ""}
              />
              {/* last name */}
              <TextInput
                name="lastName"
                placeholder="Enter your Last Name"
                label="Last Name"
                type="text"
                register={register("lastName", {
                  required: "Last Name is required",
                })}
                styles="w-full rounded-xl"
                labelStyle="ml-2"
                error={errors.lastName ? errors.lastName.message : ""}
              />
            </div>

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
            {/* password */}
            <div className="flex justify-center gap-4">
              {/* password */}
              <TextInput
                name="password"
                placeholder="Enter your Password"
                label="Password"
                type="password"
                register={register("password", {
                  required: "Password is required",
                })}
                styles="w-full rounded-xl"
                labelStyle="ml-2"
                error={errors.password ? errors.password.message : ""}
              />

              {/* confirm password */}
              <TextInput
                name="cPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
                register={register("cPassword", {
                  required: "Confirm your password",
                  validate: (value) => {
                    const { password } = getValues();
                    if (password != value) {
                      return "Password doesnot match";
                    }
                  },
                })}
                styles="w-full rounded-xl"
                labelStyle="ml-2"
                error={errors.cPassword ? errors.cPassword.message : ""}
              />
            </div>

            {/* <Link
              to="/reset-password"
              className="text-sm text-right text-violet font-semibold"
            >
              Forgot Password ?
            </Link> */}
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-3xl bg-violet px-8 py-3 text-xl mt-5
                font-medium text-white outline-none font-bold`}
                title="Create Account"
              />
            )}
          </form>
          <p className="text-ascent-2 text-sm text-center">
            Already have an account ?
            <Link
              to="/login"
              className="text-violet font-semibold ml-2 cursor-pointer mb-10"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
