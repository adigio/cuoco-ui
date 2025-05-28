'use client';
import Modal from '@/components/shared/modal/Modal';
import Button from '@/components/shared/form/Button';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-3xl"
            padding="p-8"
            containerClassName="flex flex-col gap-6"
        >
            <div className="grid md:grid-cols-2 gap-6">
                {/* Plan Básico */}
                <div className="bg-gray-100 rounded-xl p-6 flex flex-col gap-4">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-[#f37b6a]">Plan Básico</h3>
                        <p className="text-xl font-bold mt-2">$0 / mes</p>
                        <p className="text-gray-600 text-sm mt-1">
                            Ideal para probar la app y cocinar con lo que tenés.
                        </p>
                    </div>

                    <div className="space-y-3 flex-grow">
                        <div className="flex items-start gap-2">
                            <span>✓</span>
                            <p>Acceso a recetas y funcionalidades básicas.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>✓</span>
                            <p>Tipo de dieta y nivel de cocina.</p>
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-full mt-4"
                    >
                        Continuar
                    </Button>
                </div>

                {/* Plan Premium */}
                <div className="bg-[#ffd4ce] rounded-xl p-6 flex flex-col gap-4">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-[#f37b6a]">Plan Premium</h3>
                        <p className="text-xl font-bold mt-2">$3000 / mes</p>
                        <p className="text-gray-600 text-sm mt-1">
                            Para quienes quieren personalización y más recetas.
                        </p>
                    </div>

                    <div className="space-y-3 flex-grow">
                        <div className="flex items-start gap-2">
                            <span>✓</span>
                            <p>Acceso al Plan Básico</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>✓</span>
                            <p>Recetas ilimitadas</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>✓</span>
                            <p>Guardar recetas favoritas ilimitadas</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>✓</span>
                            <p>Guardar preferencias y filtro</p>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full mt-4"
                    >
                        Contratar
                    </Button>
                </div>
            </div>
        </Modal>
    );
}