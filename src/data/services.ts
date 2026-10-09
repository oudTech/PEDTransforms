export type ServiceCategoryId =
  | "digital-transformation"
  | "automation-smart-systems"
  | "consulting-advisory";

export type ServiceCategory = {
  id: ServiceCategoryId;
  number: string;
  title: string;
  tagline: string;
  summary: string;
};

export type SubService = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategoryId;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  summary: string;
  image: string;
  imageAlt: string;
  challenges: string[];
  capabilities: { title: string; description: string }[];
  outcomes: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "digital-transformation",
    number: "01",
    title: "Digital Transformation",
    tagline: "Digitise. Integrate. Transform.",
    summary:
      "Modernise how your organisation works with the right technology, delivered and supported by the right people.",
  },
  {
    id: "automation-smart-systems",
    number: "02",
    title: "Automation & Smart Systems",
    tagline: "Connect. Automate. Monitor.",
    summary:
      "Connect equipment and systems, automate processes and gain real-time visibility and control of operations.",
  },
  {
    id: "consulting-advisory",
    number: "03",
    title: "Consulting & Advisory",
    tagline: "Assess. Strategise. Optimise.",
    summary:
      "Make informed technology and business decisions, then deliver them with structured project and implementation support.",
  },
];

export const subServices: SubService[] = [
  {
    slug: "technology-digital-solutions",
    title: "Technology & Digital Solutions",
    shortTitle: "Technology & Digital",
    category: "digital-transformation",
    metaTitle: "Technology & Digital Solutions",
    metaDescription:
      "Technology procurement, enterprise software, cloud, cybersecurity, data and business intelligence, AI and process digitisation from PEDTransforms.",
    headline: "The right technology, sourced and implemented for your business",
    intro:
      "We help organisations select, procure and implement the technology that modernises how they work, from enterprise software and cloud to data, AI and secure digital processes.",
    summary:
      "Procurement, enterprise software, cloud, cybersecurity, data, AI and process digitisation.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=900&fit=crop",
    imageAlt: "Close-up of a circuit board representing enterprise technology",
    challenges: [
      "Manual, paper-based or disconnected processes slow work down",
      "Uncertainty about which technology or vendor to choose",
      "Data spread across systems with no single view of performance",
      "Growing exposure to cyber threats as operations move online",
    ],
    capabilities: [
      {
        title: "Technology procurement & sourcing",
        description:
          "We define requirements, compare vendors and source hardware, software and licences that fit your budget and objectives.",
      },
      {
        title: "Software & enterprise solutions",
        description:
          "Selection, configuration and rollout of enterprise applications that support finance, operations and customer processes.",
      },
      {
        title: "Cloud & cybersecurity",
        description:
          "Secure cloud adoption and protection of users, devices and data against evolving threats.",
      },
      {
        title: "Data & business intelligence",
        description:
          "Consolidating data into trusted reports and dashboards so decisions are based on accurate, timely information.",
      },
      {
        title: "AI & digital solutions",
        description:
          "Practical use of AI and emerging technologies to automate tasks, improve service and unlock new capabilities.",
      },
      {
        title: "Business process digitisation",
        description:
          "Replacing manual and paper-based workflows with digital processes that are faster, traceable and easier to manage.",
      },
    ],
    outcomes: [
      "Technology investments matched to clear business objectives",
      "Faster, more reliable processes with less manual effort",
      "One trusted view of data for better decisions",
      "Stronger protection of systems, data and users",
    ],
    process: [
      {
        title: "Assess",
        description: "Review objectives, current systems and gaps.",
      },
      {
        title: "Source",
        description: "Shortlist and procure the right solutions and vendors.",
      },
      {
        title: "Implement",
        description: "Configure, integrate and migrate with minimal disruption.",
      },
      {
        title: "Support",
        description: "Train users and provide ongoing support to sustain value.",
      },
    ],
    faqs: [
      {
        question: "Do you only sell specific technology brands?",
        answer:
          "No. We start from your requirements and recommend the solutions that best fit your objectives, budget and existing environment.",
      },
      {
        question: "Can you handle both procurement and implementation?",
        answer:
          "Yes. We can source the technology, implement it and provide ongoing support, so one partner is accountable from start to finish.",
      },
      {
        question: "Can you work with the systems we already have?",
        answer:
          "Yes. We assess your current environment first and integrate new solutions with existing systems wherever practical.",
      },
      {
        question: "How do you approach cybersecurity?",
        answer:
          "Security is built into every solution we deliver, covering users, devices, data and cloud services rather than being added at the end.",
      },
    ],
    related: ["technology-talent-managed-services", "business-technology-advisory"],
  },
  {
    slug: "technology-talent-managed-services",
    title: "Technology Talent & Managed Services",
    shortTitle: "Talent & Managed Services",
    category: "digital-transformation",
    metaTitle: "Technology Talent & Managed Services",
    metaDescription:
      "Last-mile technology talent recruitment, team augmentation, specialist resources and managed technology services and support from PEDTransforms.",
    headline: "The right technology people, when and where you need them",
    intro:
      "Technology delivers value only when the right people run it. We recruit specialist technology talent, extend your teams and manage technology operations so your systems keep performing.",
    summary:
      "Talent recruitment, team augmentation, specialist resources and managed technology services.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=900&fit=crop",
    imageAlt: "Technology team collaborating around a table",
    challenges: [
      "Hard-to-find technology skills delay critical projects",
      "Internal teams are stretched by day-to-day support",
      "Short-term projects need specialists without permanent hires",
      "Technology operations lack consistent monitoring and support",
    ],
    capabilities: [
      {
        title: "Last-mile technology talent recruitment",
        description:
          "Targeted recruitment for hard-to-fill technology roles, focused on the final, specialist skills a project depends on.",
      },
      {
        title: "Technology team augmentation",
        description:
          "Qualified professionals who join your team to add capacity or expertise for as long as you need them.",
      },
      {
        title: "Specialist technical resources",
        description:
          "Access to engineers, analysts and technical specialists for defined projects, assessments and deployments.",
      },
      {
        title: "Managed technology services",
        description:
          "We take responsibility for running agreed parts of your technology environment to defined service levels.",
      },
      {
        title: "Technology support & operations",
        description:
          "Day-to-day support, monitoring and maintenance that keep systems available and users productive.",
      },
    ],
    outcomes: [
      "Faster access to specialised technology skills",
      "Flexible team capacity without long-term overhead",
      "Internal teams freed to focus on strategic work",
      "Reliable, well-supported technology operations",
    ],
    process: [
      {
        title: "Define",
        description: "Clarify the skills, roles or services required.",
      },
      {
        title: "Match",
        description: "Source and screen the right people or service model.",
      },
      {
        title: "Onboard",
        description: "Integrate resources into your team and processes.",
      },
      {
        title: "Manage",
        description: "Monitor performance and adjust as needs change.",
      },
    ],
    faqs: [
      {
        question: "What does last-mile technology talent mean?",
        answer:
          "It refers to the specialist skills that are hardest to find and often hold a project back. We focus on filling those specific gaps.",
      },
      {
        question: "Can we augment our team for a single project?",
        answer:
          "Yes. Team augmentation can be arranged for a defined project or period and scaled up or down as requirements change.",
      },
      {
        question: "Which technology services can you manage?",
        answer:
          "We agree the scope with you, which can include support, monitoring, maintenance and operation of specific systems or environments.",
      },
      {
        question: "Do you provide permanent recruitment as well?",
        answer:
          "We recruit for technology roles to match your hiring model. Tell us what you need and we will recommend the best approach.",
      },
    ],
    related: ["technology-digital-solutions", "project-implementation-advisory"],
  },
  {
    slug: "forecourt-fuel-automation",
    title: "Forecourt & Fuel Automation",
    shortTitle: "Forecourt & Fuel",
    category: "automation-smart-systems",
    metaTitle: "Forecourt & Fuel Automation",
    metaDescription:
      "Forecourt automation, fuel and fleet management, wetstock and tank monitoring and remote station monitoring for fuel retailers and fleet operators.",
    headline: "Control, visibility and accuracy across every station and tank",
    intro:
      "We automate forecourt and fuel operations so retailers and fleet operators can control dispensing, track every litre and monitor stations remotely.",
    summary:
      "Forecourt automation, fuel and fleet management, wetstock and remote station monitoring.",
    image:
      "https://images.unsplash.com/photo-1654334036171-e01e52b2ce8e?w=1400&h=900&fit=crop",
    imageAlt: "Fuel dispenser nozzles at a station forecourt",
    challenges: [
      "Fuel losses that are difficult to detect and explain",
      "Manual tank dips and reconciliations that are slow and error-prone",
      "Limited visibility of remote or multiple stations",
      "Unauthorised or untracked fleet fuel usage",
    ],
    capabilities: [
      {
        title: "Forecourt automation",
        description:
          "Connecting pumps, controllers and point-of-sale systems so dispensing, pricing and transactions are managed centrally.",
      },
      {
        title: "Fuel & fleet management",
        description:
          "Controlling and recording fuel issued to vehicles, with consumption reporting by vehicle, driver and site.",
      },
      {
        title: "Wetstock & tank monitoring",
        description:
          "Automatic tank gauging and reconciliation that track stock levels, deliveries and variances in real time.",
      },
      {
        title: "Remote station monitoring",
        description:
          "Live visibility of station equipment, stock and sales from a central location, with alerts when attention is needed.",
      },
    ],
    outcomes: [
      "Early detection of fuel losses and variances",
      "Accurate, automated stock reconciliation",
      "Central oversight of every station",
      "Accountable fleet fuel consumption",
    ],
    process: [
      {
        title: "Survey",
        description: "Assess sites, equipment and existing systems.",
      },
      {
        title: "Design",
        description: "Specify the automation and monitoring solution.",
      },
      {
        title: "Install",
        description: "Deploy, integrate and commission on site.",
      },
      {
        title: "Monitor",
        description: "Provide ongoing monitoring, reporting and support.",
      },
    ],
    faqs: [
      {
        question: "Who is forecourt and fuel automation for?",
        answer:
          "Fuel retailers, station operators and organisations that run vehicle fleets or private fuel installations.",
      },
      {
        question: "Can this work with our existing pumps and tanks?",
        answer:
          "In many cases, yes. We survey your sites first and recommend integration with existing equipment wherever it is compatible.",
      },
      {
        question: "What is wetstock monitoring?",
        answer:
          "It is the continuous measurement and reconciliation of fuel in tanks against deliveries and sales, used to identify leaks, theft and measurement errors.",
      },
      {
        question: "Can we monitor several stations from one place?",
        answer:
          "Yes. Remote station monitoring brings stock, equipment status and sales from multiple sites into a single view.",
      },
    ],
    related: ["smart-systems-integration", "project-implementation-advisory"],
  },
  {
    slug: "smart-systems-integration",
    title: "Smart Systems & Integration",
    shortTitle: "Smart Systems",
    category: "automation-smart-systems",
    metaTitle: "Smart Systems, IoT & Systems Integration",
    metaDescription:
      "IoT and remote monitoring, process automation, systems integration and smart dashboards that give real-time visibility and control of operations.",
    headline: "Connected systems that run smarter and report in real time",
    intro:
      "We connect equipment, applications and data so processes run automatically and decision-makers see what is happening across operations as it happens.",
    summary:
      "IoT and remote monitoring, process automation, systems integration and smart dashboards.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&h=900&fit=crop",
    imageAlt: "Engineer using a tablet to monitor connected equipment",
    challenges: [
      "Systems that do not share data, creating duplicate work",
      "Repetitive manual processes that waste time and cause errors",
      "No real-time view of equipment, assets or operations",
      "Problems discovered too late to prevent disruption",
    ],
    capabilities: [
      {
        title: "IoT & remote monitoring",
        description:
          "Sensors and connected devices that track equipment, assets and environments from anywhere.",
      },
      {
        title: "Process automation",
        description:
          "Automating repetitive, rules-based tasks to reduce manual effort, errors and turnaround time.",
      },
      {
        title: "Systems integration",
        description:
          "Connecting applications, devices and data sources so information flows reliably between them.",
      },
      {
        title: "Smart dashboards & intelligent monitoring",
        description:
          "Real-time dashboards and alerts that turn operational data into clear, actionable information.",
      },
    ],
    outcomes: [
      "Real-time visibility of operations and assets",
      "Less manual work and fewer errors",
      "Systems and data that work together",
      "Faster response to issues before they escalate",
    ],
    process: [
      {
        title: "Map",
        description: "Document processes, systems and data flows.",
      },
      {
        title: "Design",
        description: "Define integrations, automation and monitoring.",
      },
      {
        title: "Build",
        description: "Connect, automate and test end to end.",
      },
      {
        title: "Optimise",
        description: "Monitor results and refine over time.",
      },
    ],
    faqs: [
      {
        question: "What kinds of systems can you integrate?",
        answer:
          "Business applications, operational equipment, IoT devices and data platforms. We confirm compatibility during the design stage.",
      },
      {
        question: "Which processes are suitable for automation?",
        answer:
          "Repetitive, rules-based tasks with clear inputs and outputs, such as data entry, approvals, reporting and alerts, are usually the best starting point.",
      },
      {
        question: "Can dashboards combine data from different systems?",
        answer:
          "Yes. Integration brings data from multiple sources together so dashboards show a single, consistent picture.",
      },
      {
        question: "Do we need to replace our existing systems?",
        answer:
          "Not usually. Integration and automation are designed to get more value from the systems you already use.",
      },
    ],
    related: ["forecourt-fuel-automation", "technology-digital-solutions"],
  },
  {
    slug: "business-technology-advisory",
    title: "Business & Technology Advisory",
    shortTitle: "Business & Technology Advisory",
    category: "consulting-advisory",
    metaTitle: "Business & Technology Advisory",
    metaDescription:
      "Digital transformation strategy, business process optimisation, technology assessment and selection, IT strategy and procurement advisory.",
    headline: "Clear, independent guidance for technology and business decisions",
    intro:
      "We help leadership teams decide where technology will create the most value, which solutions to choose and how to improve the processes they support.",
    summary:
      "Transformation strategy, process optimisation, technology selection, IT strategy and procurement advice.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=900&fit=crop",
    imageAlt: "Advisors and leadership team discussing strategy",
    challenges: [
      "No clear roadmap for digital transformation",
      "Processes that are inefficient or poorly understood",
      "Difficulty comparing technology options and vendors",
      "Technology spending that is not linked to business goals",
    ],
    capabilities: [
      {
        title: "Digital transformation strategy",
        description:
          "A prioritised roadmap that links technology initiatives to business objectives and measurable results.",
      },
      {
        title: "Business process optimisation",
        description:
          "Analysing how work is done today and redesigning processes to remove waste, delay and risk.",
      },
      {
        title: "Technology assessment & selection",
        description:
          "Objective evaluation of current systems and new options against your requirements, costs and risks.",
      },
      {
        title: "IT & technology strategy",
        description:
          "Defining the technology direction, architecture and capabilities your organisation needs to grow.",
      },
      {
        title: "Procurement & technology advisory",
        description:
          "Guidance on requirements, tenders, vendor evaluation and contracts so you buy the right solution on the right terms.",
      },
    ],
    outcomes: [
      "A clear, prioritised transformation roadmap",
      "Leaner, better-performing processes",
      "Confident, well-evidenced technology choices",
      "Technology spend aligned to business value",
    ],
    process: [
      {
        title: "Discover",
        description: "Understand objectives, challenges and the current state.",
      },
      {
        title: "Analyse",
        description: "Assess processes, systems and options.",
      },
      {
        title: "Recommend",
        description: "Deliver a practical strategy and roadmap.",
      },
      {
        title: "Guide",
        description: "Support decisions and procurement through to delivery.",
      },
    ],
    faqs: [
      {
        question: "Are your recommendations vendor-neutral?",
        answer:
          "Yes. Our advice is based on your requirements and objectives, and we evaluate options objectively.",
      },
      {
        question: "What do we receive at the end of an advisory engagement?",
        answer:
          "Typically a clear assessment of the current state, prioritised recommendations and a practical roadmap, agreed at the start of the engagement.",
      },
      {
        question: "Can you support us through procurement?",
        answer:
          "Yes. We can help define requirements, run vendor evaluations and review proposals and contracts.",
      },
      {
        question: "Can you also implement what you recommend?",
        answer:
          "Yes. Our project and implementation advisory and technology services can carry recommendations through to delivery.",
      },
    ],
    related: ["project-implementation-advisory", "technology-digital-solutions"],
  },
  {
    slug: "project-implementation-advisory",
    title: "Project & Implementation Advisory",
    shortTitle: "Project & Implementation",
    category: "consulting-advisory",
    metaTitle: "Project & Implementation Advisory",
    metaDescription:
      "Systems assessment, automation advisory, project management and technology implementation support that keep technology projects on time and on budget.",
    headline: "Technology projects delivered on time, on budget and to plan",
    intro:
      "We assess systems, advise on automation and manage technology projects so implementations deliver the results they were approved to achieve.",
    summary:
      "Systems assessment, automation advisory, project management and implementation support.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1400&h=900&fit=crop",
    imageAlt: "Project team planning an implementation on a whiteboard",
    challenges: [
      "Projects that overrun on time or budget",
      "Unclear scope, ownership and milestones",
      "Uncertainty about the health of existing systems",
      "Implementations that do not deliver expected benefits",
    ],
    capabilities: [
      {
        title: "Systems assessment",
        description:
          "Independent review of existing systems to identify risks, gaps and opportunities before you invest further.",
      },
      {
        title: "Automation advisory",
        description:
          "Identifying where automation will have the greatest impact and how to implement it safely.",
      },
      {
        title: "Project management",
        description:
          "Structured planning, governance and reporting that keep scope, time, cost and quality under control.",
      },
      {
        title: "Technology implementation support",
        description:
          "Hands-on support during deployment, testing, data migration and go-live to reduce risk and disruption.",
      },
    ],
    outcomes: [
      "Projects delivered to agreed scope, time and budget",
      "Clear governance and progress reporting",
      "Reduced implementation risk",
      "Benefits realised after go-live",
    ],
    process: [
      {
        title: "Assess",
        description: "Review systems, scope and readiness.",
      },
      {
        title: "Plan",
        description: "Set scope, milestones, roles and governance.",
      },
      {
        title: "Deliver",
        description: "Manage execution, risks and reporting.",
      },
      {
        title: "Handover",
        description: "Support go-live and confirm benefits.",
      },
    ],
    faqs: [
      {
        question: "Can you take over a project that is already underway?",
        answer:
          "Yes. We start with a rapid assessment of status, risks and scope, then agree a recovery or delivery plan.",
      },
      {
        question: "Do you manage projects delivered by other vendors?",
        answer:
          "Yes. We can act on your behalf to coordinate vendors, track progress and keep delivery accountable.",
      },
      {
        question: "What does a systems assessment cover?",
        answer:
          "It reviews performance, security, integration, support and fitness for purpose, and highlights risks and recommended next steps.",
      },
      {
        question: "Can you support us after go-live?",
        answer:
          "Yes. Implementation support can continue after go-live, and our managed services can take on ongoing operations.",
      },
    ],
    related: ["business-technology-advisory", "smart-systems-integration"],
  },
];

export function getSubService(slug: string) {
  return subServices.find((service) => service.slug === slug);
}

export function getCategory(id: ServiceCategoryId) {
  return serviceCategories.find((category) => category.id === id)!;
}

export function servicesInCategory(id: ServiceCategoryId) {
  return subServices.filter((service) => service.category === id);
}
