export default function BigBox({children}) {
    return (
        <div className={`bigBox`}>
            { children }
        <style jsx>{`
            .bigBox {
                display: flex;
                border: 4px rgba(14, 14, 10, 0.15) solid;
                margin: 5%;
                width: 85%;
                height: 75%;
                position: absolute;
                flex-direction: column;
                justify-content: center;
                background-color: rgba(80, 24, 81, 0.35);
                border-radius: 30px;
            }
        `}
        </style>
        </div>
    )
  }