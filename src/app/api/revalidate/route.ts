import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/sanity/lib/token";

type WebhookPayload = {
  _type: string;
  slug?: string;
};

export async function POST(request: NextRequest) {
  if (!revalidateSecret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      request,
      revalidateSecret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    const tags = [body._type];
    if (body.slug) tags.push(`${body._type}:${body.slug}`);
    for (const tag of tags) revalidateTag(tag, "max");

    return NextResponse.json({ revalidated: tags, now: Date.now() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
