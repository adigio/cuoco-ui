import { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";

export interface RegisterStepBoxProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
  completed: boolean;
  color?: string;
}
export interface RegisterStepperProps {
  step: number;
  onComplete: () => void;
  onBack?: () => void;
}
