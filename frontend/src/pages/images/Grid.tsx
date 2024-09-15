
import store from "@/assets/store.jpg"
import ff from "@/assets/heroimage.png"
import nn from "@/assets/sale.jpg"


const ImageGrid = ()=>{
    return(
        <div className="grid grid-cols-3 -mt-6 max-h-[70vh] overflow-hidden">
        <img src={nn} alt="" className="col-span-2 items-center "/>
        <img src={ff} alt="" className="col-span-1 mt-32" />
        {/* <img src={store} alt="" className=" col-span-2 items-center" /> */}
        
        
        
        
        
        </div>
    )
}


export default ImageGrid;