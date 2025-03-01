'use client';

import { PropsWithChildren, createContext, useContext, useId } from 'react';
import React from 'react';

import { SECOND } from '@/constants/time';
import { cn } from '@/lib/utils';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { Props as SortableContextProps } from '@dnd-kit/sortable/dist/components/SortableContext';
import { CSS } from '@dnd-kit/utilities';

type TUseSortbalResult = ReturnType<typeof useSortable>;

const SortableResultContext = createContext<TUseSortbalResult | null>(null);

interface SortableResultProviderProps {
  id: string;
}

function SortableResultProvider({
  children,
  id,
}: PropsWithChildren<SortableResultProviderProps>) {
  const result = useSortable({ id });
  return (
    <SortableResultContext.Provider value={result}>
      {children}
    </SortableResultContext.Provider>
  );
}

const useSortableContext = () => {
  const context = useContext(SortableResultContext);
  if (!context) throw new Error('It must be used in SortableResultProvider.');
  return context;
};

interface SortableContentProps {
  className?: string;
}

function SortableContent({
  children,
  className,
}: PropsWithChildren<SortableContentProps>) {
  const { attributes, setNodeRef, transform, transition } =
    useSortableContext();

  const style = {
    transform: CSS.Transform.toString({
      x: transform?.x || 0,
      y: transform?.y || 0,
      scaleX: 1,
      scaleY: 1,
    }),
    transition: transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn('cursor-default touch-none', className)}
    >
      {children}
    </div>
  );
}

interface SortableItemProps {
  id: string;
  className?: string;
}

function SortableItem({
  children,
  id,
  className,
}: PropsWithChildren<SortableItemProps>) {
  return (
    <SortableResultProvider id={id}>
      <SortableContent className={className}>{children}</SortableContent>
    </SortableResultProvider>
  );
}

interface SortableListnerProps {
  className?: string;
}

function SortableListner({
  children,
  className,
}: PropsWithChildren<SortableListnerProps>) {
  const { listeners, setActivatorNodeRef } = useSortableContext();

  return (
    <div
      {...listeners}
      ref={setActivatorNodeRef}
      className={cn('cursor-pointer', className)}
    >
      {children}
    </div>
  );
}

interface SortableDndContextProps extends SortableContextProps {
  onDragEnd?: (event: DragEndEvent) => void;
  pointerDelay?: number;
  touchDelay?: number;
}

function SortableDndContext({
  children,
  onDragEnd,
  pointerDelay = 0,
  touchDelay = 0.2 * SECOND,
  items,
  strategy,
  ...props
}: SortableDndContextProps) {
  const dndContextId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: pointerDelay, tolerance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: touchDelay, tolerance: 5 },
    })
  );

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items}
        strategy={strategy}
        {...props}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}

export { SortableDndContext, SortableItem, SortableListner };
