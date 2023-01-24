import { data } from 'autoprefixer';
import { useEffect } from 'react';
import { useState } from 'react';
import io from "socket.io-client";

class O {
	name;

	constructor() {
		this.name = "this is constructor"
	}
};

export default function Tmp() {
	const [tmp, setTmp] = useState(new O())
	const [socket, setSocket] = useState(null);

    useEffect(() => {
		const socket2 = io.connect("http://localhost:5000/tmp");
		setSocket(socket2);

		socket2?.on("connect_to_name_change", (data) => {
			tmp.name = data.name;
			setTmp({...tmp, name: data.name})
		});

		socket2?.on("tmp", () => {
			console.log(`inside useEffect => ${tmp.name}`);
		});
		
	}, []);

	function tmp2() {
		console.log(`outside useEffect => ${tmp.name}`);
		socket?.emit("tmp", null);
	}

    return (
        <div className="flex w-full h-full justify-start bg-gray-400 flex-row">
            <div className="flex w-[12rem] h-[40rem] bg-pink-400">
                <button onClick={tmp2}> haha </button>
            </div>
        </div>
    );
}
