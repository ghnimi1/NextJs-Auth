import React from 'react';

function Loader(props) {
    return (
        <div class="text-center">
            <div class="spinner-grow"
                style={{
                    width: "3rem", height: "3rem", marginTop: '50px'
                }} role="status">
                <span class="visually-hidden" > Loading...</span>
            </ div>
        </div >
    );
}

export default Loader;