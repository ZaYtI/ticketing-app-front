export interface FormKitProps {
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'submit' | 'datetime-local';
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | number | boolean | null;
  validation?: string;
  validationMessages?: Record<string, string>;
  disabled?: boolean;
  options?: any;
  default?: any;
}
