const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&redirect_uri=http://localhost:3000/auth&client_id=86284776012-0covoldjsbrr962qki0295r3quqr8ik3.apps.googleusercontent.com";

export default function Tmp() {
  return (
    <div className={`flex absolute w-full h-full flex-col`}>
      <div className={`flex w-[9rem] h-[9rem] bg-blue-300`}>
        <button>
          <a href={`${process.env.NEXT_PUBLIC_OAUTH}`}>42 LOGIN </a>
        </button>
      </div>
    </div>
  );
}
