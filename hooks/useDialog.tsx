import React, { useEffect, useState } from 'react';

const useDialog = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDialogToggle = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return {
        isScrolled,
        setIsScrolled,
        isHover,
        setIsHover,
        isDialogOpen,
        setIsDialogOpen,
        handleDialogToggle,
    }
}

export default useDialog