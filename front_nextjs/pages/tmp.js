import { useState } from 'react';
import AlterModal from "../components/modal/AlterModal";
import ResultContent from "../components/game/battle/result";
import ResultModal from "../components/modal/ResultModal";

export default function Tmp() {
    const [modalIsOpen, setModalIsOpen] = useState(true);
	const [modalContent, setModalContent] = useState("awef");

	function tmp () {
		setModalIsOpen(false);
	}


    return (
        <div className="flex w-full h-full justify-center items-center">
			<ResultModal isOpen={modalIsOpen} closeFunction={tmp}>
				<ResultContent card_1={"tiger"} card_2={"rabbit"} win={false} closeFunction={tmp}/>
			</ResultModal>
        </div>
    );
}
