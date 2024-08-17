import React, { useContext, useState } from 'react'
import './sidebar.css'
import { assets } from '../../../assests/assets'
import { Context } from '../../../context/Context'
const Sidebar = () => {

    const[extended,setextended]=useState(false)
    const {onSent,prevprompts,setrecentprompt,newchat}=useContext(Context)
     const loadprompt=async(prompt)=>{
      setrecentprompt(prompt)
       await onSent(prompt)
     }





  return (
    <div className='sidebar'>
      <div className='top'> 
             <img   onClick={()=>setextended(prev=>!prev)}className='menu'src={assets.menu_icon}alt=''/>
             <div onClick={()=>newchat() } className='new-chat'> 
                <img   src={assets.plus_icon}alt=''/>
                {extended?<p>New Chat</p>  :null }
            </div>

            {extended?
            <div className='recent'>
                <p className='recent-title'>Recent</p>
                {
                  prevprompts.map((item,index)=>{
                          return(
                            <div onClick={()=>loadprompt(item)} className="recent-entry">
                              <img src={assets.message_icon} alt=''/>
                            <p>{item}...</p>
                            </div>
                          )
                  })
                }
                
            </div>
           :null }
      </div>
      <div  className='bottom'>

      <div className="bottom-item  recent-entry">
<img src={assets.question_icon} alt=''></img>
        {extended?<p>Help</p>:null}
      </div>

      <div className="bottom-item  recent-entry">
<img src={assets.history_icon} alt=''></img>
        {extended?<p>Activity</p>:null}
      </div>

      <div   className="bottom-item  recent-entry">
<img src={assets.setting_icon} alt=''></img>
        {extended?<p>Settings</p>:null}
      </div>

      </div>

    </div>
  )
}

export default Sidebar
