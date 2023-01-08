import queryString from 'query-string';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';


export default function Oauth(props) {
    const router = useRouter();
    const [access, setAccess] = useState("");
    
    useEffect(() => {
        setAccess(queryString.parse(router.asPath)['/auth#access_token']);
    })
    
    return (
        <div className={`flex absolute w-full h-full flex-col`}>
            <h4>{`acceess token is = ${access}`} </h4>
        </div>
    );
}