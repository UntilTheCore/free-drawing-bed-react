import React, { useEffect } from "react";
import { List, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { useStores } from "store";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const HistoryWrapper = styled.div`
  .ant-list-items {
    .ant-list-item {
      div:nth-child(3) {
        width: 550px;
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

  const loadMore = () => {
    historyStore.find();
  };

  useEffect(() => {
    return () => {
      historyStore.reset();
    };
  }, [historyStore]);

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
          renderItem={(item: any) => (
            <List.Item key={item.id}>
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
