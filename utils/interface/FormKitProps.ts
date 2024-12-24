export interface FormKitProps {
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'submit';
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | number | boolean | null;
  options?: { label: string; value: string | number }[];
  validation?: string;
  disabled?: boolean;
}
