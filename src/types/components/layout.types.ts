import { ReactNode } from 'react';
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

export interface ContainerProps {
  children: ReactNode;
  customClass?: string;
}

export interface ContainerShadowProps extends ContainerProps {}

export interface ContainerCardDetailProps extends ContainerProps {
  title?: string;
}

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  title?: string;
  titleId?: string;
} & RefAttributes<SVGSVGElement>;

export interface RegisterStepBoxProps {
  icon: ForwardRefExoticComponent<IconProps>;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
  completed: boolean;
  color?: string;
} 