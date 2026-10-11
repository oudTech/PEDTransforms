const steps = [
  {
    title: "Create a Sanity project",
    body: (
      <>
        Go to{" "}
        <a
          href="https://www.sanity.io/manage"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
        >
          sanity.io/manage
        </a>{" "}
        and create a project with a <code>production</code> dataset.
      </>
    ),
  },
  {
    title: "Add your credentials",
    body: (
      <>
        Copy the project ID into <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in{" "}
        <code>.env.local</code>, then restart the dev server.
      </>
    ),
  },
  {
    title: "Allow this site in CORS",
    body: (
      <>
        In the project&apos;s API settings, add <code>http://localhost:3000</code>{" "}
        as a CORS origin with credentials allowed.
      </>
    ),
  },
  {
    title: "Write your first post",
    body: (
      <>
        Open <code>/studio</code> to publish content, or run{" "}
        <code>npm run sanity:seed</code> to load sample posts.
      </>
    ),
  },
];

export default function SanitySetupNotice() {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-black/8 bg-white p-6 shadow-sm sm:p-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Setup required
      </span>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#1a1a1a]">
        Connect Sanity to power the blog
      </h2>
      <p className="mt-2 text-[#1f1f1f]">
        The blog reads its content from Sanity. Every credential is loaded from{" "}
        <code className="rounded bg-[#f4f4f5] px-1.5 py-0.5 text-sm">.env.local</code>
        ; see <code className="rounded bg-[#f4f4f5] px-1.5 py-0.5 text-sm">.env.example</code>{" "}
        for the full list.
      </p>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div className="text-sm leading-relaxed text-[#1f1f1f] [&_code]:rounded [&_code]:bg-[#f4f4f5] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:text-[#1a1a1a]">
              <p className="font-semibold text-[#1a1a1a]">{step.title}</p>
              <p className="mt-0.5">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
