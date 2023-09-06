import React, { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, KeyboardEvent } from "react";

import {
  DndContext,
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { MemberCard } from "./MemberCard/MemberCard";
import useMembersStore, { Member } from "@/stores/useMembersStore";
import { MemberSetting } from "./MemberSetting/MemberSetting";

type ChildComponentProps = {
  clickCount: number;
};

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
// #endregion

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
  
  const { members, addMember, updateMember, removeMember, sortMember } = useMembersStore();

  
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // 親のイベントを検知してメンバーを追加
  useEffect(() => {
    if (clickCount > 0) {
      addMember();
    }
  }, [clickCount]);

  const handleSetting = (member: Member) => {
    setSelectedMember(member);
  };
  const handleSettingClose = () => {
    setSelectedMember(null);
  };
  const handleCopy = (member: Member) => {
    addMember(member);
  };
  const handleRemove = (index: number) => {
    removeMember(index);
  };
  const handleUpdate = (member: Member) => {
    updateMember(member.id , member);
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
        <SortableContext items={members}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members.map((item) => (
              <MemberCard
                key={item.id}
                id={item.id}
                member={item}
                onSetting={handleSetting}
                onCopy={handleCopy}
                onRemove={handleRemove}
              ></MemberCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <MemberSetting member={selectedMember!} onUpdate={handleUpdate} onClose={handleSettingClose}></MemberSetting>
    </>
  );
}
