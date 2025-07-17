export interface PasswordBoxProps {
	title?: string;
	subtitle?: string;
	successTitle?: string;
	cancelTitle?: string;
	handleSubmit: (password: string) => Promise<void>;
	onBack?: () => void;
	onError?: () => void;
}