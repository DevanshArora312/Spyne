import logo1 from "../assets/smth.jpg"


const CarCard = ({title,desc,img,tags}) => {
  return (
    <div className="rounded-xl flex flex-col w-[250px] sm:w-[300px] h-auto p-4 text-black gap-y-3 border-[1px] border-slate-600">
        <div className="w-full flex justify-center">
            <img src={img ?? logo1} className="w-[250px] sm:w-[300px] aspect-auto cover" />
        </div>
        <p>{title ? title.length > 25 ? title.slice(0,25)+"..." : title  : "Car title"}</p>
        <p>
            {desc ? desc.length > 49 ? desc.slice(0,50)+"..." : desc : "Car desc Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, inventore!"}
        </p>
        <p><strong>Tags: </strong> {tags ?? "Lorem ipsum dolor sit amet asda adsasd." }</p>
    </div>
  )
}

export default CarCard