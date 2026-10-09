import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "bio", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
