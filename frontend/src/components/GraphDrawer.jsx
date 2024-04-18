import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import BarChartDetail from "@/components/BarChart/BarChartDetail.jsx";
import React, {useState} from "react";
import {GET_CONSUMPTION_DATA} from "@/api_/api_.js";
import useStore from "@/store/store.js";
export function GraphDrawer({icon, typeOfChart}) {
    const { drugType} = useStore();
    const { chartType, setChartType } = useStore();
    const { getFunctionToCall } = useStore();
    function getComponentToRender(){
        switch (chartType){
            case 'consumption-x':
            case 'consumption-y':
                return <BarChartDetail/>
            case 'other':
                return ""
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild onClick={() => setChartType(typeOfChart)}>
                <Button variant="outline">{icon}</Button>
            </DrawerTrigger>
            <DrawerContent>

                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Consumption of {drugType}</DrawerTitle>
                        <DrawerDescription>Add some precision to your chart </DrawerDescription>
                    </DrawerHeader>
                    <div className={`p-4 pb-0`}>
                        <div className={`mt-3 h-fit min-h-[100px]`}>
                            {getComponentToRender()}
                        </div>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                        <Button onClick={() => getFunctionToCall()()}>Submit</Button>
                        </DrawerClose>

                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}