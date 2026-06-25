export default {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "category", title: "Category", type: "string", options: { list: ["SEO", "Web Design", "Marketing", "Google Business Profile", "Local Business Growth"] } },
    { name: "author", title: "Author", type: "string" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "coverImage", title: "Cover Image", type: "image" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
  ],
};
