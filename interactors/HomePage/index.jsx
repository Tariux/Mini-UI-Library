// Start of Selection
import React from 'react';

class HomeInteractor {

    constructor(share) {
        this.share = share
        this.SamplePackageModule = share.SamplePackageModule

        console.log(share);
    }
    clickEvent() {
        alert("meow")
    }

    render() {
        return (<div><h1>This is Home {this.SamplePackageModule.sample()}</h1></div>)
        
    }
}
export const HomePage = HomeInteractor;
