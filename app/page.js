"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, setText] = useState("Bitree/")
  const router = useRouter()
  const createTree = ()=>
  {
    let txt = text.split("/")[1]
    router.push(`/generate?handle=${txt}`)

  }
  return (
    <>
      <main>
        <section className="bg-[#254f1a]  [@media(max-width:1609px)]:item-center  [@media(max-width:1609px)]:flex-col  [@media(max-width:1609px)]:justify-center     [@media(max-width:1609px)]:flex w-[100vw] min-h-[100vh] grid grid-cols-2  ">
          <div className=" [@media(max-width:1609px)]:mx-auto  [@media(max-width:1609px)]:w-[80vw]  flex justify-center flex-col w-1/2   ml-[10vw] gap-4 [@media(max-width:1609px)]:mt-45">
            <p className="lg:text-7xl [@media(max-width:1609px)]:w-[90vw] text-2xl font-bold text-yellow-300">Everything you are. In one, simple link in bio.</p>
            <p className="text-yellow-300 w-[100%]   ">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

            <div className="input [@media(max-width:1084px)]:flex-col flex gap-2">
              <input value={text} onChange={e=>setText(e.target.value)} className="bg-white  [@media(max-width:1609px)]:p-4 rounded-lg cursor-pointer" type="text" placeholder="betree/" />
              <button onClick={createTree}  className="bg-[rgb(233,192,233)] p-4 rounded-full hover:bg-[rgb(111,82,111)] cursor-pointer">Claim your Linktree</button>
            </div>

          </div>
          <div className=" mt-12 [@media(max-width:1609px)]:w-[90vw] [@media(max-width:1609px)]:mx-auto flex justify-center items-center">
            <img className="[@media(max-width:1609px)]:[object-contain" src="home.png" alt="" />

          </div>

        </section>
    
      </main>

    </>

  );
}
