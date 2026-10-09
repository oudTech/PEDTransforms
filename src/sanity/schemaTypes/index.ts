import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContent";
import { categoryType } from "./categoryType";
import { postType } from "./postType";

export const schemaTypes: SchemaTypeDefinition[] = [
  postType,
  authorType,
  categoryType,
  blockContentType,
];
