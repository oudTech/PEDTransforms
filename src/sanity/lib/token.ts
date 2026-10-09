import "server-only";

export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET ?? "";
