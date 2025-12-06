import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { UpOutlined } from '@ant-design/icons';

import useMasterStore from "@/stores/useMasterStore";
import useMemberStore from "@/stores/useMemberStore";
import useChainStore from "@/stores/useChainStore";

import { MemberList } from "./MemberList/MemberList";
import { ChainTable } from "./ChainTable/ChainTable";
import { SearchSetting } from "./SearchSetting/SearchSetting";
import { Help } from "./Help/Help";

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

  // スクロールで隠れるやつ
  const { members } = useMemberStore();
  const [isHidden, setIsHidden] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState<number | null>(null);

  useEffect(() => {
    let currentScrollY = 0;
    const handleScroll = () => {
      if (window.scrollY > currentScrollY ) {
        setIsHidden(true);
      } else {
        if(window.scrollY <= 50) setIsHidden(false);
      }
      currentScrollY = window.scrollY;
      // show BackTop button when scrolled down
      setShowBackTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateNavbarHeight);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateNavbarHeight);
    };
  }, []);
  
  const calculateNavbarHeight = () => {
    const navbarElement = document.getElementById('member_list');
    if (navbarElement) {
      setNavbarHeight(navbarElement.clientHeight);
    }
  };

  useEffect(() => {
    calculateNavbarHeight();
  }, [members]);

  return (
    <>
      {/* メンバーリスト（ジョブ選択を含む） */}
      <div id="member_list" className={`${styles.navbar} ${isHidden ? styles.hidden : ''}`}>
          {/* メンバーカードコンテナ */}
          <MemberList></MemberList>
        </div>
      {/* 一覧 */}
      <div style={{ 
        marginTop: navbarHeight ? `${navbarHeight + 10}px` : '10px'
      }}>
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
