import logo1 from "../assets/smth.jpg"


const CarCard = ({title,desc,img,tags}) => {
  return (
    <div className="rounded-xl flex flex-col w-[250px] sm:w-[300px] h-auto p-4 text-black gap-y-3 border-[1px] border-slate-600">
        <div className="w-full flex justify-center">
            <img src={img ?? logo1} className="w-[250px] h-[250px] sm:w-[300px] aspect-auto cover" />
        </div>
        <strong className="w-full h-8 text-[25px]">{title ? title.length > 25 ? title.slice(0,25)+"..." : title  : "Car title"}</strong>
        <p className="w-full h-20 text-[20px]">
            {desc ? desc.length > 50 ? desc.slice(0,50)+"..." : desc : "Car desc Lorem ipsum dolor , inventore!"}
        </p>
        <p className="w-full text-[20px]"><span className="font-semibold">Tags: </span> {tags ?? "Lorem ipsum dolor asda adsasd." }</p>
    </div>
  )
}

export default CarCard