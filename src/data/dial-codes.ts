export type DialCode = { iso: string; country: string; code: string };

/** Countries offered in the contact form's phone prefix, Nigeria first. */
export const dialCodes: DialCode[] = [
  { iso: "NG", country: "Nigeria", code: "+234" },
  { iso: "GH", country: "Ghana", code: "+233" },
  { iso: "KE", country: "Kenya", code: "+254" },
  { iso: "ZA", country: "South Africa", code: "+27" },
  { iso: "CM", country: "Cameroon", code: "+237" },
  { iso: "BJ", country: "Benin", code: "+229" },
  { iso: "TG", country: "Togo", code: "+228" },
  { iso: "CI", country: "Côte d’Ivoire", code: "+225" },
  { iso: "SN", country: "Senegal", code: "+221" },
  { iso: "EG", country: "Egypt", code: "+20" },
  { iso: "RW", country: "Rwanda", code: "+250" },
  { iso: "GB", country: "United Kingdom", code: "+44" },
  { iso: "IE", country: "Ireland", code: "+353" },
  { iso: "US", country: "United States", code: "+1" },
  { iso: "CA", country: "Canada", code: "+1" },
  { iso: "AE", country: "United Arab Emirates", code: "+971" },
  { iso: "SA", country: "Saudi Arabia", code: "+966" },
  { iso: "QA", country: "Qatar", code: "+974" },
  { iso: "DE", country: "Germany", code: "+49" },
  { iso: "FR", country: "France", code: "+33" },
  { iso: "NL", country: "Netherlands", code: "+31" },
  { iso: "IN", country: "India", code: "+91" },
  { iso: "CN", country: "China", code: "+86" },
];

export const defaultDialCode = "NG";

export function flagEmoji(iso: string) {
  return String.fromCodePoint(...[...iso.toUpperCase()].map((char) => 0x1f1a5 + char.charCodeAt(0)));
}
