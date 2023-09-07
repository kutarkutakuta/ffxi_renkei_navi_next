import useChainStore from "@/stores/useChainStore";
import useMemberStore from "@/stores/useMemberStore";
import { Chain } from "@/types/chain";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const columns: ColumnsType<Chain> = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "WS1",
    dataIndex: "name1",
    width: 150,
  },
  {
    dataIndex: "power1",
    width: 40,
  },
  {
    title: "WS2",
    dataIndex: "name2",
    width: 150,
  },
  {
    dataIndex: "power2",
    width: 40,
  },
  {
    dataIndex: "chain_first",
    width: 45,
  },
  {
    title: "WS3",
    dataIndex: "name3",
    width: 150,
  },
  {
    dataIndex: "power3",
    width: 40,
  },
  {
    dataIndex: "chain_second",
    width: 45,
  },
  {
    title: "WS4",
    dataIndex: "name4",
    width: 150,
  },
  {
    dataIndex: "power4",
    width: 40,
  },
  {
    dataIndex: "chain_third",
    width: 45,
  },
  {
    title: "WS5",
    dataIndex: "name5",
    width: 150,
  },
  {
    dataIndex: "power5",
    width: 40,
  },
  {
    dataIndex: "chain_fourth",
    width: 45,
  },
  {
    title: "計",
    dataIndex: "power_sum",
    width: 40,
  },
];

export function ChainTable() {
 
    // メンバ操作用フック
    const { members } = useMemberStore();
    
    const { chainParam, chains, loading, error, fetchData } = useChainStore();
    useEffect(() => {
        fetchData(members);
      }, [members, chainParam]);
      

  return (
    <>
      <Table size="small" bordered
        columns={columns}
        dataSource={chains}
        loading={loading}
        pagination={{ position: ["topLeft"], pageSize: 50 }}
      />
    </>
  );
}
