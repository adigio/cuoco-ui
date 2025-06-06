import Button from "@/components/shared/form/Button";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BRAND_COLORS } from "@/constants/colors";

export const UpgradePlan = ({
    title = 'Para desbloquear esta funcionalidad, actualiza tu plan',
    onUpgradeClick,
    children
}: {    
    title: string;
    onUpgradeClick: () => void;
    children?: React.ReactNode;
}) => {
    return (
        <div className="bg-[#f9c8bf] text-white h-auto p-5 rounded-2xl my-2"> 
            <div className="flex items-center justify-center">
                <span className="flex items-center gap-2 text-2xl rounded-full bg-white p-4 text-red-400">
                    <FontAwesomeIcon className='w-4 h-4' icon={faLock} />
                </span>
            </div>

            <h1 className={`text-[${BRAND_COLORS.text.primary}] text-2xl font-bold`}>{title}</h1>

            <Button
                variant="primary"
                size="lg"
                className="w-full mt-4"
                onClick={onUpgradeClick}
            >
                Actualizar Plan
            </Button>
        </div>
    )
}