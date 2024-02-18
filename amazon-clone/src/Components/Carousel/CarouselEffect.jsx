import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {img} from './img/data'
function CarouselEffect() {
  return (
    <div>
<Carousel autoPlay={true}
infiniteLoop={true}
showIndicators={false}
showThumbs={false}>

{
    img.map((imageItemLink)=>{
       return <img key={imageItemLink} src={imageItemLink} />
    })
}

</Carousel>

    </div>
  )
}

export default CarouselEffect