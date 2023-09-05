import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { MemberCard } from "./MemberCard";

type ChildComponentProps = {
  clickCount: number;
};

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
              ></MemberCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
