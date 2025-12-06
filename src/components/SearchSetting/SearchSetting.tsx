import useMenuStore from "@/stores/useMenuStore";
import {
  Checkbox,
  Divider,
  Drawer,
  Radio,
  RadioChangeEvent,
  Space,
  Button,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import styles from "./SearchSetting.module.scss";
import useChainStore from "@/stores/useChainStore";
import useMemberStore from "@/stores/useMemberStore";
import useMasterStore from "@/stores/useMasterStore";
import { useIntl } from "react-intl";

export function SearchSetting() {
  // メニュー制御用Hook
  const { isSearchSetting, closeSearchSetting } = useMenuStore();
  // 連携検索用Hook
  const { viewParam, chainParam, setViewParam, setChainParam, fetchData } =
    useChainStore();
  // メンバ操作用Hook
  const { members } = useMemberStore();
  // マスタ取得Hook
  const { renkeis } = useMasterStore();
  // 国際化用Hook
  const intl = useIntl()
  
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

  const onChangeNorange = (e: CheckboxChangeEvent) => {
    chainParam.noRange = e.target.checked;
    setChainParam(chainParam);
    fetchData(members);
  };

  const onChangeRenkeiDamage = (e: CheckboxChangeEvent) => {
    chainParam.renkeiDamage = e.target.checked;
    setChainParam(chainParam);
    fetchData(members);
  };

  const onChangeLastChain = (e: CheckboxChangeEvent, chainName: string) => {
    if (e.target.checked) {
      chainParam.lastChains.push(chainName);
    } else {
      chainParam.lastChains = chainParam.lastChains.filter(
        (m) => m != chainName
      );
    }
    setChainParam(chainParam);
    fetchData(members);
  };

  return (
    <>
      <Drawer
        title={
          <>
            <span style={{ paddingLeft: 4, fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
              {intl.formatMessage({ id: "title.search_setting" })}
            </span>
          </>
        }
        placement={"left"}
        width="min(340px, 85vw)"
        open={isSearchSetting}
        onClose={closeSearchSetting}
      >
        <div className={styles.caption}>{intl.formatMessage({ id: "search_option.title" })}</div>
        <Radio.Group value={chainParam.sortType} onChange={onChangeSortType} style={{ fontSize: 14 }}>
          <Radio value="0" style={{ fontSize: 14 }}>{intl.formatMessage({ id: "search_option.sort1" })}</Radio>
          <Radio value="1" style={{ fontSize: 14 }}>{intl.formatMessage({ id: "search_option.sort2" })}</Radio>
        </Radio.Group>
        <br />
        <br />
        <Space>
          <Space.Compact direction="vertical">
            <Checkbox checked={chainParam.noRange} onChange={onChangeNorange} style={{ fontSize: 14 }}>
            {intl.formatMessage({ id: "search_option.range" })}
            </Checkbox>
            <Checkbox
              checked={chainParam.renkeiDamage}
              onChange={onChangeRenkeiDamage}
              style={{ fontSize: 14 }}
            >
              {intl.formatMessage({ id: "search_option.skillchain" })}
            </Checkbox>
          </Space.Compact>
        </Space>
        <Divider />

        <div className={styles.caption}>{intl.formatMessage({ id: "view_option.title" })}</div>
        <Space>
          <Space.Compact direction="vertical">
            <Checkbox checked={viewParam.viewOmit} onChange={onChangeViewOmit} style={{ fontSize: 14 }}>
            {intl.formatMessage({ id: "view_option.short_name" })}
            </Checkbox>
            <Checkbox
              checked={viewParam.viewPower}
              onChange={onChangeViewPower}
              style={{ fontSize: 14 }}
            >
              {intl.formatMessage({ id: "view_option.power" })}
            </Checkbox>
          </Space.Compact>
        </Space>
        <Divider />
        <div className={styles.caption}>{intl.formatMessage({ id: "last_element_option.title" })}</div>
        <Space direction="vertical" size="small" style={{ display: "flex" }}>
          <Space wrap>
            {renkeis
              .filter((m) => m.level == 3)
              .map((m) => (
                <Checkbox
                  key={m.name}
                  checked={chainParam.lastChains.includes(m.name)}
                  style={{
                    borderBottomWidth: 4,
                    borderBottomStyle: "solid",
                    borderBottomColor: m.color,
                    fontSize: 14,
                  }}
                  onChange={(e) => onChangeLastChain(e, m.name)}
                >
                  {intl.locale == "ja" ? m.name : intl.formatMessage({ id: m.name, defaultMessage: m.name })}
                </Checkbox>
              ))}
          </Space>
          <Space wrap>
            {renkeis
              .filter((m) => m.level == 2)
              .map((m) => (
                <Checkbox
                  key={m.name}
                  checked={chainParam.lastChains.includes(m.name)}
                  style={{
                    borderBottomWidth: 4,
                    borderBottomStyle: "solid",
                    borderBottomColor: m.color,
                    fontSize: 14,
                  }}
                  onChange={(e) => onChangeLastChain(e, m.name)}
                >
                {intl.locale == "ja" ? m.name : intl.formatMessage({ id: m.name, defaultMessage: m.name })}
                </Checkbox>
              ))}
          </Space>
          <Space wrap>
            {renkeis
              .filter((m) => m.level == 1)
              .map((m) => (
                <Checkbox
                  key={m.name}
                  checked={chainParam.lastChains.includes(m.name)}
                  style={{ fontSize: 14 }}
                  onChange={(e) => onChangeLastChain(e, m.name)}
                >
                {intl.locale == "ja" ? m.name : intl.formatMessage({ id: m.name, defaultMessage: m.name })}
                </Checkbox>
              ))}
          </Space>
          <Divider />
        </Space>
      </Drawer>
    </>
  );
}
