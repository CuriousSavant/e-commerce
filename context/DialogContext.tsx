'use client'
import { createContext, useContext, useState } from "react";

interface DialogContextType {
    isHover: boolean;
    setIsHover: (isHover: boolean) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (isDialogOpen: boolean) => void;
    handleDialogToggle: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleDialogToggle = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <DialogContext.Provider value={{
            isHover,
            setIsHover,
            isDialogOpen,
            setIsDialogOpen,
            handleDialogToggle,
        }}>
            {children}
        </DialogContext.Provider>
    )
}

const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
}

export default useDialog;