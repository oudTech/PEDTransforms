export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public (e.g. "/team/jane-doe.jpg") or an https URL on an allowed image host. */
  photo?: string;
  bio?: string;
  linkedin?: string;
};

// The Team section on the About page appears once at least one member is added.
export const team: TeamMember[] = [];
