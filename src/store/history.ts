import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import AV from "leancloud-storage";
import { Uploader } from "models";
import { message } from "antd";

class HistoryStore {
  private list: AV.Queriable[] = [];
  private loading = false;
  private hasMore = true;
  private page = 0;
  limit = 10;

  constructor() {
    makeObservable<HistoryStore, "list" | "loading" | "hasMore" | "page">(
      this,
      {
        list: observable,
        loading: observable,
        hasMore: observable,
        limit: observable,
        page: observable,

        find: action,
        reset: action,

        getList: computed,
        getLoading: computed,
        getHasMore: computed,
      }
    );
  }

  /** 获取查询结果列表 */
  get getList() {
    return this.list;
  }

  get getLoading() {
    return this.loading;
  }

  get getHasMore() {
    return this.hasMore;
  }

  find() {
    this.loading = true;
    Uploader.find({ page: this.page, limit: this.limit })
      .then((result) => {
        console.log(result);
        
        runInAction(() => {
          this.list = this.list.concat(result);
        });

        runInAction(() => {
          this.page++;
        });

        if (result.length >= this.limit) {
          runInAction(() => {
            this.hasMore = true;
          });
        }

        runInAction(() => {
          this.hasMore = false;
        });
      })
      .catch((error) => {
        message.error("加载数据失败!");
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  }

  reset() {
    this.list = [];
    this.page = 0;
    this.loading = false;
    this.hasMore = true;
  }
}

export default new HistoryStore();
