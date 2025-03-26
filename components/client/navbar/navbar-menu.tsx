import { Box, Button, Link as MuiLink } from "@mui/material";

export default function NavbarMenu({ LinkInfo, setIsDialogOpen, isDialogOpen }: { LinkInfo: any, setIsDialogOpen: any, isDialogOpen: any }) {
    return (
        <Box
            sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                flexGrow: 1,
                gap: 2,
            }}>
            {LinkInfo.map((link: any, index: any) =>
                link.title === "ออกจากระบบ" || link.title === "คำสั่งซื้อ" ? null : (
                    <MuiLink
                        key={index}
                        component={Button}
                        href={link.href || "#"}
                        onClick={() => setIsDialogOpen(true)}
                        sx={{
                            textDecoration: "none",
                            color: "gray",
                            fontSize: { md: "16px", lg: "1rem" },
                            fontWeight: "500",
                            transition: "color 0.3s ease",
                            "&:hover": {
                                color: "primary.main",
                                textDecoration: "underline",
                            },
                        }}
                    >
                        {link.title}
                    </MuiLink>
                )
            )}
        </Box>
    )
}
