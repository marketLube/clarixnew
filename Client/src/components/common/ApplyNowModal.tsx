"use client";

import { Modal } from "antd";
import { useState, useEffect } from "react";
import Image from "next/image";
import FormField from "@/components/common/FormField";
import Input from "@/components/common/input";
import TextArea from "@/components/common/TextArea";
import Checkbox from "@/components/common/Checkbox";
import { Button } from "@/components/common/Button";

type Course = {
  id?: number;
  title?: string;
  stream?: string;
  type?: string;
  [key: string]: any;
};

interface ApplyNowModalProps {
  open: boolean;
  onClose: () => void;
  course?: Course;
  title?: string; // For scholarships or other use cases
}

type FormData = {
  studentName: string;
  courseInterested: string;
  contactNumber: string;
  preferredCollege: string;
  email: string;
  location: string;
  message: string;
  agreePrivacy: boolean;
};

type FormErrors = {
  studentName?: string;
  courseInterested?: string;
  contactNumber?: string;
  preferredCollege?: string;
  email?: string;
  location?: string;
  message?: string;
  agreePrivacy?: string;
};

export default function ApplyNowModal({
  open,
  onClose,
  course,
  title,
}: ApplyNowModalProps) {
  const displayTitle = title || course?.title || "";

  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    courseInterested: displayTitle,
    contactNumber: "",
    preferredCollege: "",
    email: "",
    location: "",
    message: "",
    agreePrivacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when title changes
  useEffect(() => {
    if (displayTitle) {
      setFormData((prev) => ({
        ...prev,
        courseInterested: displayTitle,
      }));
    }
  }, [displayTitle]);

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case "studentName":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Student name is required";
        }
        break;
      case "courseInterested":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Course is required";
        }
        break;
      case "contactNumber":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Contact number is required";
        }
        if (
          typeof value === "string" &&
          !/^\+?[1-9]\d{1,14}$/.test(value.replace(/\s/g, ""))
        ) {
          return "Please enter a valid contact number";
        }
        break;
      case "email":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Email is required";
        }
        if (
          typeof value === "string" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          return "Please enter a valid email address";
        }
        break;
      case "location":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Location is required";
        }
        break;
      case "message":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Message is required";
        }
        break;
      case "agreePrivacy":
        if (!value) {
          return "You must agree to the privacy policy";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, agreePrivacy: checked }));

    if (errors.agreePrivacy) {
      setErrors((prev) => ({ ...prev, agreePrivacy: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      const error = validateField(key, value as string | boolean);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<string, boolean>
      )
    );

    if (Object.keys(newErrors).length === 0) {
      // TODO: Handle form submission here (API call)

      // Reset form and close modal after successful submission
      setTimeout(() => {
        setFormData({
          studentName: "",
          courseInterested: displayTitle,
          contactNumber: "",
          preferredCollege: "",
          email: "",
          location: "",
          message: "",
          agreePrivacy: false,
        });
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
        onClose();
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      studentName: "",
      courseInterested: displayTitle,
      contactNumber: "",
      preferredCollege: "",
      email: "",
      location: "",
      message: "",
      agreePrivacy: false,
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closeIcon={null}
      width={788}
      centered
      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      wrapClassName="apply-now-modal-wrapper"
      className="apply-now-modal"
    >
      <div className="bg-white rounded-[20px] relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity z-10"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#162447"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Header Section */}
        <div className="flex gap-[10px] items-center px-6 pt-6 pb-4">
          <div className="bg-white border-[#f2f2f2] border-[0.372px] border-solid flex flex-col items-start p-[3.723px] rounded-[6.702px] shrink-0 w-[48.405px] h-[48.405px]">
            <div className="bg-[#faf9f6] border-[#f2f2f2] border-[0.346px] border-solid flex flex-col items-start overflow-hidden relative rounded-[3.723px] shrink-0 w-full h-full">
              <div className="aspect-square relative shrink-0 w-full">
                <Image
                  src="/Dummy_College_Logo.png"
                  alt="College logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] items-start">
            <h2 className="font-poppins text-[#162447] text-[20px] leading-[28px] tracking-[-0.4px] font-medium">
              Register Now To Apply
            </h2>
            <p className="font-poppins text-[#767e92] text-[16px] leading-[20px]">
              {displayTitle || "B.Tech in Computer Science & Engineering"}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="p-6 border-t border-[#ededed] rounded-t-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]"
        >
          <div className="flex flex-col gap-5">
            {/* First Row */}
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                label={
                  <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                    Student Name
                    <span className="text-[#513392] ml-1">*</span>
                  </span>
                }
                error={touched.studentName && !!errors.studentName}
                errorMessage={
                  touched.studentName ? errors.studentName : undefined
                }
                className="flex-1"
              >
                <Input
                  name="studentName"
                  placeholder="Enter your full name"
                  value={formData.studentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.studentName && !!errors.studentName}
                  className="bg-[#fdfdfd] border-[#ededed] h-[52px] rounded-[10px] text-[16px] placeholder:opacity-50"
                />
              </FormField>

              <FormField
                label={
                  <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                    Course You're Interested In
                    <span className="text-[#513392] ml-1">*</span>
                  </span>
                }
                error={touched.courseInterested && !!errors.courseInterested}
                errorMessage={
                  touched.courseInterested ? errors.courseInterested : undefined
                }
                className="flex-1"
              >
                <Input
                  name="courseInterested"
                  placeholder="E.g., B.Tech CSE, BBA, MBBS…"
                  value={formData.courseInterested}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.courseInterested && !!errors.courseInterested}
                  className="bg-[#fdfdfd] border-[#ededed] h-[52px] rounded-[10px] text-[16px] placeholder:opacity-50"
                />
              </FormField>
            </div>

            {/* Second Row */}
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                label={
                  <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                    Contact Number
                    <span className="text-[#513392] ml-1">*</span>
                  </span>
                }
                error={touched.contactNumber && !!errors.contactNumber}
                errorMessage={
                  touched.contactNumber ? errors.contactNumber : undefined
                }
                className="flex-1"
              >
                <Input
                  name="contactNumber"
                  type="tel"
                  placeholder="+91 9099090900"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactNumber && !!errors.contactNumber}
                  className="bg-[#fdfdfd] border-[#ededed] h-[52px] rounded-[10px] text-[16px] placeholder:opacity-50"
                />
              </FormField>

              <FormField
                label={
                  <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                    Preferred College (Optional)
                  </span>
                }
                className="flex-1"
              >
                <Input
                  name="preferredCollege"
                  placeholder="Type college name or leave blank"
                  value={formData.preferredCollege}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#fdfdfd] border-[#ededed] h-[52px] rounded-[10px] text-[16px] placeholder:opacity-50"
                />
              </FormField>
            </div>

            {/* Third Row */}
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                label={
                  <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                    Email Address
                    <span className="text-[#513392] ml-1">*</span>
                  </span>
                }
                error={touched.email && !!errors.email}
                errorMessage={touched.email ? errors.email : undefined}
                className="flex-1"
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="clarix@gmai.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  className="bg-[#fdfdfd] border-[#ededed] h-[52px] rounded-[10px] text-[16px] placeholder:opacity-50"
                />
              </FormField>

              <FormField
                label={
                  <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                    Your City / Location
                    <span className="text-[#513392] ml-1">*</span>
                  </span>
                }
                error={touched.location && !!errors.location}
                errorMessage={touched.location ? errors.location : undefined}
                className="flex-1"
              >
                <Input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.location && !!errors.location}
                  className="bg-[#fdfdfd] border-[#ededed] h-[52px] rounded-[10px] text-[16px] placeholder:opacity-50"
                />
              </FormField>
            </div>

            {/* Message Field */}
            <FormField
              label={
                <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                  Message
                  <span className="text-[#513392] ml-1">*</span>
                </span>
              }
              error={touched.message && !!errors.message}
              errorMessage={touched.message ? errors.message : undefined}
            >
              <TextArea
                name="message"
                placeholder="Leave us a message..."
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.message && !!errors.message}
                rows={3}
                className="bg-[#fdfdfd] border-[#ededed] h-[72px] rounded-[10px] text-[16px] placeholder:opacity-50 py-[14.5px]"
              />
            </FormField>

            {/* Privacy Policy Checkbox */}
            <div className="flex gap-[10px] items-center">
              <Checkbox
                id="agree-privacy"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleCheckboxChange}
                label={
                  <span className="font-poppins text-[#162447] text-[16px] leading-[20px]">
                    I agree the{" "}
                    <span className="text-[#513392]">privacy policy.</span>
                  </span>
                }
                className="flex items-center"
              />
              {touched.agreePrivacy && errors.agreePrivacy && (
                <span className="text-[12px] text-red-500">
                  {errors.agreePrivacy}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#513392] h-[50px] rounded-[56px] shadow-[0px_2px_1px_0px_rgba(255,255,255,0.2)] text-white font-poppins text-[16px] leading-[16.8px] hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
