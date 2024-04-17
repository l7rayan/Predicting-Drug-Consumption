import './assets/index.css'

import React, {useEffect} from "react";
import {useStore} from "@/store/store.js";
import {GET_DATA_BY_GENDER_TEST} from "@/api_/api_.js";
import Swiper from "./components/Swiper.jsx";
import SortButton from "./components/SortButton.jsx";
import {Button} from "@/components/ui/button.jsx";

function App() {
    const {initializeData, datas } = useStore((state) => ({
        datas: state.data,
        initializeData: state.initializeData
    }));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GET_DATA_BY_GENDER_TEST();
                initializeData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        };
        fetchData().then(r => r);
    }, [initializeData]);
    return (
    <>
        <div className={`w-100 h-100 px-3 pb-3 overflow-hidden`}>
            <Button onClick={() => console.log(GET_DATA_BY_GENDER_TEST())}>LOG</Button>

                <div className = {`flex flex-col items-center gap-y-5 text-white`} alt="Texte de présentation">
                    <p className = {` text-6xl font-bold`}>
                        Project Title
                    </p>
                    <p>
                        Description of the project, on va l'aligner a gauche je pense avec une petite anime ou blur effect a droite
                    </p>
                </div>

                <span className={` flex pb-3 lg:px-20`}>
                    <span className = {` flex flex-col gap-y-2 mt-20 mb-10 `}>
                        <h1 className={`
                            text-4xl 
                            md:text-5xl
                            font-bold tracking-tight text-white antialiasing`}
                        >
                        Drugs Consumption Stats
                        </h1>
                        <h2 className = {` 
                            text-ml/relaxed
                            md:text-xl/relaxed
                            font-semibold tracking-tight text-gray-500 antialiasing`}>
                            Many stats for you
                        </h2>
                    </span>

                    <SortButton/>
                </span>
                <div className={` w-full h-0 bg-white text-white`}></div>

                <div className={` flex flex-col w-100 gap-y-8 text-white `}>
                    <Swiper/>
                    <Swiper/>
                    <Swiper/>
                    <Swiper/>
                </div>
        </div>
    </>
    )

}

export default App
