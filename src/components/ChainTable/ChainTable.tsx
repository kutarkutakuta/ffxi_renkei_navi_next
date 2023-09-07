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

    const { chainParam, chains, loading, error, fetchData } = useChainStore();
    useEffect(() => {
        fetchData(members);
      }, [members, chainParam]);
      

      const columns: ColumnsType<Chain> = [
        {
          title: "ID",
          dataIndex: "id",
          width: 40,
          align:"center",
        },
        {
          title: "WS1",
          dataIndex: "name1",
          width: 140,
        },
        {
          dataIndex: "power1",
          width: 40,
          align:"right",
        },
        {
          title: "WS2",
          dataIndex: "name2",
          width: 140,
        },
        {
          dataIndex: "power2",
          width: 40,
          align:"right",
        },
        {
          dataIndex: "chain_first",
          width: 44,
          align:"center",
          render :(text) => getRenkeiElement(text)
        },
        {
          title: "WS3",
          dataIndex: "name3",
          width: 140,
        },
        {
          dataIndex: "power3",
          width: 40,
          align:"right",
        },
        {
          dataIndex: "chain_second",
          width: 45,
          align:"center",
          render :(text) => getRenkeiElement(text)
        },
        {
          title: "WS4",
          dataIndex: "name4",
          width: 140,
        },
        {
          dataIndex: "power4",
          width: 40,
          align:"right",
        },
        {
          dataIndex: "chain_third",
          width: 45,
          align:"center",
          render :(text) => getRenkeiElement(text)
        },
        {
          title: "WS5",
          dataIndex: "name5",
          width: 140,
        },
        {
          dataIndex: "power5",
          width: 40,
          align:"right",
        },
        {
          dataIndex: "chain_fourth",
          width: 45,
          align:"center",
          render :(text) => getRenkeiElement(text)
        },
        {
          title: "計",
          dataIndex: "power_sum",
          width: 40,
          align:"right",
        },
      ];

    /**
     * 連携名称からElementを取得
     * @param renkei 
     * @returns 
     */
    const getRenkeiElement = (renkei: string): any => {
        const ret = renkeis.find((n) => n.name == renkei);
        if(ret && ret.color){
            return {
                props: {style:{ background: ret.color, color: "#222", opacity: 0.7}},
                children: <div>{renkei}</div>
            };
        }
        else{
            return renkei;
        }
    }

  return (
    <>
      <Table size="small" bordered tableLayout="fixed"
        columns={columns}
        dataSource={chains}
        loading={loading}
        pagination={{ position: ["topLeft"], pageSize: 50 }}
      />
    </>
  );
}
