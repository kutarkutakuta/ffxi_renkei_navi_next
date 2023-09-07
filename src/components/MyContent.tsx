"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  Affix,
  Button,
  Col,
  Row,
  Space,
  Drawer,
  Radio,
  Divider,
  Checkbox,
} from "antd";
import {
  SettingOutlined,
} from "@ant-design/icons";

import { MemberList } from "./MemberList/MemberList";
import useMasterStore from "@/stores/useMasterStore";
import { ChainTable } from "./ChainTable/ChainTable";
import useMemberStore from "@/stores/useMemberStore";

import styles from './MyContent.module.scss';
import useMenuStore from "@/stores/useMenuStore";

const headerStyle: React.CSSProperties = {
  position: "absolute",
  top: 10,
  width: "calc(100% - 20px)",
  marginRight: 20,
  zIndex: 1,
};

/**
 * MyContent
 * @param props
 * @returns
 */
const MyContent = () => {
  
  // メニュー制御用フック
  const { isSearchSetting, closeSearchSetting } = useMenuStore();
  
  // マスター取得
  const { fetchData } = useMasterStore();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // スクロールで隠れるやつ
  const { members } = useMemberStore();
  const [isHidden, setIsHidden] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState<number | null>(null);

  useEffect(() => {
    let currentScrollY = 0;
    const handleScroll = () => {
      if (window.scrollY > currentScrollY ) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      currentScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateNavbarHeight);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateNavbarHeight);
    };
  }, []);
  
  const calculateNavbarHeight = () => {
    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
      setNavbarHeight(navbarElement.clientHeight);
    }
  };

  useEffect(() => {
    calculateNavbarHeight();
  }, [members]);

  return (
    <>
      {/* 検索メニュー */}
      <div>
        <div id="navbar" className={`${styles.navbar} ${isHidden ? styles.hidden : ''}`}>
          {/* メンバーカードコンテナ */}
          <MemberList></MemberList>
        </div>
      </div>
      {/* 一覧 */}
      <div style={{ marginTop:  navbarHeight ? `${navbarHeight}px` : '0' }}>
        <ChainTable />
      </div>
      {/* 検索設定 */}
      <Drawer
        title={
          <>
            <SettingOutlined />
            <span style={{ paddingLeft: 4 }}>検索設定</span>
          </>
        }
        placement={"right"}
        width={380}
        open={isSearchSetting}
        onClose={closeSearchSetting}
      >
        <Divider plain orientation="left">
          ■ 表示順
        </Divider>
        <Radio.Group>
          <Radio value={1}>合計値が強い順</Radio>
          <Radio value={2}>〆技が強い順</Radio>
        </Radio.Group>
        <Divider plain orientation="left">
          ■ 表示オプション
        </Divider>
        <Space>
          <Space.Compact direction="vertical">
            <Checkbox>WS名称を略称で表示する</Checkbox>
            <Checkbox>強さを表示する</Checkbox>
          </Space.Compact>
        </Space>
        <Divider plain orientation="left">
          ■ 検索オプション
        </Divider>
        <Space>
          <Space.Compact direction="vertical">
            <Checkbox>範囲技を含める</Checkbox>
            <Checkbox>強さに連携ダメージ分も含める</Checkbox>
          </Space.Compact>
        </Space>
        <Divider plain orientation="left">
          ■ 〆の連携属性
        </Divider>
        <Space>
          <Space.Compact>
            <Checkbox>闇</Checkbox>
            <Checkbox>光</Checkbox>
            <Checkbox>湾曲</Checkbox>
            <Checkbox>分解</Checkbox>
            <Checkbox>重力</Checkbox>
            <Checkbox>核熱</Checkbox>
          </Space.Compact>
        </Space>
      </Drawer>

    </>
  );
};

export default MyContent;
