import { makeObservable, observable, action, computed } from "mobx";
import AV from "leancloud-storage";
import { Uploader } from "models";

class ImageStore {
  private isUploading = false;
  private serverFile: AV.Object | undefined;

  constructor() {
    makeObservable<
      ImageStore,
      "isUploading" | "serverFile"
    >(this, {
      isUploading: observable,
      serverFile: observable,

      upload: action,

      getServerFile: computed,
    });
  }

  get getServerFile() {
    return this.serverFile;
  }

  upload(file: any, filename: string) {
    this.isUploading = true;
    return new Promise((resolve: (serverFile: any) => void, reject) => {
      Uploader.add(file, filename)
        .then((serverFile) => {
          this.serverFile = serverFile;
          resolve(serverFile);
        })
        .catch((error) => {
          console.error("上传失败",error);
          reject(error);
        })
        .finally(() => {
          this.isUploading = false;
        });
    });
  }
}

export default new ImageStore();
