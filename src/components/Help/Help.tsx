import React, { useEffect } from "react";
import { Drawer, Space, Segmented, Select, TreeSelect, Divider } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  CloseOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import useMenuStore from "@/stores/useMenuStore";
import styles from "./Help.module.scss";
import Link from "next/link";
import { useIntl } from "react-intl";

export function Help() {
  // メニュー制御用フック
  const { isHelp, closeHelp } = useMenuStore();
  // 国際化用Hook
  const intl = useIntl();

  return (
    <Drawer
      title={
        <>
          <span style={{ paddingLeft: 4, fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
            {intl.formatMessage({ id: "title.help" })}
          </span>
        </>
      }
      placement={"right"}
      width="min(450px, 90vw)"
      open={isHelp}
      onClose={closeHelp}
      data-dndkit-disabled-dnd-flag="true"
    >
      {intl.locale == "ja" ? (
        <>
          <section className={styles.helpSection}>
            <div className={styles.caption}>メンバーの選択</div>
            <p>
              画面上部の<strong>「メンバーを選択」</strong>からジョブ、マトン、フェイスを選択して連携メンバーを追加します。<br />メンバーは5人（4連携）まで追加できます。
            </p>
          </section>
          <Divider />

          <section className={styles.helpSection}>
            <div className={styles.caption}>メンバーの設定</div>
            <ul>
              <li>
                ジョブを選択：<strong>「武器」</strong>または<strong>「アビリティ / 魔法」</strong>を指定します。
                <div className={styles.tip}>
                  <EyeOutlined className={styles.iconInline} />
                  ヒント：「武器」の「武器種」まで指定すると対応するWSの強さにボーナスが乗ります（1.2倍）。
                </div>
              </li>
              <li>マトンを選択：<strong>「フレーム」</strong>を指定します。</li>
              <li>
                フェイスを選択：<strong>「フェイス」</strong>を指定します。
                <div className={styles.tip}>
                  <EyeOutlined className={styles.iconInline} />
                  ヒント：ドロップダウンは入力検索が可能です。項目が多い場合はフィルタで絞り込むと便利です。
                </div>
              </li>
            </ul>
          </section>
          <Divider />

          <section className={styles.helpSection}>
            <div className={styles.caption}>メンバーの操作</div>
            <p>
              メンバーはカード形式で表示され、ドラッグ＆ドロップで並び替えが可能です。
            </p>
            カードのヘッダにあるボタンで以下の操作が可能です。
            <ul>
              <li><EditOutlined className={styles.iconInline} />：メンバーの設定パネルを開く</li>
              <li>Copy：メンバーを末尾へコピー</li>
              <li><CloseOutlined className={styles.iconInline} />：メンバーを削除</li>
            </ul>
          </section>
          <Divider />
        </>
      ) : (
        <>
          <section className={styles.helpSection}>
            <div className={styles.caption}>{intl.formatMessage({ id: 'select_job' })}</div>
            <p>
              Use the <strong>"{intl.formatMessage({ id: 'select_job' })}"</strong> control at the top of the page to select a job, automaton, or trust and add them as members.
              Members appear as cards and can be reordered with drag & drop.
            </p>
            <ul>
              <li>{intl.formatMessage({ id: 'max_members_message' })}</li>
              <li>Selecting a job will add a default main weapon and relevant weapon skills for that job.</li>
            </ul>
          </section>

          <section className={styles.helpSection}>
            <div className={styles.caption}>Member Settings</div>
            <ul>
              <li>
                <strong>Job selection:</strong> choose the <strong>{intl.formatMessage({ id: 'label.wepon' })}</strong> or <strong>{intl.formatMessage({ id: 'label.ability' })}</strong> to configure the member.
                <div className={styles.tip}>
                  <EyeOutlined className={styles.iconInline} />
                  Tip: When you specify the weapon type down to the weapon category, the corresponding weapon skill receives a bonus to its strength (e.g., x1.2).
                </div>
              </li>
              <li>
                <strong>Automaton selection:</strong> pick a <strong>{intl.formatMessage({ id: 'label.automaton' })}</strong> frame.
              </li>
              <li>
                <strong>Trust selection:</strong> pick a <strong>{intl.formatMessage({ id: 'label.trust' })}</strong>.
                <div className={styles.tip}>
                  <EyeOutlined className={styles.iconInline} />
                  Tip: The dropdown fields support typing to search — use the filter when lists are long.
                </div>
              </li>
            </ul>
          </section>

          <section className={styles.helpSection}>
            <div className={styles.caption}>Operations</div>
            <p>Members are displayed as cards and can be reordered by drag & drop.</p>
            <div>Use the buttons in each card header to perform the following actions:</div>
            <ul>
              <li><EditOutlined className={styles.iconInline} />: Open the member settings panel.</li>
              <li>Copy: Duplicate the member and append them to the list.</li>
              <li><CloseOutlined className={styles.iconInline} />: Remove the member.</li>
            </ul>
          </section>
        </>
      )}

    </Drawer>
  );
}
