import { createContext, useContext, useState, ReactNode } from "react";

interface PaginationContextType {
    page: number;
    pageSize: number;
    handleChangePage: (_: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <PaginationContext.Provider value={{ page, pageSize, handleChangePage, handleChangeRowsPerPage }}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("usePagination must be used within a PaginationProvider");
    }
    return context;
};