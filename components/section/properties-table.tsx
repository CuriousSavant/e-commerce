'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Product, Propertie } from '@/types/product'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

interface PropertiesTableProps {
    product: Product;
}

const PropertiesTable: React.FC<PropertiesTableProps> = ({ product }) => {
    const [properties, setProperties] = useState<Propertie[]>([])

    const fetchProperties = async () => {
        if (!product) return;
        try {
            await axios.get(`/api/properties/${product.id}`).then((res) => {
                setProperties(res.data)
            })
        } catch (err) {
            console.error('ERROR: can not fetch properties')
        }
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    return (
        <div className="mt-8" >
            <Typography fontWeight={800} fontSize="20px" className="mb-4">
                คุณสมบัติสินค้า
            </Typography>
            <Paper elevation={0} className="rounded-lg">
                <TableContainer>
                    <Table>
                        <TableBody>
                            {properties.map((item, index) => (
                                <TableRow key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                    <TableCell sx={{ padding: "10px", color: "gray" }}>{item.name}</TableCell>
                                    <TableCell sx={{ padding: "10px" }}>{item.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default PropertiesTable