import React,{useState,useEffect} from 'react'
import  client,{ databases,DATABASE_ID,COLLECTION_ID_MESSAGE } from '../appwriteConfig'
import { ID,Query,Role,Permission } from 'appwrite'
import {Trash2 }from "react-feather"
import Header from '../components/Header'
import { useAuth } from '../utils/authContext'

const Room = () => {

  const {user} = useAuth()
  const [messages , setMessages]= useState([])
  const [messageBody , setMesssageBody]= useState("")

  useEffect(()=>{
    getMessages()

   const  unsubscribe= client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGE}.documents`,response =>{
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        console.log("Message is Created")
        setMessages(prevState=>[response.payload ,...prevState])
      }
      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        console.log('A MESSAGE WAS DELETED!!!')
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }

    })
    console.log('unsubscribe:', unsubscribe)
      
    return () => {
      unsubscribe();
    }
  },[])





  const handleSubmit = async(e)=>{
    e.preventDefault()

    let payload ={
      user_Id: user.$id,
      username:user.name,
      body:messageBody
    }

    let permissions =[
      Permission.write(Role.user(user.$id))
    ]
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      ID.unique(),
      payload,
      permissions

    )
    console.log("created ", response)
    // setMessages(prevState=>[response, ...messages])
    setMesssageBody("")


  }

  const getMessages = async()=>{
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(20)
      ]
    )
    console.log("response", response)
    setMessages(response.documents)
  }

  const deleteMessage = async (messageId)=>{
    databases.deleteDocument(
      DATABASE_ID, // databaseId
      COLLECTION_ID_MESSAGE, // collectionId
      messageId // documentId
  );
  // setMessages(prevState => messages.filter(message=>message.$id !== messageId))

  
  }
  return (
    <main className='container' >
        <Header/>
      <div className='room--container'>
      <form  onSubmit={handleSubmit} id='message--form'>
        <div>
          <textarea 
           required
           maxLength="1000"
           placeholder='Say Something...'
           onChange={(e)=>setMesssageBody(e.target.value)}
           value={messageBody}
          >
          </textarea>

        </div>
        <div className='send-btn--wrapper'>
          <input className='btn btn--secondary' type="submit" value="send" />
        </div>
      </form>
      <div>
        {messages.map((message)=>(
          <div key={message.$id} className='message--wrapper'>
            <div className='message--header'>
              <p>
                {message?.username?(
                  <span>{message.username}</span>
                ):(<span>anonymous user</span>)}
               <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
              </p>

              {message.$permissions.includes(`delete(\"user:${user.$id}\")`)&&(
                <Trash2  
                className='delete--btn' 
                onClick={()=>{deleteMessage(message.$id)}}/>
              )}
          
  
       
            </div>
            <div className='message--body'>
              <span>{message.body}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </main>
  )
}

export default Room