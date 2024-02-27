import React from 'react'
import './style/UsersGetStyle.css'
function ItemsUsersGet({username, eamil, password}) {
    return (
        <div className="box__users_text">
            <div className='items___text'>
                <b>user name : </b><pre> {username ?username:"not value"}</pre>
            </div>
            <div className='items___text'>
                <b>eamil : </b><pre> {eamil?eamil:"not value"}</pre>
            </div>
            <div className='items___text'>
                <b>password : </b><pre> {password?eamil:"not value"}</pre>
            </div>
        </div>  
    )
}

export default ItemsUsersGet