"use client"
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
const page = () => {
    const SearchParams = useSearchParams()
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, setHandle] = useState(SearchParams.get("handle"))
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")
    const [page, setPage] = useState(false)

    const handleChange = (index, link, linktext) => {
        setLinks((oldLinks) => {
            return oldLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }

    const onSubmit = async () => {
        const myheader = new Headers()
        myheader.append("Contant-Type", "application/json")

        const data = JSON.stringify({
            "link": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        })

        const requestOption = {
            method: "POST",
            headers: myheader,
            body: data,
            redirect: "follow"
        }

        const r = await fetch("http://localhost:3000/api/generate", requestOption)
        const result = await r.json()

        if (result.success) {
            setPage(true)
            toast.success(result.message)
            setLinks([])
            setHandle("")
            setPic("")
            setDesc("")

        }
        else {
            toast.error(result.message)
        }

    }



    return (
        <div className='bg-[#E9C0E9]  min-h-screen grid grid-cols-2 [@media(max-width:1235px)]:flex [@media(max-width:1235px)]:flex-col'>
            <div className='flex  flex-col justify-center items-center gap-4'>

                <div className='flex  [@media(max-width:1235px)]:mx-auto [@media(max-width:1235px)]:w-[95vw] flex-col gap-4 [@media(max-width:1235px)]:mt-35'>
                    <h1 className=' text-5xl font-bold'>Create your Bitree</h1>
                    <h2 className=' text-xl font-bold'>Step 1: Claim your Handle</h2>
                    <input value={handle} onChange={e => setHandle(e.target.value)} className='bg-white p-3 rounded-full hover:outline-red-300' placeholder='Choose your handle' type="text" />
                    <h2 className=' text-xl font-bold'>Step 2: Add links</h2>
                    {links && links.map((item, index) => {
                        return <div key={index} className='flex gap-3 [@media(max-width:646px)]:flex-col'>
                            <input value={item.linktext || ""} onChange={(e) => handleChange(index, item.link, e.target.value)} className='bg-white p-3 rounded-full hover:outline-red-300' placeholder='Enter link text' type="text" />
                            <input value={item.link || ""} onChange={(e) => handleChange(index, e.target.value, item.linktext)} className='bg-white p-3 rounded-full hover:outline-red-300' placeholder='Enter link' type="text" />
                        </div>
                    })}
                    <button onClick={addLink} className='bg-black text-white p-2 px-4 rounded-full'>+Add Link</button>


                    <h2 className=' text-xl font-bold'>Step 3: Add Picture and Finalize</h2>
                    <div className='flex gap-3  [@media(max-width:646px)]:flex-col'>
                        <input onChange={e => setPic(e.target.value)} className='bg-white p-3 rounded-full hover:outline-red-300' placeholder='Enter link your picture' type="text" />
                        <input onChange={e => setDesc(e.target.value)} className='bg-white p-3 rounded-full hover:outline-red-300' placeholder='Enter Description' type="text" />
                        <button disabled={pic == "" || handle=="" || links[0].linktext == ""} onClick={onSubmit} className='bg-black disabled:bg-gray-700 text-white p-2 px-4 rounded-full'>Create your BitLink</button>
                    </div>
                    {page ? <div>
                        <Link href={`/${handle}`} > <button className='bg-black text-white p-2 px-4 rounded-full'>visit your page</button></Link>
                       
                    </div> : ""}

                </div>
            </div>
            <div className='flex justify-center items-center h-screen'>
                <img className='h-full object-contain' src="generate.png" alt="" />
            </div>

            <ToastContainer />
        </div>
    )
}

export default page
