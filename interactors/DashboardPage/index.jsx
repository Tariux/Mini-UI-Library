import React from 'react';

class DashboardInteractor {
    constructor(share) {
        this.SamplePackageModule = share.SamplePackageModule
        this.UserProfileModule = share.UserProfileModule
    }
    render() {
        return (<div><h1>This is Dashboard {this.SamplePackageModule.sample()}</h1></div>)
    }
}
export const DashboardPage = DashboardInteractor;
