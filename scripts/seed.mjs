// Loads starter categories, an editorial author and sample posts into Sanity.
// Review or replace the sample posts before publishing the site.
// Run with: npm run sanity:seed  (reads credentials from .env.local)
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });
const block = (style, ...children) => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: children.map((c) => (typeof c === "string" ? span(c) : c)),
});
const p = (...children) => block("normal", ...children);
const h2 = (text) => block("h2", text);
const h3 = (text) => block("h3", text);
const quote = (text) => block("blockquote", text);
const bullet = (text) => ({ ...block("normal", text), listItem: "bullet", level: 1 });
const callout = (tone, text) => ({ _type: "callout", _key: key(), tone, text });

async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const ref = (id) => ({ _type: "reference", _ref: id, _key: key() });

async function run() {
  console.log(`Seeding ${projectId}/${dataset}…`);

  const categories = [
    {
      _id: "category-digital-transformation",
      title: "Digital Transformation",
      slug: "digital-transformation",
    },
    {
      _id: "category-automation-smart-systems",
      title: "Automation & Smart Systems",
      slug: "automation-smart-systems",
    },
    {
      _id: "category-consulting-advisory",
      title: "Consulting & Advisory",
      slug: "consulting-advisory",
    },
  ];

  const authors = [
    {
      _id: "author-pedtransforms",
      name: "PEDTransforms Team",
      role: "Insights",
      bio: "Practical guidance from the PEDTransforms team on digital transformation, automation, smart systems, technology talent and advisory.",
    },
  ];

  const tx = client.transaction();

  for (const c of categories) {
    tx.createOrReplace({
      _id: c._id,
      _type: "category",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
    });
  }

  for (const a of authors) {
    tx.createOrReplace({
      _id: a._id,
      _type: "author",
      name: a.name,
      role: a.role,
      bio: a.bio,
      slug: { _type: "slug", current: a._id.replace("author-", "") },
    });
  }

  const posts = [
    {
      _id: "post-forecourt-automation-first-steps",
      title: "Forecourt automation: where to start",
      slug: "forecourt-automation-where-to-start",
      excerpt:
        "Automating a fuel station works best in stages. Start with the data you already have, then connect pumps, tanks and payments into one view.",
      categories: ["category-automation-smart-systems"],
      featured: true,
      daysAgo: 2,
      image: "https://images.unsplash.com/photo-1654334036171-e01e52b2ce8e?w=1600&h=900&fit=crop",
      body: [
        p("Many fuel retailers still reconcile sales, stock and payments by hand at the end of each shift. Automation removes that manual work, but the order in which you automate matters."),
        h2("1. Get visibility of sales and stock"),
        p("Before changing equipment, connect the systems you already have. A single view of pump sales and tank levels shows where losses and delays occur."),
        bullet("Link dispensers and the point-of-sale system"),
        bullet("Monitor tank levels automatically instead of dipping by hand"),
        bullet("Reconcile sales against stock movements every day"),
        h2("2. Automate payments and reconciliation"),
        p("Integrated payments reduce queues and cash handling, and make reconciliation a report rather than a task."),
        callout("tip", "Choose systems that work with your existing pumps and tank gauges where possible. Replacing working hardware is rarely the first priority."),
        h2("3. Manage multiple sites centrally"),
        p("Once each site reports reliably, central dashboards let you compare performance, set prices and respond to issues across the network."),
        quote("Automate what you can measure first, then use the data to decide what to automate next."),
      ],
    },
    {
      _id: "post-technology-procurement-checklist",
      title: "Before you buy: a technology procurement checklist",
      slug: "technology-procurement-checklist",
      excerpt:
        "The most expensive technology is the one that does not fit the business. Use these questions before you commit to any new system.",
      categories: ["category-consulting-advisory", "category-digital-transformation"],
      daysAgo: 6,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop",
      body: [
        p("New systems are often chosen on features. The better question is whether the system solves a defined business problem and fits the way your organisation works."),
        h2("Define the problem first"),
        bullet("What outcome should the new system deliver?"),
        bullet("How will you measure whether it worked?"),
        bullet("Which processes and teams will change?"),
        h2("Check fit with your current environment"),
        p("List the systems the new solution must connect to and confirm how data will move between them. Integration gaps are a common cause of delay and extra cost."),
        h2("Compare total cost, not purchase price"),
        p("Include implementation, training, support, licences and the cost of running old and new systems in parallel."),
        callout("info", "Ask vendors for a reference implementation similar in size and complexity to yours."),
        h3("Plan adoption before go-live"),
        p("Decide who owns the system, how users will be trained and how feedback will be handled after launch."),
      ],
    },
    {
      _id: "post-managed-services-or-in-house",
      title: "Managed services or an in-house team: how to decide",
      slug: "managed-services-or-in-house-team",
      excerpt:
        "Building every technology capability in-house is slow and costly. Here is how to decide what to keep internal and what to have managed.",
      categories: ["category-digital-transformation"],
      daysAgo: 12,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop",
      body: [
        p("Technology teams are expected to run daily operations and deliver change at the same time. Few organisations can staff both fully on their own."),
        h2("Keep in-house what differentiates you"),
        p("Capabilities tied to your strategy, customers or proprietary processes usually belong inside the organisation."),
        h2("Consider managed services for the rest"),
        bullet("Support and monitoring that must run around the clock"),
        bullet("Specialist skills needed only for part of the year"),
        bullet("Systems that are stable and well documented"),
        h2("Use dedicated specialists for projects"),
        p("For time-bound initiatives, dedicated specialists add capacity without long-term hiring commitments."),
        callout("tip", "Whatever the model, agree service levels and reporting in writing so performance is visible."),
      ],
    },
    {
      _id: "post-why-projects-stall-after-go-live",
      title: "Why technology projects stall after go-live",
      slug: "why-technology-projects-stall-after-go-live",
      excerpt:
        "A successful launch is not the same as a successful project. These are the common reasons value fails to appear, and how to prevent them.",
      categories: ["category-consulting-advisory"],
      daysAgo: 20,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&h=900&fit=crop",
      body: [
        p("Go-live is often treated as the finish line. In practice, it is when the organisation starts to find out whether the investment will pay off."),
        h2("No clear owner"),
        p("When the project team moves on, someone in the business must own the system, its data and its roadmap."),
        h2("Users were trained, but processes did not change"),
        p("If old workarounds remain available, people will keep using them. Retire them deliberately."),
        h2("Benefits were never measured"),
        p("Agree the measures of success before launch and review them at fixed points afterwards."),
        h3("A simple post-launch plan"),
        bullet("Named business owner and support model"),
        bullet("Adoption and performance reviews at 30, 60 and 90 days"),
        bullet("A backlog for improvements raised by users"),
      ],
    },
  ];

  for (const post of posts) {
    const publishedAt = new Date(Date.now() - post.daysAgo * 86_400_000).toISOString();
    tx.createOrReplace({
      _id: post._id,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      publishedAt,
      featured: Boolean(post.featured),
      author: { _type: "reference", _ref: authors[0]._id },
      categories: post.categories.map(ref),
      mainImage: {
        ...(await uploadImage(post.image, `${post._id}.jpg`)),
        alt: post.title,
      },
      body: post.body,
    });
  }

  await tx.commit();
  console.log(
    `Done: ${categories.length} categories, ${authors.length} author, ${posts.length} sample posts.`,
  );
}

run().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
