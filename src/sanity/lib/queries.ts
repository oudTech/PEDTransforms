import { defineQuery } from "next-sanity";

const postCoreFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  mainImage,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
`;

const postCardFields = /* groq */ `
  ${postCoreFields},
  author->{
    name,
    role,
    image
  }
`;

export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(featured desc, publishedAt desc) {
    ${postCardFields}
  }
`);

export const latestPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) [0...3] {
    ${postCardFields}
  }
`);

export const categoriesQuery = defineQuery(`
  *[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0]
  | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postCoreFields},
    seoTitle,
    seoDescription,
    _updatedAt,
    author->{
      name,
      role,
      image,
      bio
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        "dimensions": asset->metadata.dimensions
      },
      markDefs[]{
        ...
      }
    },
    "related": *[
      _type == "post"
      && slug.current != $slug
      && defined(slug.current)
      && publishedAt <= now()
      && count(categories[@._ref in ^.^.categories[]._ref]) > 0
    ] | order(publishedAt desc) [0...3] {
      ${postCardFields}
    }
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);

export const sitemapPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    "slug": slug.current,
    _updatedAt
  }
`);
