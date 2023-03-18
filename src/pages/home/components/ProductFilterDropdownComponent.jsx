import CategoryListComponent from './CategoryListComponent';
import FilterListCompoenent from './FilterListCompoenent';
import SearchComponent from './SearchComponent';

const ProductFilterDropdownComponent = () => {
  return (
    <>
      {/* Category List */}
      <CategoryListComponent />
      {/* Filter List */}
      <FilterListCompoenent />
      {/* Search */}
      <SearchComponent />
    </>
  )
}

export default ProductFilterDropdownComponent;