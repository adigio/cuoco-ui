'use client';

import React, { useState } from 'react';
import WeeklyCalendar from '@/components/calendar/WeeklyCalendar';
import { DayOfWeek, WeeklySchedule, MealType } from '@/types';
import Modal from '@/components/shared/modal/Modal';

// Datos de ejemplo
const mockSchedule: WeeklySchedule = [
  {
    jueves: [],
  },
  {
    viernes: [],
  },
  {
    sabado: [],
  },
  {
    domingo: [
      {
        id: "1",
        title: "Pollo con zapallitos",
        img: "https://www.saludable.com.ar/wp-content/uploads/2019/05/pollo-con-zapallitos-saludable-como-puedes-1.jpg",
        mealType: "Almuerzo"
      },
      {
        id: "2",
        title: "Ensalada César",
        img: "https://example.com/ensalada-cesar.jpg",
        mealType: "Cena"
      }
    ]
  },
  {
    lunes: [
      {
        id: "3",
        title: "Pasta al pesto",
        img: "https://example.com/pasta-pesto.jpg",
        mealType: "Almuerzo"
      },
      {
        id: "4",
        title: "Salmón grillado",
        img: "https://example.com/salmon.jpg",
        mealType: "Cena"
      }
    ]
  },
  {
    martes: [],
  },
  {
    miercoles: [],
  }
];

export default function CalendarPage() {
  const [schedule, setSchedule] = useState<WeeklySchedule>(mockSchedule);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: DayOfWeek; mealType: MealType } | null>(null);

  const handleAddRecipe = (day: DayOfWeek, mealType: MealType) => {
    setSelectedSlot({ day, mealType });
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = (day: DayOfWeek, recipeId: string) => {
    setSchedule(currentSchedule => {
      return currentSchedule.map(daySchedule => {
        const currentDay = Object.keys(daySchedule)[0] as DayOfWeek;
        if (currentDay === day) {
          return {
            [day]: daySchedule[day].filter(recipe => recipe.id !== recipeId)
          };
        }
        return daySchedule;
      });
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleConfirmAdd = () => {
    // TODO: logica para agregar 
    handleCloseModal();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Planificación Semanal
      </h1>
      
      <WeeklyCalendar
        schedule={schedule}
        onAddRecipe={handleAddRecipe}
        onDeleteRecipe={handleDeleteRecipe}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="p-4">
          <p>{`Agregar receta para ${selectedSlot?.day || ''} - ${selectedSlot?.mealType || ''}`}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCloseModal}
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
    </div>
  );
} 