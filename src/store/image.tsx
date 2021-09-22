import { makeObservable, observable, action, computed } from "mobx";
import AV from "leancloud-storage";
import { Uploader } from "models";

class ImageStore {
  private isUploading = false;
  private serverFile: AV.Object | undefined;
  private uploadPercent = 0;

  constructor() {
    makeObservable<ImageStore,
      "isUploading" | "serverFile" | "uploadPercent">( this, {
      isUploading: observable,
      serverFile: observable,
      uploadPercent: observable,

      upload: action,

      getServerFile: computed,
      getIsUploading: computed,
      getPercent: computed,
    } );
  }

  get getServerFile() {
    return this.serverFile;
  }

  get getIsUploading() {
    return this.isUploading;
  }

  get getPercent() {
    return this.uploadPercent;
  }

  upload(file: any, filename: string) {
    this.isUploading = true;
    this.serverFile = undefined;

    return new Promise( (resolve: (serverFile: any) => void, reject) => {
      Uploader.add( file, filename, (progress) => {
        this.uploadPercent = Math.round( progress.percent );
      } ).then( (serverFile) => {
        this.serverFile = serverFile;
        resolve( serverFile );
      } ).catch( (error) => {
        console.error( "上传失败", error );
        reject( error );
      } ).finally( () => {
        this.isUploading = false;
        this.uploadPercent = 0;
      } );
    } );
  }
}

export default new ImageStore();
