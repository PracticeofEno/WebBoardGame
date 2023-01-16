export default function HomeHeader() {
  
    return (
      <header>
        {/* 다음으로 할 작업 : 조건부 렌더링 이용해서 룰북을 누르면 컴포넌트가 나타나게 만들고, 최대화 버튼을 누르면 웹페이지가 전체화면화 되게 만들기! */}
        <div className="naviItem"><button className="w-full h-full bg-maximize bg-no-repeat bg-center bg-contain"></button></div>
        <div className="naviItem"><button className="w-full h-full bg-rullbook bg-no-repeat bg-center bg-contain"></button></div>
        <style jsx>
          {`
          header {
            position: fixed;
            top: 0;
            left: 0;
            height: 10%;
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
          }

          .naviItem {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100px;
            padding: 2rem 1rem 0 1rem;
          }
          `}
        </style>
      </header>
    );
  }
  