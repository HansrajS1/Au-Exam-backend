export const allowedPaperKeys = [
  'college',
  'course',
  'description',
  'file_url',
  'preview_image_url',
  'semester',
  'subject',
  'user_email',
];

export const toSnakeCase = (raw) => ({
  college: raw.college,
  course: raw.course,
  semester: raw.semester,
  subject: raw.subject,
  description: raw.description,
  file_url: raw.fileUrl,
  preview_image_url: raw.previewImageUrl,
  user_email: raw.userEmail,
});

export const toCamelCase = (row) => ({
  id: row.id,
  college: row.college,
  course: row.course,
  semester: row.semester,
  subject: row.subject,
  description: row.description,
  fileUrl: row.file_url,
  previewImageUrl: row.preview_image_url,
  userEmail: row.user_email,
});
