import { validateField } from "@/app/utilities/Validations/ContactFromValidator";
import FormField from "@/components/common/FormField";
import Input from "@/components/common/input";
import TextArea from "@/components/common/TextArea";
import Checkbox from "@/components/common/Checkbox";
import GridWrapper from "@/components/Ui/GridWrapper";
import { useState } from "react";
import { message } from "antd";

type FormData = {
  name: string;
  course: string;
  phone: string;
  preferredCollege: string;
  email: string;
  location: string;
  message: string;
};

type FormErrors = {
  name?: string;
  course?: string;
  phone?: string;
  preferredCollege?: string;
  email?: string;
  location?: string;
  message?: string;
};

export default function ContactRightBody() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    course: "",
    phone: "",
    preferredCollege: "",
    email: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      // Skip validation for optional fields
      if (key === "preferredCollege") return;
      const error = validateField(key, formData[key as keyof FormData]);
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
      message.success("Form submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        course: "",
        phone: "",
        preferredCollege: "",
        email: "",
        location: "",
        message: "",
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto space-y-2.5 md:space-y-4 bg-white p-3 md:p-4 rounded-lg"
    >
      <GridWrapper colsDesktop={2} colsMobile={2} colsTablet={2} className="gap-2.5 md:gap-4">
        <FormField
          label="Student Name"
          required
          error={touched.name && !!errors.name}
          errorMessage={touched.name ? errors.name : undefined}
          labelHtmlFor="name"
        >
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && !!errors.name}
            required
          />
        </FormField>

        <FormField
          label="Course You're Interested In"
          required
          error={touched.course && !!errors.course}
          errorMessage={touched.course ? errors.course : undefined}
          labelHtmlFor="course"
        >
          <Input
            id="course"
            name="course"
            type="text"
            placeholder="E.g., B.Tech CSE, BBA, MBBS…"
            value={formData.course}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.course && !!errors.course}
            required
          />
        </FormField>

        <FormField
          label="Contact Number"
          required
          error={touched.phone && !!errors.phone}
          errorMessage={touched.phone ? errors.phone : undefined}
          labelHtmlFor="phone"
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 9099090900"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && !!errors.phone}
            required
          />
        </FormField>
        <FormField
          label="Preferred College (Optional)"
          error={touched.preferredCollege && !!errors.preferredCollege}
          errorMessage={
            touched.preferredCollege ? errors.preferredCollege : undefined
          }
          labelHtmlFor="preferredCollege"
        >
          <Input
            id="preferredCollege"
            name="preferredCollege"
            type="text"
            placeholder="Type college name or leave blank"
            value={formData.preferredCollege}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.preferredCollege && !!errors.preferredCollege}
          />
        </FormField>

        <FormField
          label="Email Address"
          required
          error={touched.email && !!errors.email}
          errorMessage={touched.email ? errors.email : undefined}
          labelHtmlFor="email"
        >
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="clarix@gmail.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            required
          />
        </FormField>
        <FormField
          label="Your City / Location"
          required
          error={touched.location && !!errors.location}
          errorMessage={touched.location ? errors.location : undefined}
          labelHtmlFor="location"
        >
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location && !!errors.location}
            required
          />
        </FormField>
      </GridWrapper>
      <FormField
        label="Message"
        required
        error={touched.message && !!errors.message}
        errorMessage={touched.message ? errors.message : undefined}
        labelHtmlFor="message"
      >
        <TextArea
          id="message"
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.message && !!errors.message}
          required
        />
      </FormField>

      <Checkbox
        id="agree-privacy"
        name="agree-privacy"
        label={
          <>
            I agree the{" "}
            <span className="text-[var(--color-primary)]">Privacy Policy</span>.
          </>
        }
      />

      <button
        type="submit"
        className="w-full bg-[var(--color-primary)] text-white font-poppins text-[14px] md:text-[16px] leading-[20px] py-2.5 md:py-3 px-6 rounded-[12px] hover:bg-[var(--primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
