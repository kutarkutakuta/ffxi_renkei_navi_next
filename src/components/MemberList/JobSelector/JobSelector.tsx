import React from "react";
import { Button, Space, Divider, message } from "antd";
import { UserAddOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import useMenuStore from "@/stores/useMenuStore";
import useMasterStore from "@/stores/useMasterStore";
import useMembersStore from "@/stores/useMemberStore";
import { useIntl } from "react-intl";
import styles from "./JobSelector.module.scss";

/**
 * JobSelector - ジョブ選択UI（メイン画面に常時表示）
 */
export function JobSelector() {
  const { jobs, jobWepons } = useMasterStore();
  const { members, addMember } = useMembersStore();
  const intl = useIntl();
  const { openHelp } = useMenuStore();
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
  };
  return (
    <div className={styles.jobSelector}>
      {contextHolder}
      <div className={styles.header}>
        <div className={styles.left}>
          <UserAddOutlined style={{ marginRight: 6, fontSize: 16 }} />
          <span className={styles.title}>
            {intl.formatMessage({ id: "select_job" })}
          </span>
          <span className={styles.counter}>
            ({members.length}/5)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Button
            type="text"
            className={styles.controlButton}
            onClick={openHelp}
            size="small"
            title={intl.formatMessage({ id: 'title.help' })}
            style={{ color: 'var(--card-text)' }}
          >
            <QuestionCircleOutlined style={{ fontSize: 16 }} />
          </Button>
        </div>
        {/* Controls moved to site header menu */}
      </div>
      <div className={styles.jobButtons}>
        <Space wrap>
          {jobs.map((m) => (
            <Button
              key={m.name}
              disabled={members.length >= 5}
              onClick={() => selectJob(m.name)}
              className={styles.jobButton}
            >
              {intl.locale == "ja"
                ? m.name
                : intl.formatMessage({ id: "job." + m.name, defaultMessage: m.name })}
            </Button>
          ))}
          <Button
            value="マトン"
            disabled={members.length >= 5}
            onClick={() => selectJob("マトン")}
            className={styles.jobButton}
          >
            {intl.locale == "ja"
              ? "マトン"
              : intl.formatMessage({ id: "job.マトン", defaultMessage: "マトン" })}
          </Button>
          <Button
            value="フェイス"
            disabled={members.length >= 5}
            onClick={() => selectJob("フェイス")}
            className={styles.jobButton}
          >
            {intl.locale == "ja"
              ? "フェイス"
              : intl.formatMessage({ id: "job.フェイス", defaultMessage: "フェイス" })}
          </Button>
        </Space>
      </div>
    </div>
  );
}
