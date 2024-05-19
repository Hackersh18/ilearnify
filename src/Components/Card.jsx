import React from 'react'

function Card({image , title ,price ,category ,onCheckOut}) {
  return (
    <>
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={image}/>
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{category}</h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
            <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <div className="flex items-center flex-wrap ">
              <button onClick={()=>onCheckOut({name:title,amount:price})} className='bg-zinc-400 px-6 py-2 text-white rounded-sm'>Pay Now &#8377;{price}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
