import useMenuStore from "@/stores/useMenuStore";
import { Checkbox, Divider, Drawer, Radio, RadioChangeEvent, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
    SettingOutlined,
  } from "@ant-design/icons";

import styles from './SearchSetting.module.scss'
import useChainStore from "@/stores/useChainStore";
import useMemberStore from "@/stores/useMemberStore";
import { useEffect } from "react";

export function SearchSetting() {

  // メニュー制御用Hook
  const { isSearchSetting, closeSearchSetting } = useMenuStore();
  // 連携検索用Hook
  const { viewParam, chainParam, setViewParam, setChainParam, fetchData } = useChainStore();
  
    // メンバ操作用フック
    const { members } = useMemberStore();
    
  const onChangeSortType = (e: RadioChangeEvent) => {
    chainParam.sortType = e.target.value;
    setChainParam(chainParam);
    fetchData(members);
  };
  
  const onChangeViewOmit = (e: CheckboxChangeEvent) => {
    viewParam.viewOmit = e.target.checked;
    setViewParam(viewParam);
  };
  
  const onChangeViewPower = (e: CheckboxChangeEvent) => {
    viewParam.viewPower = e.target.checked;
    setViewParam(viewParam);
  };

  return (
    <>
      <Drawer
        title={
          <>
            <SettingOutlined />
            <span style={{ paddingLeft: 4 }}>検索設定</span>
          </>
        }
        placement={"right"}
        width={380}
        className={styles.drawer}
        open={isSearchSetting}
        onClose={closeSearchSetting}
      >
        <Divider plain orientation="left">
          ■ 表示順
        </Divider>
        <Radio.Group value={chainParam.sortType} onChange={onChangeSortType}>
          <Radio value="0">合計値が強い順</Radio>
          <Radio value="1">〆技が強い順</Radio>
        </Radio.Group>
        <Divider plain orientation="left">
          ■ 表示オプション
        </Divider>
        <Space>
          <Space.Compact direction="vertical">
            <Checkbox checked={viewParam.viewOmit} onChange={onChangeViewOmit}>WS名称を略称で表示する</Checkbox>
            <Checkbox checked={viewParam.viewPower} onChange={onChangeViewPower}>強さを表示する</Checkbox>
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
}
