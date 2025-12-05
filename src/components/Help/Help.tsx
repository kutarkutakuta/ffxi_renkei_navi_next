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
      placement={"left"}
      width="min(450px, 90vw)"
      open={isHelp}
      onClose={closeHelp}
      data-dndkit-disabled-dnd-flag="true"
    >
      {intl.locale == "ja" ? (
        <>
          <div className={styles.caption}>■ 連携メンバー</div>
          <p>
            連携メンバーはカード形式で、ドラッグ＆ドロップで順番の入れ替えができます。
          </p>
          <p>カードは5つ（4連携）まで追加できます。</p>
          <p>
            <EditOutlined />
            ：連携メンバーを設定するパネルを表示します。
          </p>
          <p>Copy ：連携メンバーを末尾にコピーします。</p>
          <p>
            <CloseOutlined />
            ：連携メンバーを削除します。
          </p>
          <Divider />
          <div className={styles.caption}>■ 連携メンバーの設定</div>
          <p>
            「ジョブ」を選択するとメンバーが追加されて、メインの「武器」を自動選択します。
            また、そのジョブが使用できないWSが検索に引っかからないようになります。
          </p>
          <p>
            「マトン」「フェイス」を選択した場合もメンバーが追加されます。
            「マトン」を選択した場合は「フレーム」ドロップダウンを指定してください。
            「フェイス」を選択した場合は「フェイス」ドロップダウンを指定してください。
          </p>
          <p>
            ドロップダウンは手入力による検索ができます。
            「アビ/魔法」や「フェイス」は項目数が多いので有効活用してください。
          </p>
          <p>武器種を指定すると対応するWSの強さにボーナスが乗ります。※1.2倍</p>
        </>
      ) : (
        <>
          <div className={styles.caption}>■ Members</div>
          <p>
            Members are in card format, and the order can be changed by dragging
            and dropping.
          </p>
          <p>You can add up to 5 cards (4 skillchanins).</p>
          <p>
            <EditOutlined />: Displays the panel for Member Settings.
          </p>
          <p>Copy : Copy the members to the end.</p>
          <p>
            <CloseOutlined />: Delete member.
          </p>
          <Divider />
          <div className={styles.caption}>■ Member Settings</div>
          <p>
            When you select "Job", members will be added and the main weapon will be automatically
            selected. Also, Wepon skills that cannot be used by that job will
            not be caught in the search.
          </p>
          <p>
            Members will also be added if you select "Automaton" or "Trust".
            If you select "Automaton", please specify the "Frame" dropdown.
            If you select "Trust", please specify the "Trust" dropdown.
          </p>
          <p>
            The dropdown allows you to search manually. Ability, Magic and Trust
            have a large number of items, so please make effective use of them.
          </p>
          <p>
           Select weapon type Then, the bonus will be added to the strength
            of the wepon skill. (1.2 times)
          </p>
        </>
      )}

      <Divider />

      <div className={styles.caption}>
        {intl.formatMessage({ id: "contact" })}
        <br />
        <a href="https://twitter.com/kutakutar_ff11" target="_blank">
          <TwitterOutlined /> kutakutar_ff11
        </a>
      </div>

      <div className={styles.caption}>
        <EyeOutlined />
        &nbsp;<Link href={"privacy.html"}>Privacy Policy</Link>
      </div>
    </Drawer>
  );
}
