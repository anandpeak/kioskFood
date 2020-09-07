import React from 'react';
import PropTypes from 'prop-types';

import TextareaAutosize  from 'react-autosize-textarea'

export default class EditableLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: this.props.isEditing || false,
            text: this.props.text || "",
            ref: React.createRef()
        };

        this._handleFocus = this._handleFocus.bind(this);
        this._handleEnterPress = this._handleEnterPress.bind(this);
    }

    componentDidUpdate() {
        if (this.state.text !== this.props.text && !this.state.isEditing) {
            this.setState({
                text: this.props.text || ""
            })
        }
    }

    _handleFocus() {
        if (this.state.isEditing) {
            if (typeof this.props.onFocusOut === 'function') {
                this.props.onFocusOut(this.state.text);
            }
        }
        else {
            if (typeof this.props.onFocus === 'function') {
                this.props.onFocus(this.state.text);
            }
        }

        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    _handleEnterPress(event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            this.setState({
                isEditing: false,
                text: this.textInput.defaultValue,
            });
            this.props.onFocusOut(this.textInput.defaultValue);
        }
    }

    render() {
        if (this.state.isEditing) {

            return <TextareaAutosize
                className={this.props.inputClassName}
                rows={this.props.rows}
                style={this.props.style}
                value={this.state.text}
                ref={this.state.ref}
                onChange={e => this.setState({ text: e.target.value })}
                placeholder={this.props.inputPlaceHolder}
                onBlur={this._handleFocus}
                tabIndex={this.props.inputTabIndex}
                autoFocus
                onResize={(e) => {}}
            />
        }

        let textStr = this.state.text;
        textStr = textStr.trim();

        return <TextareaAutosize
            className={textStr.length > 0 ? this.props.focusOutClassName : this.props.inputClassName}
            rows={this.props.rows}
            style={this.props.style}
            value={this.state.text}
            onChange={null}
            placeholder={this.props.inputPlaceHolder}
            onClick={this._handleFocus}
            onResize={(e) => {}}
        />
    }
}

EditableLabel.propTypes = {
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,

    focusOutClassName: PropTypes.string,

    inputPlaceHolder: PropTypes.string,
    inputTabIndex: PropTypes.number,
    inputWidth: PropTypes.string,
    inputHeight: PropTypes.string,
    inputFontSize: PropTypes.string,
    inputFontWeight: PropTypes.string,
    inputClassName: PropTypes.string,
    inputBorderWidth: PropTypes.string,
    inputRows: PropTypes.number || 3,

    style: PropTypes.object,

    onFocus: PropTypes.func,
    onFocusOut: PropTypes.func,
    onEnterPress: PropTypes.func
};