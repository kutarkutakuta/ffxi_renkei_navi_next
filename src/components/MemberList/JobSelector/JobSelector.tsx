import React from "react";
import { Button, Radio, Space, Divider, message } from "antd";
import { UserAddOutlined, SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import useMasterStore from "@/stores/useMasterStore";
import useMembersStore from "@/stores/useMemberStore";
import useMenuStore from "@/stores/useMenuStore";
import { useIntl } from "react-intl";
import styles from "./JobSelector.module.scss";

/**
 * JobSelector - ジョブ選択UI（メイン画面に常時表示）
 */
export function JobSelector() {
  const { jobs, jobWepons } = useMasterStore();
  const { members, addMember } = useMembersStore();
  const { openSearchSetting, openHelp } = useMenuStore();
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  const selectJob = (job: string) => {
    if (members.length >= 5) {
      messageApi.warning({
        content: intl.formatMessage({ id: "max_members_message" }),
        style: { marginTop: "4vh" },
      });
      return;
    }

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
    
    // messageApi.success({
    //   content: intl.formatMessage(
    //     { id: "added_message" },
    //     {
    //       job:
    //         intl.locale == "ja"
    //           ? job
    //           : intl.formatMessage({ id: "job." + job }),
    //     }
    //   ),
    //   style: { marginTop: "4vh" },
    // });
  };
  return (
    <div className={styles.jobSelector}>
      {contextHolder}
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <UserAddOutlined style={{ marginRight: 6, fontSize: 16 }} />
          <span className={styles.title}>
            {intl.formatMessage({ id: "select_job" })}
          </span>
          <span className={styles.counter}>
            ({members.length}/5)
          </span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={openSearchSetting}
            size="small"
            title={intl.formatMessage({ id: "title.search_setting" })}
            style={{ color: 'var(--card-text)' }}
          />
          <Button
            type="text"
            icon={<QuestionCircleOutlined />}
            onClick={openHelp}
            size="small"
            title={intl.formatMessage({ id: "title.help" })}
            style={{ color: 'var(--card-text)' }}
          />
        </div>
      </div>
      <div className={styles.jobButtons}>
        <Radio.Group size="small" value={null}>
          {jobs.map((m) => (
            <Radio.Button
              key={m.name}
              value={m.name}
              disabled={members.length >= 5}
              onClick={() => selectJob(m.name)}
              className={styles.jobButton}
            >
              {intl.locale == "ja"
                ? m.name
                : intl.formatMessage({ id: "job." + m.name })}
            </Radio.Button>
          ))}
          <Radio.Button
            value="マトン"
            disabled={members.length >= 5}
            onClick={() => selectJob("マトン")}
            className={styles.jobButton}
          >
            {intl.locale == "ja"
              ? "マトン"
              : intl.formatMessage({ id: "job.マトン" })}
          </Radio.Button>
          <Radio.Button
            value="フェイス"
            disabled={members.length >= 5}
            onClick={() => selectJob("フェイス")}
            className={styles.jobButton}
          >
            {intl.locale == "ja"
              ? "フェイス"
              : intl.formatMessage({ id: "job.フェイス" })}
          </Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
}
