import React from 'react'
import RequestIntroduction from './RequestIntroduction';
import giveWithLove from "../../../assets/giveWithLove.jpg";
function GiveIntroduction({  location }) {

    


    return location.state.type === "give" ? (

       
        <div>
            
            <div>
            <h1>Give with love...
            </h1>
            </div>
            <>
                <p>Introduction of the Giver page to guide the user 
                .........</p>
            </>
            <img src={giveWithLove} className="giveWithLove" alt="give with love"/>
        </div>
        
     ) : (   
     
     <RequestIntroduction />
        

    );

}

export default GiveIntroduction
