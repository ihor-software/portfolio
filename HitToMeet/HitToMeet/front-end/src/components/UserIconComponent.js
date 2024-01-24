import React, { Component } from 'react';

class UserIcon extends Component {
    render() {
        return (
            <div className="row userIconItem">
                <div className="col-10">
                    <p className="text-center">Ник</p>
                    <div className="row">
                        <div className="col-6">
                            <p className="text-center"><span className="fa fa-star fa-lg"></span> 515</p>
                        </div>
                        <div className="col-6">
                            <p className="text-center"><span className="fa fa-diamond fa-lg"></span> 101</p>
                        </div>
                    </div>
                    
                </div>
                <div className="col-2">
                    <img src="assets/images/user-avatar1.png" width="58" height="58" className="mt-2"></img>
                </div>
            </div>
        );
    }
}

export default UserIcon;