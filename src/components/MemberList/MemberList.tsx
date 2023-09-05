import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import type { MouseEvent, KeyboardEvent } from "react";

import {
  DndContext,
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { MemberCard } from "./MemberCard";

type ChildComponentProps = {
  clickCount: number;
};


// data-dndkit-disabled-dnd-flag="true" が指定されている要素はドラッグ無効にする
function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element;

  while (cur) {
    if (cur.dataset && cur.dataset.dndkitDisabledDndFlag) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
}

// LibMouseSensor を override してドラッグ無効にする
class MouseSensor extends LibMouseSensor {
  static activators = [
    {
      eventName: "onMouseDown" as const,
      handler: ({ nativeEvent: event }: MouseEvent): boolean => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}

// LibKeyboardSensor を override してドラッグ無効にする
class KeyboardSensor extends LibKeyboardSensor {
  static activators = [
    {
      eventName: "onKeyDown" as const,
      handler: ({ nativeEvent: event }: KeyboardEvent<Element>): boolean => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}

/**
 * MemberCardContainer
 * @param _props
 * @returns
 */
export function MemberCardContainer({ clickCount }: ChildComponentProps) {
  // useSensor と useSensors を使って上書きした Sensor を DndContext に紐付ける
  const mouseSensor = useSensor(MouseSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  // 連携メンバー
  const [members, setMember] = useState<{ id: string; content: string }[]>([]);

  // 親のイベントを検知してメンバーを追加
  useEffect(() => {
    if (clickCount > 0) {
      setMember((m) => [
        ...m,
        {
          id: (m.length + 1).toString(),
          content: "unknown",
        },
      ]);
    }
  }, [clickCount]);

  const handleRemove = (index: string) => {
    // item.id と渡ってきた index が合致している時にアイテムを削除する
    setMember((m) => {
      m = m.filter(item=>item.id !== index);
      m.forEach((m,i)=>m.id = (i+1).toString());
      return m;
    });
  };

  const handleDragEnd = useCallback(
    (event: { active: any; over: any }) => {
      const { active, over } = event;
      if (over === null) {
        return;
      }
      if (active.id !== over.id) {
        const oldIndex = members
          .map((item) => {
            return item.id;
          })
          .indexOf(active.id);
        const newIndex = members
          .map((item) => {
            return item.id;
          })
          .indexOf(over.id);
        const newState = arrayMove(members, oldIndex, newIndex);
        newState.forEach((m,i)=>m.id = (i+1).toString());
        setMember(newState);
      }
    },
    [members]
  );
  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={members}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members.map((item) => (
              <MemberCard
                key={item.id}
                id={item.id}
                content={item.content}
                onRemove={handleRemove}
              ></MemberCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
