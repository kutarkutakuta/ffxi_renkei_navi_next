import React, { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

import {
  DndContext,
  PointerSensor as LibPointerSensor,
  KeyboardSensor as LibKeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { MemberCard } from "./MemberCard/MemberCard";
import useMembersStore, { Member } from "@/stores/useMembersStore";
import { MemberSetting } from "./MemberSetting/MemberSetting";

// #region dnd-kit用の制御
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

class PointerSensor extends LibPointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent: event }: PointerEvent): boolean => {
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
// #endregion

/**
 * MemberList
 * @param _props
 * @returns
 */
export function MemberList() {
  // useSensor と useSensors を使って上書きした Sensor を DndContext に紐付ける
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { members, sortMember } = useMembersStore();

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleSetting = (member: Member) => {
    setSelectedMember(member);
  };
  const handleSettingClose = () => {
    setSelectedMember(null);
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
        sortMember(oldIndex, newIndex);
      }
    },
    [members]
  );
  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={members} strategy={rectSortingStrategy}>
          <div
            style={{ display: "flex", flexWrap: "wrap", touchAction: "none" }}
          >
            {members.map((item) => (
              <MemberCard
                key={item.id}
                member={item}
                onSetting={handleSetting}
              ></MemberCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <MemberSetting
        member={selectedMember!}
        onClose={handleSettingClose}
      ></MemberSetting>
    </>
  );
}
