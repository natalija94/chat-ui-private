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
                <div className={"row send-message-area-border"}>
                    <div className={"col-8"}>
                        <textarea className={"col-12 type-message-style"}
                                  value={message}
                                  placeholder={"Enter what you think..."}
                                  onChange={this.handleCommentsChange}/>
                    </div>
                    <div className={"col-3 send-mesage-button-position"}>
                        <button className={"col-12 btn send-mesage-button-style"} type="submit">Send</button>
                        {this.props.newMessageReceived &&
                        <div className={"col-12 send-mesage-button-position text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg">
                                <circle
                                    className={this.props.justSentOffensiveMessage && this.props.newMessageReceived ?
                                        "circle-alert text-center" : "circle-okay text-center"}
                                    cx="8" cy="8" r="8"/>
                            </svg>
                        </div>}
                    </div>
                </div>
            </form>
        )
    }
}

export default SendMessageForm