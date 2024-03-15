import { connectToDatabase, findFromDatabase, insertToDatabase } from "../../../helpers/db-util"


export default async function handler(req, res) {

  if (req.method === 'GET') {

    let client =null
    let commentData =[]

    try {

      client = await connectToDatabase()
      
    } catch (error) {
      res.status(500).json({message: 'Connection to Db Failed!'})
      return
    }
    
    try {
      
     commentData = await findFromDatabase(client, 'comments' )
      client.close()
      
    } catch (error) {
      
      res.status(500).json({message: 'Failed to Find data from Db!'})
      return

    }
    const eventId = req.query.eventId;
    const selectedComments = commentData.filter(
      (comment) => comment.comment.eventId === eventId
    );
    res.status(200).json({ comments: selectedComments });
  }
}