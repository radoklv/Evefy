import { SalesOutput } from "./types/agents";

export const MOCK_RESPONSE: SalesOutput = {
  date: "October 24, 2025",
  to: "Ms. Alexandra Smith, Chief Learning Officer, Acme Corporation",
  from: "LearningTech Solutions, Inc.",
  subject: "Official Proposal – LMS Modernization and Integration Project",
  executiveSummary:
    "LearningTech Solutions is pleased to submit this proposal to modernize and integrate your Learning Management System (LMS). Over a six-month engagement, our cross-functional team of architects, engineers, developers, designers and compliance specialists will deliver a fully accessible, secure, scalable LMS platform with seamless SSO integration, advanced analytics, and comprehensive training materials. This approach ensures on-time delivery, adherence to WCAG and GDPR standards, and a reliable, future-ready infrastructure.",
  assumptions: [
    "Project duration of six (6) months, based on a standard 40-hour work week and 22 working days per month.",
    "All pricing is based on fully loaded labor rates and includes project management, technical leadership and standard tooling.",
    "Travel and out-of-pocket expenses are not included and will be billed separately if required.",
    "Client will provide timely access to existing systems, stakeholders and documentation to avoid schedule delays.",
    "Scope changes or additional requirements will be managed via a change control process and may impact cost and timeline.",
  ],
  workforceBreakdown: [
    {
      role: "Solution Architect",
      fte: 0.5,
      unit: "6-month engagement",
    },
    {
      role: "Cloud/Infrastructure Engineer (Terraform, Kubernetes)",
      fte: 1,
      unit: "6-month engagement",
    },
    {
      role: "Backend Developer (microservices, API design)",
      fte: 3,
      unit: "6-month engagement",
    },
    {
      role: "Frontend Developer (WCAG-compliant SPA)",
      fte: 2,
      unit: "6-month engagement",
    },
    {
      role: "DevOps Engineer (CI/CD, deployments, monitoring)",
      fte: 1,
      unit: "6-month engagement",
    },
    {
      role: "QA Engineer (functional, performance, security, accessibility)",
      fte: 2,
      unit: "6-month engagement",
    },
    {
      role: "Security Engineer (OWASP ASVS, penetration testing)",
      fte: 0.5,
      unit: "6-month engagement",
    },
    {
      role: "Privacy/GDPR Compliance Officer",
      fte: 0.5,
      unit: "6-month engagement",
    },
    {
      role: "Data Engineer (xAPI LRS, reporting, analytics)",
      fte: 1,
      unit: "6-month engagement",
    },
    {
      role: "Integration Specialist (SSO/SAML/OIDC, HRIS, webhooks)",
      fte: 1,
      unit: "6-month engagement",
    },
    {
      role: "UX/Accessibility Designer",
      fte: 0.5,
      unit: "6-month engagement",
    },
    {
      role: "Technical Writer / Training Content Specialist",
      fte: 0.5,
      unit: "6-month engagement",
    },
    {
      role: "Project Manager / Scrum Master",
      fte: 1,
      unit: "6-month engagement",
    },
  ],
  subtotal: "$1,563,000",
  contingency: "10% of subtotal ($156,300)",
  totalCost: "$1,719,300",
  optionsAndNextSteps: [
    "Review and sign the Master Services Agreement (MSA) to formalize engagement.",
    "Schedule a project kickoff workshop to align on scope and deliverables.",
    "Establish regular sprint planning and review ceremonies.",
    "Confirm communication protocols and escalation paths.",
    "Set up initial access to client environments and stakeholder meeting cadence.",
  ],
  closing:
    "Thank you for considering LearningTech Solutions for this strategic initiative. We are committed to delivering a best-in-class LMS modernization that meets your technical, security and accessibility requirements. We look forward to partnering with Acme Corporation to drive successful learning outcomes and long-term value.",
  contact: {
    name: "Jane Doe",
    title: "Director of Business Development",
    email: "jane.doe@learningtech.com",
    phone: "(123) 456-7890",
  },
};
