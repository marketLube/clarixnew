import type { MetadataRoute } from "next";
import axios from "axios";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.clarixeducation.com";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface PaginatedResponse<T> {
  data: {
    [key: string]: T[];
    pagination: any;
  };
}

async function fetchAll<T>(endpoint: string, key: string): Promise<T[]> {
  try {
    const items: T[] = [];
    let page = 1;
    const limit = 100;
    let totalPages = 1;

    do {
      const { data } = await axios.get<PaginatedResponse<T>>(
        `${API_URL}${endpoint}`,
        { params: { page, limit } }
      );
      const responseData = data?.data;
      if (responseData?.[key]) {
        items.push(...responseData[key]);
      }
      totalPages = responseData?.pagination?.totalPages ?? 1;
      page++;
    } while (page <= totalPages);

    return items;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/colleges`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/exams`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/jobs-internships`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/scholarships`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/career`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Fetch dynamic data in parallel
  const [colleges, blogs, courses, exams, jobs] = await Promise.all([
    fetchAll<{ _id: string; updatedAt?: string }>("/college", "colleges"),
    fetchAll<{ _id: string; slug?: string; updatedAt?: string }>(
      "/blog",
      "blogs"
    ),
    fetchAll<{ _id: string; updatedAt?: string }>("/course", "courses"),
    fetchAll<{ _id: string; updatedAt?: string }>("/exam", "exams"),
    fetchAll<{ _id: string; updatedAt?: string }>("/job", "jobs"),
  ]);

  const collegePages: MetadataRoute.Sitemap = colleges.map((college) => ({
    url: `${SITE_URL}/colleges/${college._id}`,
    lastModified: college.updatedAt ? new Date(college.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug || blog._id}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course._id}`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const examPages: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${SITE_URL}/exams/${exam._id}`,
    lastModified: exam.updatedAt ? new Date(exam.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/jobs-internships/${job._id}`,
    lastModified: job.updatedAt ? new Date(job.updatedAt) : new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...collegePages,
    ...blogPages,
    ...coursePages,
    ...examPages,
    ...jobPages,
  ];
}
