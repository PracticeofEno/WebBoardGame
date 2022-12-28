import BigBox from '../components/lobby/BigBox'
import TopPadding from '../components/lobby/TopPadding'
import Chat from '../components/lobby/Chat'
import Middle from '../components/lobby/MiddlePannel'
export default function Lobby() {
    return (
        <BigBox>
            <TopPadding/>
            <Middle/>
            <Chat/>
        </BigBox>
    )
  }