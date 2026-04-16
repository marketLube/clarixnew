import NotFoundBase from "@/components/common/NotFoundBase";

export default function NotFound() {
  return (
    <NotFoundBase
      heading="Page Not Found"
      description="Sorry, the page you are looking for does not exist or has been moved."
      primaryLabel="Go Home"
      primaryHref="/"
    />
  );
}
