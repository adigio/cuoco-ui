import Button from "@/components/shared/form/Button";
import Link from "next/link";

export const ActionButton = ({ buttonText, buttonLink }: { buttonText?: string; buttonLink?: string }) => (
    (buttonText && buttonLink) && (
        <div className="flex justify-center mt-6">
            <Link href={buttonLink}>
                <Button
                    variant="primary"
                    size="md"
                >
                    {buttonText}
                </Button>
            </Link>
        </div>
    )
);