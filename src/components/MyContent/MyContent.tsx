import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { UpOutlined } from '@ant-design/icons';

import useMasterStore from "@/stores/useMasterStore";
import useMemberStore from "@/stores/useMemberStore";
import useChainStore from "@/stores/useChainStore";

import { MemberList } from "../MemberList/MemberList";
import { ChainTable } from "../ChainTable/ChainTable";
import { SearchSetting } from "../SearchSetting/SearchSetting";
import { Help } from "../Help/Help";

import styles from './MyContent.module.scss';

/**
 * MyContent
 * @param props
 * @returns
 */
const MyContent = () => {

  // マスター取得
  const { fetchData } = useMasterStore();
  const { viewParam ,setViewParam } = useChainStore();
  useEffect(() => {
    fetchData();
    // モバイル用設定
    if (window.innerWidth <= 768) {
      viewParam.viewOmit = true;
      viewParam.viewPower = false;
      setViewParam(viewParam);
    }
  }, []);

  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // show BackTop button when scrolled down
      setShowBackTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* メンバーリスト（ジョブ選択を含む） */}
      <div className={styles.memberListSection}>
        {/* メンバーカードコンテナ */}
        <MemberList></MemberList>
      </div>
      {/* 一覧 */}
      <div className={styles.tableSection}>
        <ChainTable />
      </div>
      {/* 検索設定 */}
      <SearchSetting></SearchSetting>
      {/* ヘルプ */}
      <Help></Help>
      {/* BackTop */}
      <div className={styles.backTopGroup}>
        {showBackTop && (
          <Button
            type="primary"
            shape="circle"
            className={styles.backTopButton}
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <UpOutlined />
          </Button>
        )}
      </div>
    </>
  );
};

export default MyContent;
