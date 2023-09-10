import React, { useEffect } from "react";
import { Drawer, Space, Segmented, Select, TreeSelect, Divider } from "antd";
import {
  QuestionCircleOutlined,
  UserAddOutlined,
  SettingOutlined,
  MenuOutlined,
  ToolOutlined,
  CopyOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import useMenuStore from "@/stores/useMenuStore";
import styles from "./Help.module.scss";

export function Help() {
  // メニュー制御用フック
  const { isHelp, closeHelp } = useMenuStore();

  return (
    <Drawer
      title={
        <>
          <QuestionCircleOutlined />
          <span style={{ paddingLeft: 4 }}>ヘルプ（使い方）</span>
        </>
      }
      placement={"right"}
      width={450}
      open={isHelp}
      onClose={closeHelp}
      data-dndkit-disabled-dnd-flag="true"
    >
      <p className={styles.caption}><UserAddOutlined />連携メンバー</p>
      <p>連携メンバーはカード形式で、ドラッグ＆ドロップで順番の入れ替えができます。</p>
      <p>追加できるメンバーは5つ（4連携）までです。</p>
      <p>
        <ToolOutlined />
        ：連携メンバーを設定するパネルを表示します。
      </p>
      <p>
        <CopyOutlined />
        ：連携メンバーを末尾にコピーします。
      </p>
      <p>
        <CloseOutlined />
        ：連携メンバーを削除します。
      </p>
      <Divider />
      <p className={styles.caption}><ToolOutlined />連携メンバーの設定</p>
      <p>
        「ジョブ」を選択するとメインの「武器」を自動選択します。
        また、そのジョブが使用できないWSが検索に引っかからないようになります。
      </p>
      <p>
        ドロップダウンは手入力による検索ができます。
        「アビ/魔法」や「フェイス」は項目数が多いので有効活用してください。
      </p>
      <p>
      「武器」「アビ/魔法」は同時設定できますが、「マトン」「フェイス」を選択すると「武器」「アビ/魔法」はクリアされます。
        ※「マトン」「フェイス」はPCが操作できない為
      </p>
      <p>武器種を指定すると対応するWSの強さにボーナスが乗ります。※1.2倍</p>
      <Divider />
      <p className={styles.caption}>更新情報やお問い合わせはこちら</p>
      <a
        className="twitter-timeline"
        data-height="500"
        data-dnt="true"
        data-theme="light"
        href="https://twitter.com/kutakutar_ff11?ref_src=twsrc%5Etfw"
      >
        Tweets by kutakutar_ff11
      </a>{" "}
      <script async src="https://platform.twitter.com/widgets.js"></script>
    </Drawer>
  );
}
