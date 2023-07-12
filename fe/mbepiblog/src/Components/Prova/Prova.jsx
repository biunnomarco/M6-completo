import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers, postUser } from '../../Store/userSlice';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import SingleUser from '../SingleUser/SingleUser';


const Prova = () => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [avatar, setAvatar] = useState('')

    function pushPost() {
        const postPayload = {
            "name": name,
            "surname": surname,
            "email": email,
            "birthdate": birthdate,
            "avatar": avatar
        }
        dispatch(postUser(postPayload)).then(() => dispatch(getUsers()))
    }

    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.users)
    console.log(allUsers)

    useEffect(() => {
        dispatch(getUsers())
        
    }, [])

    return (
        <>
            <div className='d-flex flex-wrap gap-3'>
                {allUsers.users.users.map((user) => {
                    return (
                        <SingleUser user={user} />
                    )
                })}
            </div>

            <div>NEW POST</div>
            <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='surname' onChange={(e) => setSurname(e.target.value)} />
            <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='birthdate' onChange={(e) => setBirthdate(e.target.value)} />
            <input type="text" placeholder='avatar' onChange={(e) => setAvatar(e.target.value)} />
            <button onClick={() => pushPost()}>
                SEND
            </button>

        </>
    )
}

export default Prova