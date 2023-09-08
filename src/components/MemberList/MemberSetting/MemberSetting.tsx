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

  const getWeponOption = wepons
    .filter((n) => n.group == "武器種")
    .map((n) => {
      return {
        title: n.name,
        value: n.name,
        key: n.name,
        children: weponTypes
          .filter((m) => m.group == "武器種")
          .map((m) => {
            return {
              title: `${n.name}(${m.name})`,
              value: `${n.name}-${m.name}`,
              key: `${n.name}-${m.name}`,
            };
          }),
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
            <span style={{ paddingLeft: 4 }}>メンバ設定</span>
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
            placeholder="ジョブ"
            style={{ width: 120 }}
            options={jobs.map((m) => ({ value: m.name, label: m.name }))}
            value={formData.Job}
            onChange={(value) => handleChange("Job", value, openMember!)}
          />
          <TreeSelect
            {...tProps}
            placeholder="武器"
            treeData={getWeponOption}
            value={formData.Wepons}
            onChange={(value) => handleChange("Wepons", value, openMember!)}
          />
          <TreeSelect {...tProps} placeholder="震天動地" />
          <TreeSelect {...tProps} placeholder="契約の履行" />
          <TreeSelect {...tProps} placeholder="しじをさせろ" />
          <TreeSelect {...tProps} placeholder="青魔法" />
          {/* <Button onClick={closeMemberSetting}>☓ Close</Button> */}
        </Space>
      </Drawer>
    </div>
  );
}
