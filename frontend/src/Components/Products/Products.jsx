import React, { useEffect } from 'react';
import './Products.css';
import Product from '../Product/Product.jsx';
import { Link } from 'react-router-dom';
import { useGetProductsQuery} from '../../redux/Api/ProductsApi';

export default function Products({params, setPage, setPageCount, page, setList, list}) {
  const {category, sortParams, filterParams, searchValue} = params;

  const { data, isLoading, isError } = useGetProductsQuery({parentCategoryId: category, sortParams: sortParams, filterParams: filterParams, page, name: searchValue});
  const products = data && data !== undefined ? data.data : null;


  useEffect(() => {
      products && setPageCount(products.pageCount) ;
      products && setList(products.list);
  }, [data]);

  return (
    <div className='products-grid'>
        {list ? list.map((item) => {
            return (
                <Link key={item.id} to={`/products/${category}/${item.id}`}><Product item={item}/></Link>

            )
          }) : products ? products.list.map((item) => {
            return (
              <Link key={item.id} to={`/products/${category}/${item.id}`}><Product item={item}/></Link>
            )
          }) : <></>
        }
    </div>
  );
}
