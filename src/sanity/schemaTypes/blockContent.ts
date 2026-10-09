import { CodeIcon } from "@sanity/icons/Code";
import { ImageIcon } from "@sanity/icons/Image";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
              defineField({
                name: "openInNewTab",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
      ],
    }),
    defineArrayMember({
      name: "codeBlock",
      title: "Code block",
      type: "object",
      icon: CodeIcon,
      fields: [
        defineField({
          name: "language",
          type: "string",
          options: {
            list: [
              "bash",
              "typescript",
              "javascript",
              "json",
              "python",
              "powershell",
              "yaml",
              "sql",
              "text",
            ],
          },
          initialValue: "typescript",
        }),
        defineField({ name: "filename", type: "string" }),
        defineField({
          name: "code",
          type: "text",
          rows: 10,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { title: "filename", subtitle: "language" },
        prepare: ({ title, subtitle }) => ({
          title: title || "Code block",
          subtitle,
        }),
      },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      icon: InfoOutlineIcon,
      fields: [
        defineField({
          name: "tone",
          type: "string",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" },
            ],
            layout: "radio",
            direction: "horizontal",
          },
          initialValue: "info",
        }),
        defineField({
          name: "text",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { title: "text", subtitle: "tone" },
      },
    }),
  ],
});
