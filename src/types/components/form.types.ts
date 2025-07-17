import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, ChangeEvent } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'purple' | 'facebook' | 'google';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  outlined?: boolean;
  children: ReactNode;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface CheckboxProps {
  id?: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  title: string;
  options: SelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
  titleClassName?: string;
  checkboxGroupClassName?: string;
  orientation?: 'horizontal' | 'vertical';
} 

