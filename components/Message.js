import React from 'react';

function Message({ children }) {
    return (
        <div class="alert alert-danger" role="alert">
            {children}
        </div>
    );
}

export default Message;