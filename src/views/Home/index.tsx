import { ApiPromise } from "@polkadot/api";
import { PolkadotContext } from "contexts/Polkadot";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

const HomePage = () => {
    const { api } = useContext(PolkadotContext);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [protos, setProtos] = useState<any>({});
    const [preview, setPreview] = useState<any>("");

    const update = async () => {
        if(!api) return;
        console.log(api.query);
        api.query.protos.protos("0xf4752d7018ed062df64692c645718c9b2aec06326a08904b66ad5271daf61a66").then((result: any) => {
            const data = result.toJSON();
            setProtos(data);
            setIsLoading(false);
            const link = "https://ipfs.fragnova.network";
            const previewURL = `${link}/ipfs/zCT5htkeEJETJXJHWLHEFtBAdxodmfBd8iULtXknD2Pew911mLJ1?filename=_.txt`;
            fetch(previewURL).then(async (response) => {
                const preview = await response.text();
                setPreview(preview);
            }).catch(e => {
                console.log(e);
            })
        });
    };
    useEffect(() => {
        update();
    }, [])
    return (
        <>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <div>
                    <h2>Protos info</h2>
                    <pre>{JSON.stringify(protos, undefined, 2)}</pre>
                    <h2>Preview</h2>
                    <p>{preview}</p>
                </div>
            )}
        </>
    )
}

export default HomePage;