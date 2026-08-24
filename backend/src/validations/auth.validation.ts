export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  age?: number;
  gender?: string;
  heightCm?: number;
  currentWeightKg?: number;
  targetWeightKg?: number;
}

export const validateRegisterInput = (body: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
    errors.push('Valid email is required');
  }
  if (!body.password || typeof body.password !== 'string' || body.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  if (!body.fullName || typeof body.fullName !== 'string') {
    errors.push('Full name is required');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateLoginInput = (body: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!body.email || typeof body.email !== 'string') {
    errors.push('Email is required');
  }
  if (!body.password || typeof body.password !== 'string') {
    errors.push('Password is required');
  }
  return { isValid: errors.length === 0, errors };
};
