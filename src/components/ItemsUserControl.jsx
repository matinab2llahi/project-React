import React from 'react'
import './style/UsersControlStyle.css'
function ItemsUserControl({deleteClick, editClick,disableHandlere}) {
    return (
        <div className="items__users_control">
            {
                disableHandlere?
                <button onClick={deleteClick} style={{backgroundColor:"#c52b2b"}} >delete</button>:
                <button style={{backgroundColor:"#c52b2b"}} >delete</button>
            }
            {
                disableHandlere
                ?
                <button onClick={editClick} style={{backgroundColor:"#81e65a"}}>edit</button>
                :
                <button style={{backgroundColor:"#81e65a"}}>edit</button>
            }
        </div>
    )
}

export default ItemsUserControl