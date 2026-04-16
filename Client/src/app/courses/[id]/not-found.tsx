import NotFoundBase from "@/components/common/NotFoundBase";

export default function CourseNotFound() {
  return (
    <NotFoundBase
      heading="Course Not Found"
      description="The course you are looking for does not exist or may have been removed."
      primaryLabel="Browse Courses"
      primaryHref="/courses"
    />
  );
}
