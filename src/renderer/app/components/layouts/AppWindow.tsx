import React from 'react';

function AppWindow(props: { children: React.ReactNode }) {
    return (
        <div className="font-varela-round min-h-screen flex flex-col  bg-white dark:bg-darkprimary">
            {props.children}
        </div>
    );
}

export default AppWindow;