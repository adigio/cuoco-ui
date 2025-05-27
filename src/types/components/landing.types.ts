export interface StepSectionProps {
  step: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonText?: string;
  reverse?: boolean;
  id?: string;
  showConnector?: boolean;
} 

export interface BenefitCardProps {
  img: string;
  imgAlt: string;
  title: string;
  subtitle: string;
}