import { ActiveTabs } from "@/app/admin/orders/page";
import { Search } from "@mui/icons-material";
import { Box, InputAdornment, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";

interface TabsOrderProps {
    activeTabs: ActiveTabs;
    sortOrder: 'asc' | 'desc';
    query: string;
    setActiveTabs: React.Dispatch<React.SetStateAction<ActiveTabs>>;
    handleChangeTab: (value: ActiveTabs) => void;
    setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const TabsOrder: React.FC<TabsOrderProps> = ({
    activeTabs, handleChangeTab, setActiveTabs,
    setSortOrder, sortOrder, query, setQuery,
}) => {
    return (
        <Box display="flex" justifyContent={"space-between"} flexDirection={{ xs: "column", md: "row" }} alignItems="center" gap={2} mb={3}>
            <Box width={"100%"} maxWidth={"100%"}>
                <Tabs
                    value={activeTabs}
                    onChange={(_, value) => handleChangeTab(value)}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    sx={{ mb: 1 }}
                >
                    {["all", "completed", "pending", "canceled"].map((status, index) => (
                        <Tab key={index} label={status} value={status} sx={{ color: "white" }} />
                    ))}
                </Tabs>
            </Box>
            <Box display={'flex'} gap={2} width={{ xs: "100%", md: "auto" }} my={{ xs: 2, md: 0 }}>
                <TextField
                    size="small"
                    placeholder="Search by T-123"
                    sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "1px solid #4F4F4F", width: "340px" }}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query || ""}
                    InputProps={{
                        sx: {
                            "&::placeholder": { color: "#C2C2C2", opacity: 1, fontSize: 14 },
                            color: "white"
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "#c2c2c2", fontSize: 22 }} />
                            </InputAdornment>
                        )
                    }}
                />
                <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
                    size="small"
                    sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4a4a5c", '& .MuiSelect-icon': { color: "white" } }}
                >
                    <MenuItem value="asc">เก่า - ใหม่</MenuItem>
                    <MenuItem value="desc">ใหม่ - เก่า</MenuItem>
                </Select>
            </Box>
        </Box>
    )
}

export default TabsOrder;