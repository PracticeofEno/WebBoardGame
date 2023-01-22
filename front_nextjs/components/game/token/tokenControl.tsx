import Image from "next/image";
import { useEffect, useState } from "react";
import TokenView from "./tokenView";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function TokenControl({socket}) {

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
		<div className="flex relative w-full h-full flex-col justify-center items-center border-2 border-gray-100">
			<div className="flex flex-col w-full h-1/3 bg-blue-300">
				<Dropdown options={array} onChange={valueChange} value={defaultOption} placeholder="Select an option" />
				<div className="flex h-1/3 w-full border-2 border-gray-300 justify-center">
					<button onClick={submitToken} className="w-1/2 h-full bg-gray-200 border-2 border-black justify-center">제출</button>
				</div>
			</div>
			<div className="w-full h-1/3 bg-pink-300">
				<TokenView gold={50} />
			</div>
			<div className="w-full h-1/3 bg-red-300"></div>
			<style jsx>{`
			`}</style>
		</div>
	);
}
