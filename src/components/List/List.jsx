import React from 'react'
import "./List.scss"
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch';


function List({ subCats, maxPrice, sort, catId }) {

  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map((item)=>`&[filters][sub_categories][id][$eq]=${item}`)}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

    // const  data = [
    //     {
  //     id: 1,
    //     img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     img: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     title: "Long Sleeve Graphic T-shirt",
    //     isNew: true,
    //     oldPrice: 19,
    //     price: 12,
    //   },
    //   {
    //     id: 2,
    //     img: "https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     title: "Coat",
    //     isNew: true,
    //     oldPrice: 19,
    //     price: 12,
    //   },
    //   {
    //     id: 3,
    //     img: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     title: "Skirt",
        
    //     oldPrice: 19,
    //     price: 12,
    //   },
    //   {
    //     id: 4,
    //     img: "https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     title: "Hat",
        
    //     oldPrice: 19,
    //     price: 12,
    //   },
    // ]
    

  return (
    <div className='list'>
        {loading ? "loading" :
        data?.map(item=>(
            <Card item={item} key={item.id} />
        ))}
    </div>
  )
}

export default List