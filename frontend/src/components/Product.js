import React from 'react'
import { NavLink } from 'react-router-dom';
import FormatPrice from  '../Helpers/FormatPrice';

function Product(curElem) {
    const {_id, name, cover, price} = curElem;
    //console.log(`product page${_id}${curElem}`);
  return (
    <NavLink to={`/singleproduct/${_id}`}>
        <div className='card'>
           <figure>
            <img src={cover} alt={name} />
           </figure> 
           <div className='card-data'>
            <div className='card-data-flex'>
                <h3>{name}</h3>
                <p className='card-data--price'>
                    {<FormatPrice price={price} />}
                </p>
            </div>
           </div>
        </div>
    </NavLink>
  ) ;
}

export default Product ;
