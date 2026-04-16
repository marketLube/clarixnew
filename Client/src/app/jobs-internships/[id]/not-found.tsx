import NotFoundBase from "@/components/common/NotFoundBase";

export default function JobNotFound() {
  return (
    <NotFoundBase
      heading="Job Not Found"
      description="The job or internship you are looking for does not exist or may have been removed."
      primaryLabel="Browse Jobs"
      primaryHref="/jobs-internships"
    />
  );
}
