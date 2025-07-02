"use client";

import React, { useEffect, useState } from 'react';
import WeeklyCalendar from '@/components/calendar/WeeklyCalendar';
import CalendarSkeleton from '@/components/shared/skeleton/CalendarSkeleton';
import Modal from '@/components/shared/modal/Modal';
import { DayOfWeek, WeeklySchedule, MealType, CalendarRecipe } from '@/types';
import { calendarService } from '@/services/calendar.service';
import RecipeCard from '@/components/calendar/RecipeCard';
import Container from '@/components/shared/containers/Container';
import Button from '@/components/shared/form/Button';
import ConfirmationModal from '@/components/shared/modal/ConfirmationModal';
import { useRecipeGeneratorSession } from '@/hooks/useRecipeGeneratorSession';

export default function CalendarPage() {
  // Limpiar ingredientes al estar fuera del flujo del generador
  useRecipeGeneratorSession();
  const [schedule, setSchedule] = useState<WeeklySchedule>([]);
  const [originalSchedule, setOriginalSchedule] = useState<WeeklySchedule>([]);
  const [favorites, setFavorites] = useState<Record<string, CalendarRecipe[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: DayOfWeek; mealType: MealType } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    day: DayOfWeek;
    recipeId: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [weeklySchedule, categorizedFavorites] = await Promise.all([
        calendarService.getWeeklySchedule(),
        calendarService.getFavoritesByCategory()
      ]);
      
      setSchedule(weeklySchedule);
      setOriginalSchedule(weeklySchedule);
      setFavorites(categorizedFavorites);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const handleAddRecipe = (day: DayOfWeek, mealType: MealType) => {
    setSelectedSlot({ day, mealType });
    setIsModalOpen(true);
  };

  const handleSelectFavorite = (recipe: CalendarRecipe) => {
    if (!selectedSlot) return;

    setSchedule(currentSchedule => {
      const newSchedule = currentSchedule.map(daySchedule => {
        const currentDay = Object.keys(daySchedule)[0] as DayOfWeek;
        if (currentDay === selectedSlot.day) {
          return {
            [currentDay]: [
              ...daySchedule[currentDay].filter(r => r.mealType !== selectedSlot.mealType),
              { ...recipe, mealType: selectedSlot.mealType }
            ]
          };
        }
        return daySchedule;
      });
      setHasChanges(true);
      return newSchedule;
    });

    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleRequestDelete = (day: DayOfWeek, recipeId: number, title: string) => {
    setDeleteTarget({ day, recipeId, title });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      handleDeleteRecipe(deleteTarget.day, deleteTarget.recipeId);
    }
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const handleDeleteRecipe = (day: DayOfWeek, recipeId: number) => {
    setSchedule(currentSchedule => {
      const newSchedule = currentSchedule.map(daySchedule => {
        const currentDay = Object.keys(daySchedule)[0] as DayOfWeek;
        if (currentDay === day) {
          return {
            [day]: daySchedule[day].filter((r) => r.id !== recipeId),
          };
        }
        return daySchedule;
      });
      setHasChanges(true);
      return newSchedule;
    });
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      const updatedSchedule = await calendarService.updateWeeklySchedule(schedule);
      setSchedule(updatedSchedule);
      setOriginalSchedule(updatedSchedule);
      setHasChanges(false);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
        // TODO  hacer toast
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setSchedule(originalSchedule);
    setHasChanges(false);
  };

  if (isLoading) {
    return (
      <Container customClass="mt-30 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Planificación Semanal
        </h1>
        <CalendarSkeleton />
      </Container>
    );
  }

  return (
    <Container customClass="mt-30 mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Planificación Semanal
      </h1>

      <WeeklyCalendar
        schedule={schedule}
        onAddRecipe={handleAddRecipe}
        onDeleteRecipe={handleRequestDelete}
      />

       {/* Barra de acciones flotante cuando hay cambios */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-[1000] border-t border-gray-200">
          <div className="container mx-auto flex justify-end gap-4">
            <Button
              onClick={handleDiscardChanges}
              variant='secondary'
              disabled={isSaving}
            >
              Descartar Cambios
            </Button>
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </div>
      )}

      {/* Modal para seleccionar recetas favoritas */}
      <Modal
        showCloseButton
        maxWidth='max-w-xl'
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSlot(null);
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Recetas favoritas - {selectedSlot?.mealType}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
            {selectedSlot && favorites[selectedSlot.mealType]?.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleSelectFavorite(recipe)}
                className="cursor-pointer"
              >
                <RecipeCard
                  recipe={recipe}
                  isEmpty={false}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>

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
    </Container >
  );
}