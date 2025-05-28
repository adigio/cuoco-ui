export interface StepSectionProps {
  step: number;
  title: string;
  subtitle: string[]; 
  image: string;
  imageAlt: string;
  buttonText?: string;
  buttonLink?: string;
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