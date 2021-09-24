import React, { useEffect } from "react";
import { List, Spin, Button, Popconfirm, message } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { useStores } from "store";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const HistoryWrapper = styled.div`
  .ant-list-items {
    .ant-list-item {
      div:nth-child(3) {
      }
    }
  }
`;

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;

const History: React.FC = observer(() => {
  const { historyStore } = useStores();

  useEffect(() => {
    return () => {
      historyStore.reset();
    };
  }, [historyStore]);

  const loadMore = () => {
    historyStore.find();
  };

  const deleteConfirm = (id: string) => {
    historyStore
      .delete(id)
      .then(() => {
        message.success("删除成功!");
        historyStore.reset();
      })
      .catch(() => message.warning("删除失败"));
  };

  return (
    <HistoryWrapper>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!historyStore.getLoading && historyStore.getHasMore}
        useWindow={true}
      >
        <List
          dataSource={historyStore.getList}
          renderItem={(item: any, index) => (
            <List.Item key={item.id}>
              <div>{index + 1}</div>
              <div>
                <Img src={item.attributes.url} />
              </div>
              <div>
                <h5>{item.attributes.filename}</h5>
              </div>
              <div>
                <a target="_blank" href={item.attributes.url}>
                  {item.attributes.url}
                </a>
              </div>
              <div>
                <Popconfirm
                  title="删除操作不可逆，是否继续？"
                  onConfirm={() => deleteConfirm(item.id)}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button type="primary" danger>
                    删除
                  </Button>
                </Popconfirm>
              </div>
            </List.Item>
          )}
        >
          {historyStore.getLoading && historyStore.getHasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </HistoryWrapper>
  );
});

export default History;
