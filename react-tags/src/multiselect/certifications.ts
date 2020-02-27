const certifications = [
  "American Board of Allergy and Immunology",
  "American Board of Anesthesiology",
  "American Board of Colon and Rectal Surgery",
  "American Board of Dermatology",
  "American Board of Emergency Medicine",
  "American Board of Family Medicine",
  "American Board of Internal Medicine",
  "American Board of Medical Genetics and Genomics"
];

export const suggestions = certifications.map((certification: string) => ({
  label: certification,
  value: certification
}));

export type ISuggestionType = {
  label: string;
  value: string;
};
