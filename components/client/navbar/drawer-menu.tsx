import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Avatar, Divider } from "@mui/material";
import { MdClose } from "react-icons/md";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import LoginRegisterBottom from "./button/login-register-bottom";

interface DrawerMenuProps {
    drawerOpen: boolean;
    toggleDrawer: (open: boolean) => void;
    LinkInfo: any;
    status: any;
    handleDialogToggle: () => void;
}

export default function DrawerMenu({ drawerOpen, toggleDrawer, LinkInfo, status, handleDialogToggle }: DrawerMenuProps) {
    const { data: session } = useSession();
    return (
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
            >
                <Box
                    sx={{
                        width: 250,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <IconButton
                        onClick={() => toggleDrawer(false)}
                        sx={{ alignSelf: "flex-end" }}
                    >
                        <MdClose size={24} />
                    </IconButton>

                    <List sx={{ pt: 0 }}>
                        {status === 'authenticated' && (
                            <Button href='/client/profile/overview' sx={{ marginBottom: 1, display: "flex", justifyContent: "start", textTransform: "lowercase" }}>
                                <Box sx={{ border: '1px solid #fefefe' }}>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>{session?.user?.name?.at(0)}</Avatar>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
                                    <Typography variant="subtitle2" fontSize={12} color="gray">สวัสดีคุณ</Typography>
                                    <Typography fontWeight={700} className='line-clamp-1'>{session?.user?.name}</Typography>
                                </Box>
                            </Button>
                        )}

                        {LinkInfo
                            .filter((link: any) => {
                                if (link.title === 'รถเข็น' || link.title === 'ออกจากระบบ' || link.title === 'คำสั่งซื้อ') {
                                    return status === 'authenticated'
                                }
                                return true;
                            })
                            .map((link: any, index: number) => link.divider ? (
                                <Divider key={index} sx={{ marginY: 1 }} />
                            )
                                : (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton LinkComponent={link.action !== "logout" ? NextLink : undefined}
                                            href={link.href || "#"}
                                            sx={{ textDecoration: "none", borderRadius: 2, }}
                                            onClick={() => {
                                                if (link.action === "logout") signOut({ callbackUrl: "/" });
                                                toggleDrawer(false);
                                            }}
                                        >
                                            <ListItemIcon sx={{ fontSize: 18, minWidth: "40px", color: link.color }}>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={link.title}
                                                sx={link.action === "logout" ? { color: "red", fontSize: 18 } : undefined}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        {/* Login Button if user not login */}
                        {status === 'unauthenticated' && <LoginRegisterBottom handleDialogToggle={handleDialogToggle} />}
                    </List>
                </Box>
            </Drawer>
    )
}
