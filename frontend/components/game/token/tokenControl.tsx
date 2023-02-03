import Image from "next/image";
import { useEffect, useState } from "react";
import TokenView from "./tokenView";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function TokenControl({socket, }) {

	const array = ["3", "4", "5", "6", "7", "8", "9"];
	const defaultOption = array[0];
	let value = 3;

	function valueChange(e: any){
		value = e.value;
		console.log(value);
	}

	function submitToken(){
		console.log(`submit tokne : ${value}`);
		socket?.emit("submit_token", {
			count: value
		})
		
	}

	return (
		<div className="flex relative w-full h-full flex-col justify-center items-center border-2 border-black-100">
			<div className="w-4/5 h-1/4 ">
				<Dropdown options={array} onChange={valueChange} value={defaultOption} placeholder="Select an option" />
			</div>
				
				<div className="flex h-1/4 w-4/5 justify-center border-2 border-black rounded">
					<button onClick={submitToken} className="w-full h-full bg-gray-200  justify-center">제출</button>
				</div>

			<style jsx>{`
			`}</style>
		</div>
	);
}
