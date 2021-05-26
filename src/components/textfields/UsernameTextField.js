import React from "react";

function InputTextField(props){
    return <input
        type="text"
        className='form-control'
        placeholder={"Enter what you thing..."}
        onChange={props.handleChange}
    />
}