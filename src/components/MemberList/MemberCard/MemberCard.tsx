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
  CopyOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from './MemberCard.module.scss';
import  useMembersStore, { Member } from "@/stores/useMemberStore";
import useMenuStore from "@/stores/useMenuStore";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // スタイル調整用
    margin: 4,
    padding: 2,
    borderRadius: 5,
    cursor: "grab",
  };

  // メニュー制御用フック
  const { openMemberSetting } = useMenuStore();
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
            onClick={()=>openMemberSetting(member)}
            type="text"
            shape="circle"
          ></Button>
        </Col>
        <Col flex="auto">
          <Row justify="end">
            <Col>
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<CopyOutlined />} onClick={()=> handleCopy(member)}></Button>
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
      

      <div className={styles.job}>
        {member.Job}
      </div>
      <div className={styles.wepons}>
        {member.Wepons.map(n=>n.name).join(" / ")}
      </div>

    </div>
  );
}
