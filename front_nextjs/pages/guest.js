import HomeHeader from "../components/home/header";

export default function Guest({ children, home }) {

  return (
    <main className="flex flex-col absolute w-full h-full justify-center items-center bg-no-repeat bg-center bg-contain ">
      <HomeHeader/>
      <h1 className="font-alssu text-black">얼쑤 : 곶감전</h1>
        <div className="flex justify-evenly flex-col w-[50rem] h-[30rem]">
            <input
            type="text"
            onChange={(e) => setNickname(e.target.value)}
            className="h-24 border text-5xl px-4 placeholder:font-alssu"
            placeholder={"닉네임"}
            >
            </input>
            <button className="button h-24 rounded-2xl">
                닉네임 설정
            </button>
        </div>
      <style jsx>
        {`
        h1{
          font-size: 11rem;
        }

        .button {
            border: 1px solid black;
            font-family: "alssu", sans-serif;
            font-size: 3rem;
            letter-spacing: 0.4rem;
            font-weight: 500;
            color: #000;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            transition: all 0.3s ease 0s;
            cursor: pointer;
        }
          
          .button:hover {
            transform: translateY(-3px);
        }
        
        `}
      </style>
    </main>
  );
}
