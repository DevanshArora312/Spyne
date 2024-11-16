import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


function ImageSlider({imgs}) {
  return (
    <div className="w-full px-auto">
      <Carousel showArrows={true}>
        {
          imgs && imgs.map((el,ind) => {
            return (
              <div key={ind} className="w-full flex items-center justify-center z-10">
                  <img alt="car" src={el} className="max-w-[70vw] w-full max-h-[500px]" />
              </div>
            )
          })
        }
      </Carousel>
    </div>
  );
}

export default ImageSlider;