import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [doc, setDoc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ isError: false, msg: '' });


    useEffect(() => {
        let abortC = new AbortController();
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(url, { signal: abortC.signal });
                if (res.status >= 200 && res.status <= 399) {
                    const json = await res.json();
                    console.log('useFetch :', json);
                    setDoc(json);
                    setLoading(false);
                    setError({ isError: false, msg: '' });
                    return;
                } else if (res.status === 404) {
                    const json = await res.json();
                    throw new Error(json.message)
                } else if (res.status === 500) {
                    const json = await res.json();
                    throw new Error(json.message)
                }

            } catch (err) {
                console.log('Error is :',err);
                setError({ isError: true, msg: err.message });
                setLoading(false);
            }
        })();

        return () => {
            console.log('Abort fetch');
            abortC.abort();
        }
    }, [url])
    return { doc, loading, error, setDoc };
}

export default useFetch
