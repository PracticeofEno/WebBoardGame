export default function BigBox({children}) {
    return (
        <div className={`bigBox border-4 border-gray-400`}>
            { children }
        <style jsx>{`
            .bigBox {
                display: flex;
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