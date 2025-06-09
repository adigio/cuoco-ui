'use client';

import React, { ReactNode } from 'react';
import Modal from '@/components/shared/modal/Modal';
import Button from '@/components/shared/form/Button';
import { title } from 'process';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: ReactNode;
}

export default function SubscriptionModal({ isOpen, onClose,title }: SubscriptionModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-3xl"
            padding="p-8"
            containerClassName="relative flex flex-col gap-6"
        >
            {/* Botón de cerrar */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl leading-none"
                aria-label="Cerrar"
            >
                <span aria-hidden="true">&times;</span>
            </button>
                {/* Título opcional */}
            {title && (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">{title}</h2>
                </div>
            )}
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
                            <p>Acceso a recetas y funcionalidades básicas.</p>
                        </div>
                        <div className="flex items-start gap-2">
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
                            <p>Acceso al Plan Básico</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <p>Recetas ilimitadas</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <p>Guardar recetas favoritas ilimitadas</p>
                        </div>
                        <div className="flex items-start gap-2">
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
