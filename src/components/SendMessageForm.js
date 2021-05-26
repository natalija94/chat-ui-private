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

    handleSubmit(event) {
        if (!this.state.message) {
            alert(`You didn't enter anything!`)
        } else {
            this.props.sendMessage(this.state.message);
        }
        event.preventDefault()

    }

    render() {
        const {comments} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={"row"}>
                        <div className={"col-lg-9"}>
                    <textarea  className={"col-lg-12 type-message-style"}
                              value={comments}
                              placeholder={"Enter what you think..."}
                              onChange={this.handleCommentsChange}/>
                        </div>
                        <div className={"col-lg-3 send-mesage-button-position"}>
                            <button className={"col-lg-12 btn send-mesage-button-style"} type="submit">Submit</button>
                        </div>
                    </div>
            </form>
        )
    }
}

export default SendMessageForm