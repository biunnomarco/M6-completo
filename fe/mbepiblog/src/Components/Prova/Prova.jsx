import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAuthors, postAuthors } from '../../Store/authorSlice';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import SingleAuthor from '../SingleAuthor/SingleAuthor';



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
        dispatch(postAuthors(postPayload)).then(() => dispatch(getAuthors()))
    }

    const dispatch = useDispatch()
    const allAuthors = useSelector(state => state.authors)
    console.log(allAuthors)

    useEffect(() => {
        dispatch(getAuthors())
        
    }, [])

    return (
        <>
            <div className='d-flex flex-wrap gap-3'>
                {allAuthors.authors && allAuthors.authors.map((author) => {
                    return (
                        <SingleAuthor author={author}/>
                    )
                })}
            </div>
            {/* {JSON.stringify(allUsers)} */}
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