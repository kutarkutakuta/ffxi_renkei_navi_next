
import { useEffect } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import useChainStore from "@/stores/useChainStore";
import useMasterStore from "@/stores/useMasterStore";
import useMemberStore from "@/stores/useMemberStore";
import { Chain } from "@/types/chain";
import styles from './ChainTable.module.scss'

export function ChainTable() {
  // メンバ操作用フック
  const { members } = useMemberStore();

  // マスタ取得用フック
  const { renkeis } = useMasterStore();

  const { chains, viewParam, loading, error, total,pageIndex, fetchData, setChainParam } = useChainStore();
  useEffect(() => {
    fetchData(members);
  }, [members]);

  const columns: ColumnsType<Chain> = [
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
    },
    {
      dataIndex: "power1",
      width: 35,
      align: "right",
      className :styles.power
    },
    {
      title: "WS2",
      dataIndex: "name2",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 2),
    },
    {
      dataIndex: "power2",
      width: 35,
      align: "right",
      className :styles.power
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
    },
    {
      dataIndex: "power3",
      width: 35,
      align: "right",
      className :styles.power,
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
    },
    {
      dataIndex: "power4",
      width: 35,
      align: "right",
      className :styles.power
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
    },
    {
      dataIndex: "power5",
      width: 35,
      align: "right",
      className :styles.power
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
      className :styles.power
    },
  ];

  //　メンバーが4人　11まで
  //　メンバーが3人　8まで
  //　メンバーが2人　5まで
  const getColumn = columns
      .filter((_,idx)=> idx <= 2 + (members.length - 1) * 3 || idx == 15)
      .filter(m=> viewParam.viewPower || m.className !== styles.power);

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
        {am && <Tag bordered={false} color="volcano">アフマス</Tag>}
        {wsType && <Tag bordered={false} color="cyan">{wsType}</Tag>}
        {jobs && <Tag bordered={false} color="lime">{jobs}</Tag>}
      </>
    );
  };
  /**
   * 連携名称からElementを取得
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

  const onChangePage = (pageIndex: number) => {
    fetchData(members, pageIndex);
  };

  return (
    <>
      <Table
        size="small"
        bordered
        tableLayout="fixed"
        rowKey="id"
        columns={getColumn}
        dataSource={chains}
        loading={loading}
        pagination={{ 
          position: ["topLeft"], pageSize: 50, current: pageIndex, total:total,
          showSizeChanger: false,
          showTotal: (total) => `　Total ${total} items`,
          onChange: onChangePage,
        }}
      />
    </>
  );
}
