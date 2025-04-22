import clientPromise from "@/lib/mongodb";
//jab bhi ham api vale folder bnate hai to usme complasery route.js file bnani padti 
export async function POST(request){
    const body = await request.json()
    console.log(body)
    const client = await clientPromise

    const db = client.db("bitTree")
    const collection = db.collection("links")
    const doc = await collection.findOne({handle: body.handle})

    if (doc){
      return Response.json({ success: false, error: true, message: 'This Bittree already exists!', result: null })
    }

    const result = await collection.insertOne(body)
     
    return Response.json({ success: true, error: false, message: 'Your Bittree has been generated!', result: result,  })
  }
    
