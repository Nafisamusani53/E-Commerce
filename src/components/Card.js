import React from 'react'

const Card = ({image, name, price}) => {
  return (
    <div className='flex flex-col gap-4'>
      <img src={image}/>
      <p>{name}</p>
      <p>{`$ ${price}`}</p>
    </div>
  )
}

export default Card
