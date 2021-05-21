import React from 'react'

import Link from 'next/link';

export default function index() {
    return (
        <header>
           <i class="fas fa-cubes fa-2x" style={{position:"absolute",top:"12px"}}></i>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li>About</li>
                <li>Page</li>
            </ul>
        </header>
    )
}
