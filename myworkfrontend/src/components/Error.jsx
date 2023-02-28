import React from 'react'
import NavbarTop from './NavbarTop'

const Error = () => {
    return (
        <>
            <NavbarTop />
            <section>
                <div className='submitted d-flex align-items-center my-5'>
                    <div className="container d-flex flex-column align-items-center my-5" >
                        <h1>404 !</h1>
                        <h2>This Page You requested is not Found</h2>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error