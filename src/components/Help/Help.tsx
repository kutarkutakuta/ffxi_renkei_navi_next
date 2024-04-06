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

export function Help() {
  // メニュー制御用フック
  const { isHelp, closeHelp } = useMenuStore();

  return (
    <Drawer
      title={
        <><span style={{ paddingLeft: 4 }}>ヘルプ（使い方）</span>
        </>
      }
      placement={"left"}
      width={450}
      open={isHelp}
      onClose={closeHelp}
      data-dndkit-disabled-dnd-flag="true"
    >
      <div className={styles.caption}>
        ■ 連携メンバー
      </div>
      <p>
        連携メンバーはカード形式で、ドラッグ＆ドロップで順番の入れ替えができます。
      </p>
      <p>カードは5つ（4連携）まで追加できます。</p>
      <p>
        <EditOutlined />
        ：連携メンバーを設定するパネルを表示します。
      </p>
      <p>
        Copy
        ：連携メンバーを末尾にコピーします。
      </p>
      <p>
        <CloseOutlined />
        ：連携メンバーを削除します。
      </p>
      <Divider />
      <div className={styles.caption}>
        ■ 連携メンバーの設定
      </div>
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
      <div className={styles.caption}>更新情報やお問い合わせはこちら　<a href="https://twitter.com/kutakutar_ff11" target="_blank">
        <TwitterOutlined /> kutakutar_ff11
      </a></div>
      
      <div className={styles.caption}>
      <EyeOutlined />&nbsp;<Link href={"privacy.html"}>Privacy Policy</Link></div>
      
    </Drawer>
  );
}
