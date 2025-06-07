"use client";

import React, { useState } from "react";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import { DayOfWeek, WeeklySchedule, MealType } from "@/types";
import Modal from "@/components/shared/modal/Modal";
import ConfirmationModal from "@/components/shared/modal/ConfirmationModal";
// Datos de ejemplo
const mockSchedule: WeeklySchedule = [
  {
    jueves: [
      {
        id: "5",
        title: "Pancakes",
        img: "/platos/pancakes.PNG",
        mealType: "Desayuno",
      },
    ],
  },
  {
    viernes: [
      {
        id: "6",
        title: "Budin",
        img: "/platos/budin.PNG",
        mealType: "Merienda",
      },
    ],
  },
  {
    sabado: [],
  },
  {
    domingo: [
      {
        id: "1",
        title: "Pollo con zapallitos",
        img: "/platos/pollo_zapallitos.PNG",
        mealType: "Almuerzo",
      },
      {
        id: "2",
        title: "Ensalada César",
        img: "/platos/ensalada_cesar.PNG",
        mealType: "Cena",
      },
    ],
  },
  {
    lunes: [
      {
        id: "3",
        title: "Pasta al pesto",
        img: "/platos/pasta_al_pesto.PNG",
        mealType: "Almuerzo",
      },
      {
        id: "4",
        title: "Salmón grillado",
        img: "/platos/salmon.PNG",
        mealType: "Cena",
      },
    ],
  },
  {
    martes: [],
  },
  {
    miercoles: [],
  },
];

export default function CalendarPage() { 
  const [schedule, setSchedule] = useState<WeeklySchedule>(mockSchedule);
 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: DayOfWeek;
    mealType: MealType;
  } | null>(null);

  const handleAddRecipe = (day: DayOfWeek, mealType: MealType) => {
    setSelectedSlot({ day, mealType });
    setIsAddModalOpen(true);
  };
  const handleConfirmAdd = () => { 
    setIsAddModalOpen(false);
    setSelectedSlot(null);
  };
 
  const handleDeleteRecipe = (day: DayOfWeek, recipeId: string) => {
    setSchedule((curr) =>
      curr.map((daySchedule) => {
        const d = Object.keys(daySchedule)[0] as DayOfWeek;
        if (d === day) {
          return {
            [day]: daySchedule[day].filter((r) => r.id !== recipeId),
          };
        }
        return daySchedule;
      })
    );
  };

  // 2) Estados auxiliares para el modal de borrado
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    day: DayOfWeek;
    recipeId: string;
    title: string;
  } | null>(null);

  // 3) Este handler abre el modal
  const handleRequestDelete = (
    day: DayOfWeek,
    recipeId: string,
    title: string
  ) => {
    setDeleteTarget({ day, recipeId, title });
    setIsDeleteModalOpen(true);
  };

  // 4) Este confirma y llama a la función real
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      handleDeleteRecipe(deleteTarget.day, deleteTarget.recipeId);
    }
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Planificación Semanal
      </h1>

      <WeeklyCalendar
        schedule={schedule}
        onAddRecipe={handleAddRecipe}
        onDeleteRecipe={handleRequestDelete}
      />

      {/* Modal AGREGAR receta */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className="p-4">
          <p>
            {`Agregar receta para ${
              selectedSlot?.day || ''
            } - ${selectedSlot?.mealType || ''}`}
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmAdd}
              className="px-4 py-2 bg-color-primary-medium text-white rounded hover:bg-color-primary-dark"
            >
              Agregar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal CONFIRMAR BORRADO */}
       <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Confirmar eliminación"
        confirmText="Borrar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p>
          ¿Querés borrar <strong>{deleteTarget?.title}</strong>?
        </p>
      </ConfirmationModal>
    </div>
  );
}