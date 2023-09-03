import React, { ReactElement } from 'react';
import {useDraggable} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: ReactElement;
}

export function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // スタイル調整用
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    borderRadius: 4,
    width: "150px",
    height: "150px",
    border: "1px solid black",
    backgroundColor: "white",
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}