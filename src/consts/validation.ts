import { FormEvent } from 'react';

export const WEAK_PASSWORD_MESSAGE =
  'Password must be 8+ characters with an uppercase, lowercase, number, and special character.';

export const REQUIRED_MESSAGE = 'Required field.';
export const INVALID_EMAIL_MESSAGE = 'Invalid email format.';
export const INVALID_PHONE_MESSAGE =
  'Phone number must only contain #, +, * and numeric characters.';

export const COMMON_INPUT_VALIDATIONS = {
  maxLength: 50,
  onInput: (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s+]/g, '');
  },
};

export const ONLY_INPUT_NUMBER = {
  onInput: (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9\.]/g, '');
  },
};

export const ONLY_ALPHANUMERIC = {
  onInput: (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z0-9]/g, '');
  },
};

export const ONLY_ALPHANUMERIC_WITH_SPACE = {
  onInput: (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(
      /[^A-Za-z0-9\s+]/g,
      ''
    );
  },
};

export const DECIMAL_10_2_INPUT = {
  onInput: (e: FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;

    // Allow only digits, one decimal point, and one minus sign at the beginning
    value = value.replace(/[^\d.]/g, '');
    value = value.replace(/^0+/g, '0');

    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit integer part to 8 digits (10-2)
    const [intPart, decPart] = value.split('.');
    const cleanIntPart = intPart.replace(/^-/, '');
    if (cleanIntPart.length > 8) {
      const newIntPart = cleanIntPart.substring(0, 8);
      value = newIntPart + (decPart ? '.' + decPart : '');
    }

    // Limit decimal part to 2 digits
    if (decPart && decPart.length > 2) {
      value = intPart + '.' + decPart.substring(0, 2);
    }

    e.currentTarget.value = value;
  },
  // Optional: Add pattern for HTML5 validation
  pattern: '^-?\\d{1,8}(\\.\\d{0,2})?$',
};
