import fs from 'fs'
import { connectToDatabase, insertToDatabase } from '../../../helpers/db-util';


export default async function Handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@')
    ) {
      res.status(422).json({ message: 'Invalid Email Address!' })
      return;
    }

    let client

    try {

      client = await connectToDatabase()

    } catch (error) {
      res.status(500).json({message: 'Connection to Db Failed!'})
      return
    }
    
    try {
      
      await insertToDatabase(client, { email: email } , 'newsletter' )
      client.close()
      
    } catch (error) {
      
      res.status(500).json({message: 'Failed to Insert data to Db!'})
      return

    }

    res.status(201).json({message: 'Signed Up Successfully!'})
  }

}