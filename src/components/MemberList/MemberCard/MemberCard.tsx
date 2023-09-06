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
import  useMembersStore, { Member } from "@/stores/useMembersStore";

interface MemberCardProps {
  member: Member;
  onSetting: (member: Member)=>void;
}

export function MemberCard({ member, onSetting }: MemberCardProps) {
  
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

  const { members, addMember, removeMember } = useMembersStore();
  
  const handleCopy = (member: Member) => {
    addMember(member);
  };
  const handleRemove = (member: Member) => {
    removeMember(member);
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
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<UsergroupAddOutlined />} onClick={()=> handleCopy(member)}></Button>
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<CloseOutlined />} onClick={()=>handleRemove(member)}/>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 矢印 */}
      {members[members.length-1] != member &&
        <span style={{ position: "relative" }}>
        <span style={{ position: "absolute", top: 10, left: 140, color:"#ddd" }}>▶</span>
      </span>
      }
      

      <div style={{ fontWeight: "bold" }}>
        {member.Job}
      </div>
      <div>{member.Wepons.map(n=>n.name).join(" / ")}</div>

    </div>
  );
}
