import AV, { User } from "leancloud-storage";

AV.init( {
  appId: "GgIlxGEpg1g7fCuWM80nsc3s-gzGzoHsz",
  appKey: "hs6Q9EkWT5YcFIxiSjbGB2iQ",
  serverURL: "https://ggilxgep.lc-cn-n1-shared.com",
} );

const Auth = {
  register(username: string, password: string) {
    const user = new User();
    user.setUsername( username );
    user.setPassword( password );
    return new Promise( (resolve: (user: User) => void, reject: any) => {
      user.signUp().then(
        (user) => resolve( user ),
        (error) => reject( error )
      );
    } );
  },

  login(username: string, password: string) {
    return new Promise( (resolve: (user: User) => void, reject: any) => {
      User.logIn( username, password ).then(
        (user) => resolve( user ),
        (error) => reject( error )
      );
    } );
  },

  logout() {
    User.logOut();
  },

  getCurrentUser() {
    return User.current();
  },
};

const Uploader = {
  add(file: any, filename: string, onprogress: (progress: any) => void) {
    const avFile = new AV.File( filename, file );
    return new Promise( (resolve: (serverFile: AV.Object) => void, reject) => {
      avFile
      .save( {
        onprogress(progress: any) {
          onprogress( progress );
        },
      } )
      .then( (serverFile: AV.File) => {
        console.log( "File", serverFile );
        const item = new AV.Object( "Image" );
        item.set( "filename", filename );
        item.set( "owner", AV.User.current() );
        item.set( "url", serverFile.url() );

        item
        .save()
        .then( (imageObj: AV.Object) => {
          console.log( "File & imageObject", imageObj );

          resolve( imageObj );
        } )
        .catch( (error) => {
          reject( error );
        } );
      } )
      .catch( (error) => {
        reject( error );
      } );
    } );
  },
  find({ page, limit }: { page: number, limit: number } = { page: 0, limit: 10 }) {
    const imgObj = new AV.Query( "Image" );
    imgObj.include( "owner" )
          .equalTo( "owner", AV.User.current() )
          .limit( limit )
          .skip( page * limit )
          .descending( "createAt" );

    imgObj.find().then( result => {
      console.log( result );
    } );
  }
};

export { Auth, Uploader };
