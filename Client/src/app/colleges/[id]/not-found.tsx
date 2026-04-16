import NotFoundBase from "@/components/common/NotFoundBase";

export default function CollegeNotFound() {
  return (
    <NotFoundBase
      heading="College Not Found"
      description="The college you are looking for does not exist or may have been removed."
      primaryLabel="Browse Colleges"
      primaryHref="/colleges"
    />
  );
}
