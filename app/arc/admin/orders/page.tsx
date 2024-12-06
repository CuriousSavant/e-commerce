import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Chip,
  Checkbox,
  Grid,
  IconButton,
  Avatar,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { FiShoppingCart, FiFileText, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

const orders = [
  {
    id: "ORD-006",
    customer: "Zaid Schwartz",
    email: "zaid.schwartz@domain.com",
    date: "Dec 1, 2024",
    items: 1,
    amount: "$49.10",
    status: "Pending",
    img: "https://via.placeholder.com/50", // URL รูปภาพตัวอย่าง
  },
  {
    id: "ORD-005",
    customer: "Mathilde Lewis",
    email: "mathilde.lewis@domain.com",
    date: "Nov 30, 2024",
    items: 1,
    amount: "$600.00",
    status: "Completed",
    img: "https://via.placeholder.com/50",
  },
  {
    id: "ORD-004",
    customer: "Ammar Foley",
    email: "ammar.foley@domain.com",
    date: "Nov 30, 2024",
    items: 2,
    amount: "$240.00",
    status: "Canceled",
    img: "https://via.placeholder.com/50",
  },
];

export default function OrdersPage() {
  const statusColors = {
    Pending: 'warning',
    Completed: 'success',
    Canceled: 'error',
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Orders
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/arc/admin">
              <AiOutlineHome />
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Order</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Order Stats Section */}
      <Grid
        container
        spacing={0}
        mb={3}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          p: 2,
          border: "1px solid #ddd",
          gap: { xs: 2, md: 0 },
        }}
      >
        {/* Total Orders */}
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
            borderRight: { xs: 0, md: '1px solid #ddd' },
          }}
        >
          <FiShoppingCart size={28} color="#007BFF" />
          <Box ml={2}>
            <Typography variant="body1" color="textSecondary">
              Total Orders
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              891
            </Typography>
          </Box>
        </Grid>

        {/* Active Orders */}
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
            borderRight: { xs: 0, md: '1px solid #ddd' },
          }}
        >
          <FiFileText size={28} color="#FFC107" />
          <Box ml={2}>
            <Typography variant="body1" color="textSecondary">
              Active Orders
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              268
            </Typography>
          </Box>
        </Grid>

        {/* Completed Orders */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
            borderRight: { xs: 0, md: '1px solid #ddd' },
          }}
        >
          <FiCheckSquare size={28} color="#28A745" />
          <Box ml={2}>
            <Typography variant="body1" color="textSecondary">
              Completed Orders
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              623
            </Typography>
          </Box>
        </Grid>

        {/* Canceled Orders */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiXSquare size={28} color="#DC3545" />
          <Box ml={2}>
            <Typography variant="body1" color="textSecondary">
              Canceled Orders
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              4
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <TextField label="Order ID" size="small" />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Select defaultValue="All" size="small" sx={{ width: 150 }}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </Select>
          <TextField label="Customer" size="small" />
        </Box>
      </Box>

      {/* Customer Table */}
      <TableContainer
        sx={{
          overflowX: "auto",
          width: "100%",
          display: "block",
          tableLayout: "fixed",
          maxWidth: "100%",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Customer Id</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Name</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Phone Numbers</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: "180px" }}>Created at</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Status</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell size="small">
                  <Typography
                    sx={{
                      color: "#4F46E5",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {order.id}
                  </Typography>
                </TableCell>
                <TableCell size="small">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      alt={order.customer}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                      }}
                    >a</Avatar>
                    <Box
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        width: "100%",
                        fontSize: "13px",
                      }}
                    >
                      <Typography fontWeight="bold">{order.customer}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {order.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell size="small">{order.date}</TableCell>
                <TableCell size="small">{order.items}</TableCell>
                <TableCell size="small">
                  <Chip
                    label={order.items > 0 ? "In Stock" : "Out of Stock"}
                    color={order.items > 0 ? "success" : "error"}
                    sx={{ fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell size="small" sx={{ display: "flex" }}>
                  <IconButton>
                    <BiEdit color="#1976d2" />
                  </IconButton>
                  <IconButton>
                    <MdDelete color="#FF0000" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}