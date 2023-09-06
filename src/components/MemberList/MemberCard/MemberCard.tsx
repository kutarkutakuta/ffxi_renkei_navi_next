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
import  { Member } from "@/stores/useMembersStore";

interface MemberCardProps {
  id: number;
  member: Member;
  onSetting: (member: Member)=>void;
  onCopy: (member: Member)=>void;
  onRemove: (id: number)=>void;
}

export function MemberCard({ id, member, onSetting, onCopy, onRemove }: MemberCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // スタイル調整用
    margin: 4,
    padding: 2,
    borderRadius: 4,
    width: "125px",
    height: "100px",
    border: "1px solid black",
    backgroundColor: "#8ea2ad",
    color: "#32393e",
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Row style={{ backgroundColor: "#32393e" }}>
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
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<CloseOutlined />} onClick={()=>onRemove(id)}/>
            </Col>
          </Row>
        </Col>
      </Row>

      <span style={{ position: "relative" }}>
        <span style={{ position: "absolute", top: 12, left: 115 }}>▶</span>
      </span>

      <div style={{ fontWeight: "bold" }}>
        {id}.{member.Job}
      </div>

      <div>短剣 / 片手剣</div>

    </div>
  );
}
