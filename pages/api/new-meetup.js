import { MongoClient} from 'mongodb'

async function handler(req, res){
    if( req.method === 'POST'){
        const data = req.body; 

        //const {title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://khamdiyahk:ru0tbdIM3HbfzRDy@cluster0.0fpjijh.mongodb.net/?retryWrites=true&w=majority')
        const db = client.db();

        const meetupCollection = db.collection('meetups')
        const result = await meetupCollection.insertOne(data);
        console.log(result)

        client.close()

        res.status(201).json({message : 'Meetup inserted!'});
    }
}
export default handler