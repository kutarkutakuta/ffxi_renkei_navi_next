import { useEffect, useState } from "react";
import { Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import useChainStore from "@/stores/useChainStore";
import useMasterStore from "@/stores/useMasterStore";
import useMemberStore from "@/stores/useMemberStore";
import { Chain } from "@/types/chain";
import styles from "./ChainTable.module.scss";
import { FilterValue } from "antd/es/table/interface";
import { useIntl } from "react-intl";

interface ColumnFilter {
  text: string;
  value: string;
}

export function ChainTable() {
  // メンバ操作用Hook
  const { members, updateFilters } = useMemberStore();
  // マスタ取得用Hook
  const { renkeis, weponSkills } = useMasterStore();
  // 国際化用Hooｋ
  const intl = useIntl();
  // 連携検索用Hook
  const {
    chains,
    viewParam,
    chainParam,
    loading,
    error,
    total,
    pageIndex,
    fetchData,
    setChainParam,
  } = useChainStore();

  // WS列フィルタ
  const [wsFilters, setColumnFilters] = useState<ColumnFilter[][]>([
    [],
    [],
    [],
    [],
    [],
  ]);
  // 連携列フィルタ
  const [chainFilters, setChainFilters] = useState<ColumnFilter[][]>([
    [],
    [],
    [],
    [],
  ]);

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
      title: "#",
      dataIndex: "id",
      width: 40,
      align: "center",
    },
    {
      title: "WS1",
      dataIndex: "name1",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 1),
      filters: wsFilters[0],
      filteredValue: members.length > 0 ? members[0].WSFilters : null,
    },
    {
      title: "P1",
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
      filters: wsFilters[1],
      filteredValue: members.length > 1 ? members[1].WSFilters : null,
    },
    {
      title: "P2",
      dataIndex: "power2",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_first",
      width: 35,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_first!),
      render: (value) => getRenkeiElement(value),
      filters: chainFilters[0],
      filteredValue: chainParam.chainFilters["chain_first"],
    },
    {
      title: "WS3",
      dataIndex: "name3",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 3),
      filters: wsFilters[2],
      filteredValue: members.length > 2 ? members[2].WSFilters : null,
    },
    {
      title: "P3",
      dataIndex: "power3",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_second",
      width: 35,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_second!),
      render: (value) => getRenkeiElement(value),
      filters: chainFilters[1],
      filteredValue: chainParam.chainFilters["chain_second"],
    },
    {
      title: "WS4",
      dataIndex: "name4",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 4),
      filters: wsFilters[3],
      filteredValue: members.length > 3 ? members[3].WSFilters : null,
    },
    {
      title: "P4",
      dataIndex: "power4",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_third",
      width: 35,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_third!),
      render: (value) => getRenkeiElement(value),
      filters: chainFilters[2],
      filteredValue: chainParam.chainFilters["chain_third"],
    },
    {
      title: "WS5",
      dataIndex: "name5",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 5),
      filters: wsFilters[4],
      filteredValue: members.length > 4 ? members[4].WSFilters : null,
    },
    {
      title: "P5",
      dataIndex: "power5",
      width: 40,
      align: "right",
      className: styles.power,
    },
    {
      dataIndex: "chain_fourth",
      width: 35,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_fourth!),
      render: (value) => getRenkeiElement(value),
      filters: chainFilters[3],
      filteredValue: chainParam.chainFilters["chain_fourth"],
    },
    {
      title: "Total",
      dataIndex: "power_sum",
      width: 48,
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

  const getWikiURL = (param: string) => {
    return intl.locale == "ja" || !param
      ? "http://wiki.ffo.jp/search.cgi?CCC=%E6%84%9B&Command=Search&qf=" +
        param +
        "&order=match&ffotype=title&type=title"
      : "https://www.bg-wiki.com/index.php?search=" +
        intl.formatMessage({ id: param, defaultMessage: param }) +
        "&title=Special%3ASearch&go=Go";
  };

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
    let wikiURL = "";

    switch (wsNumber) {
      case 1:
        wsName = viewParam.viewOmit && intl.locale == "ja"  ? data.short_name1! : data.name1!;
        am = data.am1!;
        wsType = data.ws_type1!;
        jobs = data.jobs1!;
        wikiURL = getWikiURL(data.name1!);
        break;
      case 2:
        wsName = viewParam.viewOmit && intl.locale == "ja"  ? data.short_name2! : data.name2!;
        am = data.am2!;
        wsType = data.ws_type2!;
        jobs = data.jobs2!;
        wikiURL = getWikiURL(data.name2!);
        break;
      case 3:
        wsName = viewParam.viewOmit && intl.locale == "ja"  ? data.short_name3! : data.name3!;
        am = data.am3!;
        wsType = data.ws_type3!;
        jobs = data.jobs3!;
        wikiURL = getWikiURL(data.name3!);
        break;
      case 4:
        wsName = viewParam.viewOmit && intl.locale == "ja"  ? data.short_name4! : data.name4!;
        am = data.am4!;
        wsType = data.ws_type4!;
        jobs = data.jobs4!;
        wikiURL = getWikiURL(data.name4!);
        break;
      case 5:
        wsName = viewParam.viewOmit && intl.locale == "ja" ? data.short_name5! : data.name5!;
        am = data.am5!;
        wsType = data.ws_type5!;
        jobs = data.jobs5!;
        wikiURL = getWikiURL(data.name5!);
        break;
    }
    return (
      <>
        <a href={wikiURL} target="_blank">
          {intl.locale == "ja" || !wsName  ? wsName : intl.formatMessage({ id: wsName, defaultMessage: wsName })}
        </a>
        {am && (
          <Tag bordered={true} color="volcano">
            {intl.formatMessage({ id: "tag.aftermath" })}
          </Tag>
        )}
        {wsType && wsType == "範囲" && (
          <Tag bordered={true} color="orange">
            {intl.formatMessage({ id: "tag.range" })}
          </Tag>
        )}
        {wsType && wsType != "範囲" && (
          <Tag bordered={true} color="cyan">
            {intl.locale == "ja" ? wsType : intl.formatMessage({ id: wsType, defaultMessage: wsType })}
          </Tag>
        )}
        {jobs && (
          <Tooltip
            title={
              <div>
                {intl.formatMessage({ id: "tag.support_message" })}
                :
                <br />
                {intl.locale == "ja" ? jobs : jobs
                  .split("")
                  .map((n) => intl.formatMessage({ id: "job." + n, defaultMessage: n }))
                  .join(",")}
              </div>
            }
              color="gold"
              placement="topLeft"
            >
              <Tag bordered={true} color="lime" className={styles.jobTag} style={{ marginLeft: -5 }}>
              {intl.locale == "ja"
                ? jobs
                : jobs
                    .split("")
                    .map((n) => intl.formatMessage({ id: "job." + n, defaultMessage: n }))
                    .join(",")}
            </Tag>
          </Tooltip>
        )}
      </>
    );
  };

  /**
   * 連携名称のElementを取得
   * 既定の列定義で使用
   * @param renkei
   * @returns
   */
  const getRenkeiElement = (renkei: string): any => {
    return intl.locale != "ja" && renkei ? (
      <Tooltip title={intl.formatMessage({ id: renkei, defaultMessage: renkei })}>
        {intl.formatMessage({ id: "skillchain." + renkei, defaultMessage: renkei })}
      </Tooltip>
    ) : (
      renkei
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
  const buildColumnFilter = () => {
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

      // 重複を削除してWS列フィルタにセット
      wsFilters[i] = wsList
        .filter(
          (ws, idx, array) => array.findIndex((m) => m.name == ws.name) === idx
        )
        .sort((a, b) => b.id - a.id)
        .map((ws) => {
          return { text: intl.locale == "ja" || !ws.name ? ws.name : intl.formatMessage({ id: ws.name, defaultMessage: ws.name }),
             value: ws.name };
        });
      setColumnFilters(wsFilters);

      // 連携列にフィルタセット
      chainFilters[i] = renkeis.map((m) => (
        { text: intl.locale == "ja" || !m.name ? m.name : intl.formatMessage({ id: m.name, defaultMessage: m.name }),
         value: m.name }
      ));
      setChainFilters(chainFilters);

      // メンバが減って非表示になった連携属性フィルタはクリア
      if (members.length < 5 && chainParam.chainFilters["chain_fourth"]) {
        delete chainParam.chainFilters["chain_fourth"];
      }
      if (members.length < 4 && chainParam.chainFilters["chain_third"]) {
        delete chainParam.chainFilters["chain_third"];
      }
      if (members.length < 3 && chainParam.chainFilters["chain_second"]) {
        delete chainParam.chainFilters["chain_second"];
      }
      if (members.length < 2 && chainParam.chainFilters["chain_first"]) {
        delete chainParam.chainFilters["chain_first"];
      }

      setChainParam(chainParam);
    }
  };

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

    // 連携属性
    const filteredRecord = Object.keys(filters)
      .filter((key) => key.startsWith("chain"))
      .reduce((obj: Record<string, FilterValue | null>, key: string) => {
        obj[key] = filters[key];
        return obj;
      }, {});
    chainParam.chainFilters = filteredRecord;
    setChainParam(chainParam);

    fetchData(members);
    buildColumnFilter();
  };

  return (
    <div
      style={{
        width:
          filterdColumns.length > 0
            ? filterdColumns
                .map((m) => m.width as number)
                .reduce((a, b) => a + b)
            : "100%",
      }}
    >
      {members.length > 1 ? (
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
            showTotal: (total) => `　${total} items`,
          }}
          onChange={(pagination, filters, _soter, extra) => {
            if (extra.action == "filter") handleChangeFilter(filters);
            else if (extra.action == "paginate")
              handleChangePage(pagination.current || 1);
          }}
        />
      ) : null}
    </div>
  );
}
