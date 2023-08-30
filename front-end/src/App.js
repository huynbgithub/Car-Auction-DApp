import { useState, createContext } from "react";
import RouterComponent from "./router";

export const Web3Context = createContext();

function App() {

    const [web3, setWeb3] = useState(null);

    return (
        <Web3Context.Provider value={{ web3, setWeb3 }}>
            <div>
                <RouterComponent />
            </div>
        </Web3Context.Provider>
    );
}

export default App;
