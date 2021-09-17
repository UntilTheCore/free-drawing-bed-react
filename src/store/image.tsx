import { makeObservable, observable, action, computed } from "mobx";
import AV, { User } from "leancloud-storage";
import { Auth, Uploader } from "models";

class ImageStore {
  private filename = "";
  private file: AV.Object | undefined;
  private isUploading = false;
  private serverFile: AV.Object | undefined;

  constructor() {
    makeObservable<
      ImageStore,
      "filename" | "file" | "isUploading" | "serverFile"
    >(this, {
      filename: observable,
      file: observable,
      isUploading: observable,
      serverFile: observable,

      getFile: computed,
    });
  }

  get getFile() {
    return this.file;
  }

  upload(file: AV.Object, filename: string) {
    this.isUploading = true;
    return new Promise((resolve: (serverFile: AV.Object) => void, reject) => {
      Uploader.add(file, filename)
        .then((serverFile) => {
          this.serverFile = serverFile;
          resolve(serverFile);
        })
        .catch((error) => {
          console.error("上传失败");
          reject(error);
        })
        .finally(() => {
          this.isUploading = false;
        });
    });
  }
}

export default new ImageStore();
