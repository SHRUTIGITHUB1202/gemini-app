import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context=createContext();
const ContextProvider=(props)=>{
    const[input,setinput]=useState("");
    const [recentprompt,setrecentprompt]=useState("");
    const[prevprompts,setprevprompts]=useState([]);//stored as an array
    const[showresult,setshowresult]=useState(false);//hiding rest 
    const[loading,setloading]=useState(false);//loading animation
    const[resultdata,setresultdata]=useState(null);//display our result

    const delaypara=(index,nextword)=>{
       setTimeout(function(){
        setresultdata(prev=>prev+nextword);
       },75*index)
    }

    const newchat=()=>{
        setloading(false)
        setshowresult(false)
    }
    const onSent=async(prompt)=>{


         let response;

        setresultdata("");
        setloading(true)
        setshowresult(true)
        
        if(prompt!==undefined){
            response=await run(prompt);
            setrecentprompt(prompt)
        }
        else{
            setprevprompts(prev=>[...prev,input])
            setrecentprompt(input)
            response=await run(input)

            
        }
      
       let responsearray=response.split("**");
       let newresponse ="";
       for(let i=0;i<responsearray.length;i++){
        if (i===0||i%2!==1){
            newresponse+=responsearray[i]
        }
        else{
            newresponse+="<b>"+responsearray[i]+"</b>";
        }
        

       }
       let newresponse2=newresponse.split("*").join("<br>")
       let newresponsearray=newresponse2.split(" ");
       for(let i=0;i<newresponsearray.length;i++){
const nextword=newresponsearray[i];
delaypara(i,nextword+" ")

       }
       setloading(false)
       setinput("")
       
    }

   


    // onSent("What is html");
    const contextValue={


        prevprompts,setprevprompts,onSent,setrecentprompt,recentprompt,showresult,loading,resultdata,input,setinput,newchat
     };
    return(
     <Context.Provider value={contextValue}>

            {props.children}
        </Context.Provider>
    );

};
export default ContextProvider;