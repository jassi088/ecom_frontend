import React from 'react'
import LayoutComponent from 'src/shared/components/LayoutComponent';
import ProductCategoryComponent from './components/ProductCategoryComponent';
import ProductComponent from './components/ProductComponent';
import SlideImageComponent from './components/SlideImageComponent';

const HomePage = () => {
    return (
        <LayoutComponent>

            {/* Slider */}
            <SlideImageComponent />

            {/* Category , Search and filters */}
            <section className='m-4 md:mx-8 md:my-6'>
                <ProductCategoryComponent />
            </section>

            {/* Products */}
            <section className='m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <ProductComponent />
            </section>

        </LayoutComponent>
    )
}

export default HomePage;