import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  Row,
  Col,
} from "antd";
import {
  ToolOutlined,
  UsergroupAddOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from './MemberCard.module.css'
import  { Member } from "@/stores/useMembersStore";

interface MemberCardProps {
  member: Member;
  onSetting: (member: Member)=>void;
  onCopy: (member: Member)=>void;
  onRemove: (member: Member)=>void;
}

export function MemberCard({ member, onSetting, onCopy, onRemove }: MemberCardProps) {
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // スタイル調整用
    margin: 4,
    padding: 2,
    borderRadius: 4,
    cursor: "grab",
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} className = {styles.memberCard} style={style} {...attributes} {...listeners}>
      <Row className = {styles.header}>
        <Col flex="none">
          <Button
            data-dndkit-disabled-dnd-flag="true"
            icon={<ToolOutlined />}
            onClick={()=>onSetting(member)}
            type="text"
            shape="circle"
          ></Button>
        </Col>
        <Col flex="auto">
          <Row justify="end">
            <Col>
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<UsergroupAddOutlined />} onClick={()=> onCopy(member)}></Button>
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<CloseOutlined />} onClick={()=>onRemove(member)}/>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 矢印 */}
      <span style={{ position: "relative" }}>
        <span style={{ position: "absolute", top: 12, left: 115 }}>▶</span>
      </span>

      <div style={{ fontWeight: "bold" }}>
        {member.Job}
      </div>
      <div>短剣 / 片手剣</div>

    </div>
  );
}
