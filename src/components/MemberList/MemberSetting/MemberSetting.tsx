import React, { useEffect } from "react";
import {
  Drawer,
  Space,
  Divider,
  Button,
  TreeSelect,
  Radio,
  message,
} from "antd";
import useMasterStore from "@/stores/useMasterStore";
import useMenuStore from "@/stores/useMenuStore";
import useMembersStore from "@/stores/useMemberStore";
import { useMemberSetting } from "./useMemberSetting";
import { FormattedMessage, useIntl } from "react-intl";

export function MemberSetting() {
  // マスタ取得用Hook
  const { jobs, wepons, weponTypes, jobWepons } = useMasterStore();
  // フォーム値保存用
  const { formData, initialFormData, handleChange } = useMemberSetting();
  // メニュー制御用フック
  const { openMember, isMemberSetting, closeMemberSetting } = useMenuStore();
  // メンバ操作用Hook
  const { members, removeMember, addMember } = useMembersStore();
  // 国際化用Hook
  const intl = useIntl();
  // メッセージ用Hook
  const [messageApi, contextHolder] = message.useMessage();

  // 親のイベントを検知してオープン
  useEffect(() => {
    initialFormData(openMember);
  }, [openMember]);

  const selectJob = (job: string) => {
    addMember(
      {
        Job: job,
        Wepons: jobWepons
          .filter((m) => m.job == job && m.usually)
          .map((m) => {
            return {
              name: m.wepon,
              weponTypes: [],
              outWSTypes: [],
              group: "武器種",
            };
          }),
      },
      true
    );
    messageApi.info(
      intl.formatMessage(
        { id: "added_message" },
        {
          job:
            intl.locale == "ja"
              ? job
              : intl.formatMessage({ id: "job." + job }),
        }
      )
    );
  };

  const getWeponOption = () =>
    wepons
      .filter((n) => n.group == "武器種")
      .map((n) => {
        return {
          title:
            intl.locale == "ja"
              ? n.name
              : intl.formatMessage({
                  id: "wepon." + n.name,
                  defaultMessage: n.name,
                }),
          value: n.name,
          key: n.name,
          children: weponTypes
            .filter((m) => m.group == n.group)
            .map((m) => {
              return {
                title: `${
                  intl.locale == "ja"
                    ? m.name
                    : intl.formatMessage({ id: m.name })
                }`,
                value: `${n.name}-${m.name}`,
                key: `${n.name}-${m.name}`,
              };
            }),
        };
      });

  const getAviOption = () =>
    wepons
      .filter((n) => ["属性", "召喚獣", "種族", "青魔法"].includes(n.group))
      .map((n) => {
        return {
          title:
            intl.locale == "ja"
              ? n.name
              : intl.formatMessage({
                  id: "wepon." + n.name,
                  defaultMessage: n.name,
                }),
          value: n.name,
          key: n.name,
          children: weponTypes
            .filter((m) => m.group.startsWith(n.group))
            .map((m) => {
              return {
                title: `${
                  intl.locale == "ja"
                    ? m.name
                    : intl.formatMessage({ id: m.name })
                }`,
                value: `${n.name}-${m.name}`,
                key: `${n.name}-${m.name}`,
              };
            }),
        };
      });

  const getWeponTypeOption = (weponName: string, group: string) =>
    weponTypes
      .filter((m) => m.group.startsWith(group))
      .map((m) => {
        return {
          title: `${
            intl.locale == "ja" ? m.name : intl.formatMessage({ id: m.name })
          }`,
          value: `${weponName}-${m.name}`,
          key: `${weponName}-${m.name}`,
        };
      });

  // TreeSelectの共通設定
  const tProps = {
    allowClear: true,
    showSearch: true,
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_PARENT,
    treeCheckStrictly: true,
    style: {
      width: "100%",
    },
  };

  return (
    <Drawer
      title={
        <>
          <span style={{ paddingLeft: 4 }}>
            <FormattedMessage id="title.member_setting" />
          </span>
        </>
      }
      placement={"right"}
      width={380}
      open={isMemberSetting}
      onClose={() => {
        closeMemberSetting();
      }}
      data-dndkit-disabled-dnd-flag="true"
    >
      {contextHolder}
      <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
        <Radio.Group
          value={formData.Job}
          size="small"
          disabled={members.length > 4}
        >
          {jobs.map((m) => (
            <Radio.Button
              key={m.name}
              value={m.name}
              onClick={(e) => selectJob((e.target as HTMLInputElement).value)}
            >
              {intl.locale == "ja"
                ? m.name
                : intl.formatMessage({ id: "job." + m.name })}
            </Radio.Button>
          ))}
          <Radio.Button
            value="マトン"
            onClick={(e) => selectJob((e.target as HTMLInputElement).value)}
          >
            {intl.locale == "ja"
              ? "マトン"
              : intl.formatMessage({ id: "job.マトン" })}
          </Radio.Button>
          <Radio.Button
            value="フェイス"
            onClick={(e) => selectJob((e.target as HTMLInputElement).value)}
          >
            {intl.locale == "ja"
              ? "フェイス"
              : intl.formatMessage({ id: "job.フェイス" })}
          </Radio.Button>
        </Radio.Group>

        {formData.Job && formData.Job != "マトン" && formData.Job != "フェイス" ? (
          <>
            <TreeSelect
              disabled={formData.Job == "マトン" || formData.Job == "フェイス"}
              {...tProps}
              placeholder={intl.formatMessage({ id: "placeholder.wepon" })}
              treeData={getWeponOption()}
              treeNodeFilterProp="title"
              value={formData.Wepons}
              listHeight={400}
              onChange={(value) => handleChange("武器種", value, openMember!)}
            />
            <TreeSelect
              {...tProps}
              placeholder={intl.formatMessage({ id: "placeholder.ability" })}
              treeData={getAviOption()}
              treeNodeFilterProp="title"
              value={formData.Abi}
              onChange={(value) => handleChange("アビ魔法", value, openMember!)}
            />
          </>
        ) : null}

        {formData.Job == "マトン" ? (
          <>
            <TreeSelect
              {...tProps}
              placeholder={intl.formatMessage({ id: "placeholder.automaton" })}
              treeData={getWeponTypeOption("マトン", "フレーム")}
              treeNodeFilterProp="title"
              value={formData.Maton}
              onChange={(value) => handleChange("マトン", value, openMember!)}
            />
          </>
        ) : null}

        {formData.Job == "フェイス" ? (
          <TreeSelect
            {...tProps}
            placeholder={intl.formatMessage({ id: "placeholder.trust" })}
            treeData={getWeponTypeOption("フェイス", "フェイス")}
            treeNodeFilterProp="title"
            value={formData.Faith}
            onChange={(value) => handleChange("フェイス", value, openMember!)}
          />
        ) : null}
      </Space>
      <Divider />
      <Button
        onClick={() => {
          closeMemberSetting();
        }}
        style={{ width: "100%" }}
      >
        Close
      </Button>
    </Drawer>
  );
}
