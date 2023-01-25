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
	let socket;

	useEffect(() => {
		socket = io.connect("http://localhost:5000/tmp");
		return () => {
			socket.disconnect();
		};
	})

    useEffect(() => {

		const connect_to_name_change_handler = (data) => {
			tmp.name = data.name;
			setTmp({...tmp, name: data.name})
		}
		socket2?.on("connect_to_name_change", connect_to_name_change_handler);

		tmp_handler = () => {
			console.log(`inside useEffect => ${tmp.name}`);
		}
		socket?.on("tmp", tmp_handler);

		return () => {
			socket?.off("tmp", tmp_handler);
			socket?.off("connect_to_name_change", connect_to_name_change_handler);
		};
		
	}, [tmp]);

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
