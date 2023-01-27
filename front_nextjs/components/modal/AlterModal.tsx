import Modal from 'react-modal';

export default function AlterModal({ children, isOpen, closeFunction }) {
	return (
		<Modal isOpen={isOpen} onRequestClose={closeFunction} ariaHideApp={false} onClick={closeFunction}
			style={{
				overlay: {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(236, 236, 236, 0.75)',
				},
				content: {
					display: 'flex',
					position: 'absolute',
					width: '40%',
					height: '10%',
					top: '35%',
					left: '25%',
					right: '40px',
					bottom: '40px',
					border: '1px solid #ccc',
					background: '#fff',
					overflow: 'auto',
					WebkitOverflowScrolling: 'touch',
					borderRadius: '4px',
					outline: 'none',
					padding: '20px',
					justifyContent: 'center',
					alignItems: 'center'
				},
			}}
		>
			{children}
		</Modal>
	);
}
