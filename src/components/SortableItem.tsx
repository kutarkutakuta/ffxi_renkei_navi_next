import React, { ReactElement } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { Button, Checkbox, Menu, Dropdown } from 'antd';

interface SortableItemProps {
  id: string;
  children: ReactElement;
}

export function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // スタイル調整用
    margin: 4,
    padding: 4,
    borderRadius: 4,
    width: "150px",
    height: "150px",
    border: "1px solid black",
    backgroundColor: "#2b4acb",
    
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      
      <Button data-dndkit-disabled-dnd-flag="true">...</Button>

      {children}
    </div>
  );
}