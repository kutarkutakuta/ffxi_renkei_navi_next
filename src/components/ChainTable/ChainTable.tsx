import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import useChainStore from "@/stores/useChainStore";
import useMasterStore from "@/stores/useMasterStore";
import useMemberStore from "@/stores/useMemberStore";
import { Chain } from "@/types/chain";
import styles from "./ChainTable.module.scss";
import { FilterValue } from "antd/es/table/interface";

interface ColumnFilter {
  text: string;
  value: string;
}

export function ChainTable() {
  // メンバ操作用Hook
  const { members, updateFilters } = useMemberStore();
  // マスタ取得用Hook
  const { renkeis, weponSkills } = useMasterStore();
  // 連携検索用Hook
  const {
    chains,
    chainParam,
    viewParam,
    loading,
    error,
    total,
    pageIndex,
    fetchData,
    setChainParam,
  } = useChainStore();

  // 列フィルタ
  const [columnFilters ,setColumnFilters] = useState<ColumnFilter[][]>([[], [], [], [], []]);

  // メンバに変化があればフェッチし直し
  useEffect(() => {
    fetchData(members);
    buildColumnFilter();
  }, [members]);

  /**
   * 既定の列定義
   */
  const defaultColumns: ColumnsType<Chain> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 40,
      align: "center",
    },
    {
      title: "WS1",
      dataIndex: "name1",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 1),
      filters: columnFilters[0],
      filteredValue : members.length > 0 ? members[0].WSFilters : null,
    },
    {
      dataIndex: "power1",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      title: "WS2",
      dataIndex: "name2",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 2),
      filters: columnFilters[1],
      filteredValue : members.length > 1 ? members[1].WSFilters : null,
    },
    {
      dataIndex: "power2",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_first",
      width: 30,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_first!),
    },
    {
      title: "WS3",
      dataIndex: "name3",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 3),
      filters: columnFilters[2],
      filteredValue : members.length > 2 ? members[2].WSFilters : null,
    },
    {
      dataIndex: "power3",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_second",
      width: 30,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_second!),
    },
    {
      title: "WS4",
      dataIndex: "name4",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 4),
      filters: columnFilters[3],
      filteredValue : members.length > 3 ? members[3].WSFilters : null,
    },
    {
      dataIndex: "power4",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_third",
      width: 30,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_third!),
    },
    {
      title: "WS5",
      dataIndex: "name5",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 5),
      filters: columnFilters[4],
      filteredValue : members.length > 4 ? members[4].WSFilters : null,
    },
    {
      dataIndex: "power5",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_fourth",
      width: 30,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_fourth!),
    },
    {
      title: "計",
      dataIndex: "power_sum",
      width: 40,
      align: "right",
      className: styles.power,
    },
  ];

  /**
   * 表示する列定義
   * メンバが2人なら4列目、3人なら7列目、4人なら10列目まで
   * 強さ非表示なら該当列を消す
   */
  const filterdColumns = defaultColumns
    .filter((_, idx) => idx <= 2 + (members.length - 1) * 3 || idx == 15)
    .filter((m) => viewParam.viewPower || m.className !== styles.power);

  /**
   * WSのElement取得
   * 既定の列定義で使用
   * @param data 
   * @param wsNumber 
   * @returns 
   */
  const getWSElement = (data: Chain, wsNumber: number): JSX.Element => {
    let wsName = "";
    let am = false;
    let wsType = "";
    let jobs = "";
    switch (wsNumber) {
      case 1:
        wsName = viewParam.viewOmit ? data.short_name1! : data.name1!;
        am = data.am1!;
        wsType = data.ws_type1!;
        jobs = data.jobs1!;
        break;
      case 2:
        wsName = viewParam.viewOmit ? data.short_name2! : data.name2!;
        am = data.am2!;
        wsType = data.ws_type2!;
        jobs = data.jobs2!;
        break;
      case 3:
        wsName = viewParam.viewOmit ? data.short_name3! : data.name3!;
        am = data.am3!;
        wsType = data.ws_type3!;
        jobs = data.jobs3!;
        break;
      case 4:
        wsName = viewParam.viewOmit ? data.short_name4! : data.name4!;
        am = data.am4!;
        wsType = data.ws_type4!;
        jobs = data.jobs4!;
        break;
      case 5:
        wsName = viewParam.viewOmit ? data.short_name5! : data.name5!;
        am = data.am5!;
        wsType = data.ws_type5!;
        jobs = data.jobs5!;
        break;
    }
    return (
      <>
        <a>{wsName}</a>
        {am && (
          <Tag bordered={false} color="volcano">
            アフマス
          </Tag>
        )}
        {wsType && (
          <Tag bordered={false} color="cyan">
            {wsType}
          </Tag>
        )}
        {jobs && (
          <Tag bordered={false} color="lime">
            {jobs}
          </Tag>
        )}
      </>
    );
  };
  /**
   * 連携名称からStyleElementを取得
   * 既定の列定義で使用
   * @param renkei
   * @returns
   */
  const getRenkeiStyleElement = (renkei: string): any => {
    const ret = renkeis.find((n) => n.name == renkei);
    if (ret && ret.color) {
      return {
        className: "renkei",
        style: { background: ret.color },
      };
    }
  };

  /**
   * 列フィルタ構築
   */
  const buildColumnFilter = ()=>{
    for (let i = 0; i < members.length; i++) {
      let wsList = weponSkills.filter(
        (ws) =>
          members[i].Wepons.findIndex((mw) => {
            if (mw.group == "武器種") {
              // 武器種の場合はweponが一致すればOK
              return mw.name == ws.wepon;
            } else {
              // 武器種以外でws_typeがあればws_typeも一致が必要
              return (
                mw.name == ws.wepon &&
                (mw.weponTypes.length == 0 ||
                  mw.weponTypes.findIndex((mwt) => mwt == ws.ws_type) > -1)
              );
            }
          }) > -1
      );

      // 重複を削除して列フィルタにセット
      columnFilters[i] = wsList
      .filter((ws, idx, array) => array.findIndex(m=>m.name == ws.name) === idx)
      .sort((a,b)=> b.id - a.id)
      .map(ws => {
        return { text: ws.name, value: ws.name };
      })
      setColumnFilters(columnFilters);

    }
  }

  /**
   * ページ遷移時のイベントハンドラ
   * @param pageIndex 
   */
  const handleChangePage = (pageIndex: number) => {
    fetchData(members, pageIndex);
  };

  /**
   * フィルタ変更時のイベントハンドラ
   * @param filters 
   */
  const handleChangeFilter = (filters: Record<string, FilterValue | null>) => {
    // TODO:updateFiltersでメンバー変わるのにuseEffectで検知されないのでfetchDataを呼んでいる
    // 配列内を変更しても変更とみなれない？
    updateFilters(filters);
    fetchData(members);
    buildColumnFilter();
  };

  return (
    <div style={{width: filterdColumns.length > 0 ? filterdColumns.map(m=>m.width as number).reduce((a,b) => a + b) : "100%" }}>
      <Table
        size="small"
        bordered
        tableLayout="fixed"
        rowKey="id"
        columns={filterdColumns}
        
        dataSource={chains}
        loading={loading}
        pagination={{
          position: ["topLeft"],
          pageSize: 50,
          current: pageIndex,
          total: total,
          showSizeChanger: false,
          showTotal: (total) => `　Total ${total} items`,
        }}
        onChange={(pagination,filters,_soter,extra) =>{
          if(extra.action == "filter") handleChangeFilter(filters);
          else if(extra.action == "paginate") handleChangePage(pagination.current || 1)
        }}
      />
    </div>
  );
}
