import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Row, Col } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./MemberCard.module.scss";
import useMembersStore, { Member } from "@/stores/useMemberStore";
import useMenuStore from "@/stores/useMenuStore";
import useMasterStore from "@/stores/useMasterStore";
import { useIntl } from "react-intl";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // スタイル調整用
    margin: 4,
    padding: 2,
    borderRadius: 5,
    cursor: "grab",
  };

  // メニュー制御用Hook
  const { openMemberSetting } = useMenuStore();
  // メンバ操作用Hook
  const { members, addMember, removeMember } = useMembersStore();
  // マスタ取得用Hook
  const { weponTypes } = useMasterStore();
  // 国際化用Hook
  const intl = useIntl();

  const handleCopy = (member: Member) => {
    addMember(member, false);
  };
  const handleRemove = (member: Member) => {
    removeMember(member);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div
      ref={setNodeRef}
      className={styles.memberCard}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Row className={styles.header}>
        <Col flex="none">
          <Button
            data-dndkit-disabled-dnd-flag="true"
            icon={<EditOutlined />}
            onClick={() => openMemberSetting(member)}
            type="text"
          ></Button>
          &nbsp;
          <Button
            data-dndkit-disabled-dnd-flag="true"
            type="text"
            shape="circle"
            onClick={() => handleCopy(member)}
            disabled={members.length >= 5}
          >
            Copy
          </Button>
        </Col>
        <Col flex="auto">
          <Row justify="end">
            <Col>
              <Button
                data-dndkit-disabled-dnd-flag="true"
                type="text"
                icon={<CloseOutlined />}
                onClick={() => handleRemove(member)}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 矢印 - 次のカードへつなぐための矢印 */}
      {members[members.length - 1] != member && (
        <span className={styles.arrow} aria-hidden>
          ▶
        </span>
      )}

      <div className={styles.job}>
        {intl.locale != "ja" && member.Job
          ? intl.formatMessage({ id: "job." + member.Job, defaultMessage: member.Job })
          : member.Job}
      </div>
      <div className={styles.wepons}>
        {intl.locale == "ja"
          ? member.Wepons.map((m) => {
              if (m.name == "マトン" || m.name == "フェイス" ) {
                return weponTypes
                  .filter((n) => m.weponTypes.includes(n.name))
                  .map((n) => n.short_name)
                  .join();
              } else {
                let ret = m.name;
                ret +=
                  m.weponTypes.length > 0
                    ? " [" +
                      weponTypes
                        .filter((n) => m.weponTypes.includes(n.name))
                        .map((n) => n.short_name)
                        .join() +
                      "]"
                    : "";
                ret +=
                  m.outWSTypes.length > 0
                    ? " (" + m.outWSTypes.join() + "除く)"
                    : "";
                return ret;
              }
            }).join(" / ")
          : member.Wepons.map((m) => {
              if (m.name == "マトン" || m.name == "フェイス") {
                return weponTypes
                  .filter((n) => m.weponTypes.includes(n.name))
                  .map((n) => intl.formatMessage({ id: n.name, defaultMessage: n.name }))
                  .join();
              } else {
                let ret = intl.formatMessage({ id: "wepon." + m.name, defaultMessage: m.name });
                ret +=
                  m.weponTypes.length > 0
                    ? "(" +
                      weponTypes
                        .filter((n) => m.weponTypes.includes(n.name))
                        .map((n) => intl.formatMessage({ id: n.name, defaultMessage: n.name }))
                        .join() +
                      ")"
                    : "";
                ret +=
                  m.outWSTypes.length > 0
                    ? " (Exclude " + m.outWSTypes.join() + ")"
                    : "";
                return ret;
              }
            }).join(" | ")}
      </div>
    </div>
  );
}
