import React from 'react'
import './style/UsersControlStyle.css'
function ItemsUserControl({deleteClick, editClick,singOutClick,disableHandlere}) {
    return (
        <div className="items__users_control">
            {
                disableHandlere
                ?
                <button onClick={editClick} style={{backgroundColor:"#81e65a"}}>edit</button>
                :
                <button style={{backgroundColor:"#81e65a"}}>edit</button>
            }
            {
                disableHandlere?
                <button onClick={deleteClick} style={{backgroundColor:"#c52b2b"}} >delete account</button>:
                <button style={{backgroundColor:"#c52b2b"}} >delete account</button>
            }
            {
                disableHandlere
                ?
                <button onClick={singOutClick} style={{backgroundColor:"red"}}>sing out</button>
                :
                <button style={{backgroundColor:"red"}}>sing out</button>
            }

        </div>
    )
}

export default ItemsUserControl