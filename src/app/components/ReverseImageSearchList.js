"use client";

import React from 'react'
import { IoCloseOutline } from "react-icons/io5";



function ReverseImageSearchList({ list, setOrigins }) {

    return (
        <div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'end' }}>
                <div style={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
                    <IoCloseOutline onClick={() => { setOrigins([]) }} />
                </div>


            </div>
            <ul style={{ width: "90%" }}>
                {
                    list.map((item, index) => {
                        return <li style={{ width: "100%", display: 'flex', justifyContent: 'start', gap: '50px', justifyItems: 'start', background: 'black', padding: '10px', paddingLeft: '30px', paddingRight: "30px", margin: '10px auto' }}>
                            <div>
                                <a href={item.link} target="_blank" rel="noopener noreferrer"><img src={item.thumbnail} style={{ height: '100px', borderRadius: '6px' }} /></a>
                            </div>
                            <div>
                                <h4>{item.caption}</h4>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default ReverseImageSearchList;