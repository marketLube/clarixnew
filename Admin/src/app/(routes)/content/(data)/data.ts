import { Home, BookOpen, Info, Briefcase, MessageSquare, GraduationCap, FileText, Library, School, Blocks } from "lucide-react";

export const contentCardsData = [
    {
        title: "Home Page",
        description: "Main landing page with hero section, featured colleges, popular courses, and testimonials.",
        status: "Published",
        updatedAt: "2 hours ago",
        updateBy: "Priya Sharma",
        Icon: Home,
        navigateTo: "/content/homepage"
    },
    {
        title: "Blog Page",
        description: "Educational content, exam guides, college reviews, and career advice articles.",
        status: "Draft",
        updatedAt: "1 day ago",
        updateBy: "Rahul Verma",
        Icon: BookOpen,
        navigateTo: "/content/blogpage"
    },
    {
        title: "About Us",
        description: "Company story, mission, team members, and Clarix Education's journey.",
        status: "Published",
        updatedAt: "1 week ago",
        updateBy: "Admin",
        Icon: Info,
        navigateTo: "/content/aboutus"
    },
    {
        title: "Careers Page",
        description: "Job openings, company culture, benefits, and application process.",
        status: "Scheduled",
        updatedAt: "3 days ago",
        updateBy: "HR Team",
        Icon: Briefcase,
        navigateTo: "/content/careerspage"
    },
    {
        title: "Content Blocks",
        description: "Contact, News letter, and Footer.",
        status: "Published",
        updatedAt: "1 week ago",
        updateBy: "Admin",
        Icon: MessageSquare,
        navigateTo: "/content/contentblocks"
    },
    {
        title: "Jobs & Internships",
        description: "Manage job listings, internship opportunities, and application requests.",
        status: "Draft",
        updatedAt: "Just now",
        updateBy: "Admin",
        Icon: GraduationCap,
        navigateTo: "/content/jobs-internships"
    },
    {
        title: "Exam Page",
        description: "Manage exam details, schedules, and preparation materials.",
        status: "Draft",
        updatedAt: "Just now",
        updateBy: "Admin",
        Icon: FileText,
        navigateTo: "/content/exampage"
    },
    {
        title: "Courses Page",
        description: "Manage course listings, details, and curriculum.",
        status: "Draft",
        updatedAt: "Just now",
        updateBy: "Admin",
        Icon: Library,
        navigateTo: "/content/coursespage"
    },
    {
        title: "Colleges Page",
        description: "Manage college profiles, campus details, and admission requirements.",
        status: "Draft",
        updatedAt: "Just now",
        updateBy: "Admin",
        Icon: School,
        navigateTo: "/content/collegespage"
    },

];
