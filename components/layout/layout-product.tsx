import React from 'react'

const LayoutProduct = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            {children}
        </div>
    )
}

export default LayoutProduct;