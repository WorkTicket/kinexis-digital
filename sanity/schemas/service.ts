export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "summary", title: "Summary", type: "text" },
    { name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] },
    {
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [{ type: "object", fields: [{ name: "title", type: "string" }, { name: "description", type: "text" }] }],
    },
    {
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "object", fields: [{ name: "question", type: "string" }, { name: "answer", type: "text" }] }],
    },
  ],
};
