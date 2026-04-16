import NotFoundBase from "@/components/common/NotFoundBase";

export default function ArticleNotFound() {
  return (
    <NotFoundBase
      heading="Article Not Found"
      description="The article you are looking for does not exist or may have been removed."
      primaryLabel="Browse Articles"
      primaryHref="/blog"
    />
  );
}
