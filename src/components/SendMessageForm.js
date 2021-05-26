import React, {Component} from 'react'

class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.handleCommentsChange = this.handleCommentsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            message: ''
        }
    }

    handleCommentsChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.message) {
            alert(`You didn't enter anything!`)
        } else {
            this.props.sendMessage(this.state.message);
        }
        this.setState({message: ""});
    }

    render() {
        const {message} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={"row"}>
                    <div className={"col-9"}>
                        <textarea className={"col-12 type-message-style"}
                          value={message}
                          placeholder={"Enter what you think..."}
                          onChange={this.handleCommentsChange}/>
                    </div>
                    <div className={"col-3 send-mesage-button-position"}>
                        <button className={"col-12 btn send-mesage-button-style"} type="submit">Send</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default SendMessageForm