import React, {Component} from 'react';

import {Dropdown} from 'semantic-ui-react'

export class NDropdown extends Dropdown {
    constructor(props) {
        super(props)
        this.returnData = false
    }

    render = () => {
        let props = this.props;
        return (
            <Dropdown
                {...props}
                onClose={(e, data) => {
                    if (!this.returnData && data.value) {
                        props.onChange(e, data);
                    }
                }}
                onChange={(e, data) => {
                    if (e instanceof KeyboardEvent) {
                        // keyboard pressed
                        // check is enter pressed
                        if (e.code && e.code.toLowerCase() === 'enter') {
                            this.returnData = true;
                            // this.setState({
                            //     returnValue: true
                            // })
                            return props.onChange(e, data);
                        } else {
                            // maybe arrow clicked
                            // just change selected value
                            this.returnData = false;
                            // this.setState({
                            //     returnValue: false
                            // })
                        }
                    } else {
                        this.returnData = true;
                        return props.onChange(e, data);
                    }
                }}
            />
        )
    }
}