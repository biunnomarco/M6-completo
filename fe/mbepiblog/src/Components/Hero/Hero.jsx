import React from 'react'
import narutogif from '../../Assets/naruto.gif'
import { Form, Button } from 'react-bootstrap'
import { useSession } from '../../middlewares/ProtectedRoutes'
import { useSelector } from 'react-redux'
import Carousel from 'react-bootstrap/Carousel';



const Hero = () => {
    const session = useSession()
    const actualTheme = useSelector(state => state.theme.theme)
    return (
        <>
        <Carousel 
        style={{width: '80%px', height: '500px', margin: 'auto'}}
        className='pt-4'
        >
            <Carousel.Item>
                <img
                style={{ height: '500px', objectFit: 'cover'}}
                    className="d-block w-100"
                    src="https://www.drcommodore.it/wp-content/uploads/2023/05/pxfuel-2048x1164.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                style={{ height: '500px', objectFit: 'cover'}}
                    className="d-block w-100"
                    src="https://spacenerd.it/wp-content/uploads/2023/04/anime_streaming.jpg.webp"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                style={{height: '500px', objectFit: 'cover'}}
                    className="d-block w-100"
                    src="https://wallpapers.com/images/hd/itachi-wallpaper-hd-zh2po8ky6t9za6qa.webp"
                    alt="Third slide"
                />
            </Carousel.Item>
            
        </Carousel>
        <div className='d-flex gap-2 mt-5'>
                <Form.Control
                    type="search"
                    placeholder="Search in all posts"
                    className=" mb-4"
                    aria-label="Search"
                />
                <Button  className=" mb-4" variant="outline-success" >Search</Button>
            </div>
        </>
        

    )
}

export default Hero