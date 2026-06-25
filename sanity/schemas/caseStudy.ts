export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "client", title: "Client Name", type: "string" },
    { name: "industry", title: "Industry", type: "string" },
    { name: "problem", title: "Problem", type: "text" },
    { name: "strategy", title: "Strategy", type: "text" },
    { name: "solution", title: "Solution", type: "text" },
    {
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "before", title: "Before Value", type: "number" },
            { name: "after", title: "After Value", type: "number" },
            { name: "prefix", title: "Prefix (e.g. $)", type: "string" },
            { name: "suffix", title: "Suffix (e.g. /mo)", type: "string" },
          ],
        },
      ],
    },
    { name: "featuredImage", title: "Featured Image", type: "image" },
  ],
};
