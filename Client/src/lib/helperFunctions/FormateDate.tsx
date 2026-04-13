export default function FormateDate(date?: string) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}