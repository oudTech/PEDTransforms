import type { StaticImageData } from "next/image";
import arinzeIjeoma from "@/assets/images/team/arinze-ijeoma.jpg";
import kateLeblanc from "@/assets/images/team/kate-leblanc.jpg";
import longlifeAbbey from "@/assets/images/team/longlife-abbey.jpg";
import ogochukwuEtu from "@/assets/images/team/ogochukwu-etu.jpg";

export type TeamMember = {
  name: string;
  role: string;
  /** Secondary line under the role, for specialist titles. */
  focus?: string;
  photo?: StaticImageData;
  /** One entry per paragraph. */
  bio: string[];
  linkedin?: string;
};

// The Team section on the About page appears once at least one member is added.
export const team: TeamMember[] = [
  {
    name: "Ogochukwu Paragon Etu, Ph.D.",
    role: "Managing Director / Chief Executive Officer",
    photo: ogochukwuEtu,
    bio: [
      "Dr. Ogochukwu Paragon Etu is a visionary technology executive, AI/ML specialist, and technology procurement expert with a multidisciplinary background in Information Systems Engineering, Telecommunication Engineering, and Intelligent Technology Solutions. He combines technical depth with strategic business insight to drive innovation, optimize organizational performance, and translate technology investments into sustainable business value.",
      "As Managing Director and Chief Executive Officer, Dr. Etu defines the company's strategic direction, drives business growth, and leads the delivery of technology-enabled transformation solutions. His leadership spans artificial intelligence, digital transformation, intelligent automation, technology procurement, and strategic partnerships. With a focus on innovation, operational excellence, and measurable client outcomes, he is committed to positioning PEDTransforms as a trusted partner helping organizations navigate complexity, accelerate modernization, and build lasting competitive advantage.",
    ],
  },
  {
    name: "Arinze Ijeoma",
    role: "Lead – Technology and Digital Transformation",
    photo: arinzeIjeoma,
    bio: [
      "Arinze Ijeoma is a multidisciplinary German-trained technology professional specializing in AI engineering, data science, and digital transformation. With expertise in High-Performance Computing (HPC), Python, C++, and computational modelling, he bridges scientific innovation and practical business applications to develop intelligent, data-driven solutions.",
      "At PEDTransforms, Arinze drives technology-enabled innovation, leveraging artificial intelligence, advanced computing, and smart technologies to optimize business processes, enhance operational efficiency, and accelerate digital transformation. His multidisciplinary expertise spans AI engineering, scientific computing, photonics, and smart energy management, with a vision to empower organizations through scalable, intelligent, and sustainable technology solutions.",
    ],
  },
  {
    name: "Longlife O. Abbey",
    role: "Lead – Strategy and Client Relationship",
    photo: longlifeAbbey,
    bio: [
      "Longlife O. Abbey is a strategy and client relationship professional focused on business growth, strategic partnerships, and client-centric solutions. With an emphasis on strategic thinking, stakeholder engagement, and business development, he bridges organizational objectives with client needs to foster meaningful relationships and sustainable business opportunities.",
      "He drives strategic engagement and client relationship development, aligning the company’s technology and digital transformation services with evolving business needs. His focus on strategic planning, partnership development, and client value creation supports organizational growth, strengthens stakeholder confidence, and cultivates long-term business relationships.",
    ],
  },
  {
    name: "Kate LeBlanc",
    role: "Specialist Partner",
    focus: "Accessibility, Workforce Transformation & Operational Adoption",
    photo: kateLeblanc,
    bio: [
      "Kate LeBlanc brings specialist expertise in accessibility, employee workflow, technology adoption and operational effectiveness, supporting PEDTransforms’ broader consulting and digital transformation capabilities. Her focus is on helping organisations improve how people interact with technology, adopt new systems and processes effectively, and manage operational risks associated with technology-enabled transformation.",
      "As a Specialist Partner, Kate contributes expertise to selected client engagements where accessibility, workforce adoption, employee workflow and operational effectiveness are important to the success of a transformation initiative. Her role complements PEDTransforms’ capabilities in digital transformation, automation, technology procurement and consulting, helping ensure that technology solutions are practical, accessible and effectively adopted across the organisation.",
      "Her engagement with PEDTransforms is structured around specific opportunities and client requirements, allowing her specialist expertise to be integrated where it provides meaningful value to a transformation programme.",
    ],
  },
];
