export const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "Name is required";
        }
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        return "";
      case "course":
        if (!value.trim()) {
          return "Course is required";
        }
        if (value.trim().length < 2) {
          return "Please enter a valid course name";
        }
        return "";
      case "phone":
        if (!value.trim()) {
          return "Phone number is required";
        }
        const phoneRegex =
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ""))) {
          return "Please enter a valid phone number";
        }
        return "";
      case "email":
        if (!value.trim()) {
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        return "";
      case "location":
        if (!value.trim()) {
          return "Location is required";
        }
        if (value.trim().length < 2) {
          return "Please enter a valid location";
        }
        return "";
      case "message":
        if (!value.trim()) {
          return "Message is required";
        }
        if (value.trim().length < 10) {
          return "Message must be at least 10 characters";
        }
        return "";
      case "preferredCollege":
        // Optional field, no validation needed
        return "";
      default:
        return "";
    }
  };