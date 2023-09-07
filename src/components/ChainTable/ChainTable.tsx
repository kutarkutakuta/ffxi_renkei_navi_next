import useChainStore from "@/stores/useChainStore";
import useMasterStore from "@/stores/useMasterStore";
import useMemberStore from "@/stores/useMemberStore";
import { Chain } from "@/types/chain";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

export function ChainTable() {
  // メンバ操作用フック
  const { members } = useMemberStore();

  // マスタ取得用フック
  const { renkeis } = useMasterStore();

  const { chains, viewParam, loading, error, fetchData } = useChainStore();
  useEffect(() => {
    fetchData(members);
  }, [members]);

  useEffect(() => {
    // TODO:表示更新
  }, [viewParam]);

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
      width: 40,
      align: "right",
    },
    {
      title: "WS2",
      dataIndex: "name2",
      width: viewParam.viewOmit ? 80 : 140,
      render: (_value: any, data: Chain) => getWSElement(data, 2),
    },
    {
      dataIndex: "power2",
      width: 40,
      align: "right",
    },
    {
      dataIndex: "chain_first",
      width: 44,
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
      width: 40,
      align: "right",
    },
    {
      dataIndex: "chain_second",
      width: 45,
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
      width: 40,
      align: "right",
    },
    {
      dataIndex: "chain_third",
      width: 45,
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
      width: 40,
      align: "right",
    },
    {
      dataIndex: "chain_fourth",
      width: 45,
      align: "center",
      onCell: (data) => getRenkeiStyleElement(data.chain_fourth!),
    },
    {
      title: "計",
      dataIndex: "power_sum",
      width: 40,
      align: "right",
    },
  ];

  const getWSElement = (data: Chain, wsNumber: number): JSX.Element => {
    let wsName = "";
    switch (wsNumber) {
      case 1:
        wsName = viewParam.viewOmit ? data.short_name1! : data.name1!;
        break;
      case 2:
        wsName = viewParam.viewOmit ? data.short_name2! : data.name2!;
        break;
      case 3:
        wsName = viewParam.viewOmit ? data.short_name3! : data.name3!;
        break;
      case 4:
        wsName = viewParam.viewOmit ? data.short_name4! : data.name4!;
        break;
      case 5:
        wsName = viewParam.viewOmit ? data.short_name5! : data.name5!;
        break;
    }
    return (
      <>
        <a>{wsName}</a>
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
        style: { background: ret.color, color: "#222", opacity: 0.7 },
      };
    }
  };

  return (
    <>
      <Table
        size="small"
        bordered
        tableLayout="fixed"
        rowKey="id"
        columns={columns}
        dataSource={chains}
        loading={loading}
        pagination={{ position: ["topLeft"], pageSize: 50 }}
      />
    </>
  );
}
