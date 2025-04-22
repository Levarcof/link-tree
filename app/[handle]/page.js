import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise

    const db = client.db("bitTree")
    const collection = db.collection("links")

    // If the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }

    console.log(item)


    return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
        {item && <div className="photo flex justify-center flex-col items-center gap-4"> 
    
            <img className="rounded-xl"  src={item.pic} alt="" />
            <span className="font-bold text-3xl">@{item.handle}</span>
            <span className="desc w-80 text-center">{item.desc}</span>
            <div className="links">
                { Array.isArray(item.link) && item.link.map((item, index)=>{
                    return <Link  key={index} href= {item.link}><div className="bg-purple-100 hover:bg-purple-300 py-4 shadow-lg px-2 min-w-96 flex justify-center rounded-md my-3">
                       {item.linktext}
                    </div>
           </Link> 
                })}
                <Link href="/"> <button className="bg-purple-600  hover:bg-purple-300 py-4 shadow-lg px-2 min-w-96 flex justify-center rounded-2xl my-3">Back to home</button></Link>
                        
            </div>
      </div>}
    </div>
}