// Start of Selection
import React from 'react';

class HomeInteractor {

    clickEvent() {
        alert("meow")
    }

    render() {
        return (<div><h1>This is Home</h1></div>)
        
    }
}
export const HomePage = new HomeInteractor();
