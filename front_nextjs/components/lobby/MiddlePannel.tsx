import Player from "./Player";

export default function Middle() {
  return (
    <div className={`middle`}>
        <div className={'player'}>
            <Player/>
        </div>
        <div className={'ready'}>
            <button style={{
                width: '100px',
                height: '70px',
                fontSize: '25px',
            }}>ready</button>
        </div>
        <div className={'player'}>
            <Player/>
        </div>

        <style jsx>
        {`
            .middle {
                display: flex;
                border: 4px rgba(14, 14, 10, 0.15) solid;
                width: 100%;
                height: 100%;
                position: relative;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

            .player {
                display: flex;
                width:30%;
                height: 80%;
                justify-content: center;
                align-items: center;
            }
            
            .ready {
                margin-left: 10%;
                margin-right: 10%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `}
        </style>
    </div>
  );
}
