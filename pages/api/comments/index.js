import { connectToDatabase, insertToDatabase } from "../../../helpers/db-util";

export default async function Handler(req, res){
    if (req.method === 'POST') {
        const eventId = req.body.eventId
        const email = req.body.email;
        const name = req.body.name;
        const comment = req.body.comment;

        if (
          !email ||
          email.trim() === '' ||
          !email.includes('@') ||
          !name ||
          name.trim() === '' ||
          !comment ||
          comment.trim() === ''
        ) {
          res.status(422).json({message: 'Invalid Input!'})
          return;
        }
    
        const newComment = {
          eventId: eventId,
          email: email,
          name : name,
          comment : comment
        }

        let client

        try {
    
          client = await connectToDatabase()
    
        } catch (error) {
          res.status(500).json({message: 'Connection to Db Failed!'})
          return
        }
        
        try {
          
          const result = await insertToDatabase(client, { comment: newComment }, 'comments' )
          newComment.id = result.insertedId
          client.close()
          
        } catch (error) {
          
          res.status(500).json({message: 'Failed to Insert data to Db!'})
          return
    
        }
    
        res.status(201).json({message: 'Comment Added Successfully!'})
      } 

}