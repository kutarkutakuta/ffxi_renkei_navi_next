import React, { ReactElement, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Menu,
  Dropdown,
  Drawer,
  Space,
  Row,
  Col,
  Segmented,
  Radio,
  Select,
  TreeSelect,
} from "antd";
import { ToolOutlined } from "@ant-design/icons";
import useMasterStore from "@/stores/useMasterStore";
import { useMemberSetting } from "./useMemberSetting";
import useMenuStore from "@/stores/useMenuStore";

import styles from './MemberSetting.module.scss'
import { Wepon } from "@/types/Master/wepon";

export function MemberSetting() {
  // マスタ取得
  const { jobs, wepons, weponTypes } = useMasterStore();
  // フォーム値保存用
  const { formData, initialFormData, handleChange } = useMemberSetting();

  // メニュー制御用フック
  const { openMember, closeMemberSetting } = useMenuStore();

  // 親のイベントを検知してオープン
  useEffect(() => {
    initialFormData(openMember);
  }, [openMember]);

  const getWeponOption = (group: string) => wepons
    .filter((n) => n.group == group)
    .map((n) => {
      return {
        title: n.name,
        value: n.name,
        key: n.name,
        children: weponTypes
          .filter((m) => m.group == group)
          .map((m) => {
            return {
              title: `${n.name}(${m.name})`,
              value: `${n.name}-${m.name}`,
              key: `${n.name}-${m.name}`,
            };
          }),
      };
    });
  
    const getWeponTypeOption = (group: string) => weponTypes
      .filter((m) => m.group.startsWith(group))
      .map((m) => {
        return {
          title: `${m.name}`,
          value: `${m.name}`,
          key: `${m.name}`,
        };
    });

  // TreeSelectの共通設定
  const tProps = {
    allowClear: true,
    showSearch: false,
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_CHILD,
    treeCheckStrictly: true,
    style: {
      width: "100%",
    },
  };

  return (
    <div>
      <Drawer
        title={
          <>
            <ToolOutlined />
            <span style={{ paddingLeft: 4 }}>連携メンバーの設定</span>
          </>
        }
        placement={"left"}
        width={380}
        className={styles.drawer}
        open={openMember != null}
        onClose={closeMemberSetting}
        data-dndkit-disabled-dnd-flag="true"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Segmented options={["PC", "マトン", "フェイス"]} />
          <Select
            showSearch
            placeholder="ジョブ"
            style={{ width: 120 }}
            options={jobs.map((m) => ({ value: m.name, label: m.name }))}
            value={formData.Job}
            listHeight={400}
            onChange={(value) => handleChange("Job", value, openMember!)}
          />
          <TreeSelect
            {...tProps}
            placeholder="武器"
            treeData={getWeponOption("武器種")}
            value={formData.Wepons}
            listHeight={400}
            onChange={(value) => handleChange("Wepons", value, openMember!)}
          />
          <TreeSelect {...tProps} placeholder="震天動地"
            treeData={getWeponTypeOption("属性")} />
          <TreeSelect {...tProps} placeholder="契約の履行"
            treeData={getWeponTypeOption("召喚獣")} />
          <TreeSelect {...tProps} placeholder="しじをさせろ"
            treeData={getWeponTypeOption("種族")} />
          <TreeSelect {...tProps} placeholder="青魔法"
            treeData={getWeponTypeOption("青魔法")} />
          {/* <Button onClick={closeMemberSetting}>☓ Close</Button> */}
        </Space>
      </Drawer>
    </div>
  );
}
