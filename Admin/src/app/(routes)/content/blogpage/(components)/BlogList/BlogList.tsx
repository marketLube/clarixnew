import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import { useBlogs } from "@/src/servicesHooks/contentHooks/blogpage/useBlogs";
import { useDeleteBlog } from "@/src/servicesHooks/contentHooks/blogpage/useDeleteBlog";

type BlogStatus = "Published" | "Draft";

interface BlogItem {
  id: string;
  title: string;
  date: string;
  status: BlogStatus;
  views: number;
  thumbnail: string;
}

const statusColors: Record<BlogStatus, string> = {
  Published: "bg-[#E5F9F1] text-[#0DBA85]",
  Draft: "bg-[#FFF3D9] text-[#D08B18]",
};

interface BlogListProps {
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export default function BlogList({ onEdit, onView }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All Types" | "Blog" | "Article">(
    "All Types"
  );
  const [statusFilter, setStatusFilter] = useState<"All Status" | BlogStatus>("All Status");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { data, isLoading } = useBlogs();
  const { deleteBlog } = useDeleteBlog();

  const blogs: BlogItem[] = useMemo(() => {
    const apiBlogs = (data?.data?.blogs as any[]) || [];
    return apiBlogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      date: blog.createdAt ? new Date(blog.createdAt).toISOString().slice(0, 10) : "",
      status: (blog.status as BlogStatus) || "Draft",
      views: typeof blog.views === "number" ? blog.views : 0,
      thumbnail: blog.thumbnail || "/images/sample-blog-thumb.png",
    }));
  }, [data]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All Types"
          ? true
          : typeFilter === "Blog" // placeholder – adjust when type is added
            ? true
            : true;

      const matchesStatus =
        statusFilter === "All Status" ? true : blog.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [blogs, search, statusFilter, typeFilter]);

  return (
    <div className="rounded-2xl border border-[#E5F0EC] bg-[#F7FBF9] px-6 py-5">
      {isLoading && (
        <p className="mb-3 text-sm text-[#8B9892]">Loading blogs...</p>
      )}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="h-10 w-full rounded-full border border-[#D5E1DB] bg-white px-4 text-sm text-[#364440] placeholder:text-[#B0BAB6] focus:border-[#0DBA85] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTypeOpen((prev) => !prev);
                setIsStatusOpen(false);
              }}
              className="flex h-9 items-center gap-2 rounded-full border border-[#D5E1DB] bg-white px-4 text-xs font-medium text-[#364440] shadow-[0_1px_0_0_rgba(15,34,27,0.04)] hover:border-[#0DBA85]"
            >
              <span>{typeFilter}</span>
              <ChevronDown className="h-3 w-3 text-[#8B9892]" />
            </button>
            {isTypeOpen && (
              <div className="absolute right-0 z-10 mt-2 w-36 rounded-xl border border-[#E2EAE6] bg-white py-1 shadow-[0_10px_40px_rgba(12,32,24,0.16)]">
                {["All Types", "Blog", "Article"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setTypeFilter(option as typeof typeFilter);
                      setIsTypeOpen(false);
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-xs ${typeFilter === option
                      ? "bg-[#F0FAF6] font-semibold text-[#0DBA85]"
                      : "text-[#364440] hover:bg-[#F4F7F6]"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsStatusOpen((prev) => !prev);
                setIsTypeOpen(false);
              }}
              className="flex h-9 items-center gap-2 rounded-full border border-[#D5E1DB] bg-white px-4 text-xs font-medium text-[#364440] shadow-[0_1px_0_0_rgba(15,34,27,0.04)] hover:border-[#0DBA85]"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="h-3 w-3 text-[#8B9892]" />
            </button>
            {isStatusOpen && (
              <div className="absolute right-0 z-10 mt-2 w-36 rounded-xl border border-[#E2EAE6] bg-white py-1 shadow-[0_10px_40px_rgba(12,32,24,0.16)]">
                {["All Status", "Published", "Draft"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setStatusFilter(option as "All Status" | BlogStatus);
                      setIsStatusOpen(false);
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-xs ${statusFilter === option
                      ? "bg-[#F0FAF6] font-semibold text-[#0DBA85]"
                      : "text-[#364440] hover:bg-[#F4F7F6]"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-[0_1px_0_0_rgba(15,34,27,0.04)]"
          >
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-[#C7D4CE] text-[#0DBA85] focus:ring-[#0DBA85]"
            />

            <div className="relative h-12 w-12 overflow-hidden rounded-[12px] bg-[#E6EFEA]">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#12211C]">
                  {blog.title}
                </p>
                <p className="mt-1 text-xs text-[#8B9892]">
                  {blog.date}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusColors[blog.status]}`}
                >
                  {blog.status}
                </span>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenMenuId(openMenuId === blog.id ? null : blog.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8B9892] hover:bg-[#F1F5F3]"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {openMenuId === blog.id && (
                    <div className="absolute right-0 z-10 mt-1 w-32 overflow-hidden rounded-xl border border-[#E2EAE6] bg-white py-1 shadow-[0_10px_40px_rgba(12,32,24,0.16)]">
                      <button
                        type="button"
                        onClick={() => {
                          onView(blog.id);
                          setOpenMenuId(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#364440] hover:bg-[#F4F7F6]"
                      >
                        <Eye className="h-3.5 w-3.5 text-[#8B9892]" />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(blog.id);
                          setOpenMenuId(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#364440] hover:bg-[#F4F7F6]"
                      >
                        <Pencil className="h-3.5 w-3.5 text-[#8B9892]" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this blog?")) {
                            deleteBlog(blog.id);
                          }
                          setOpenMenuId(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#FF4D4F] hover:bg-[#FEF2F2]"
                      >
                        <Trash className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
