import React from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

class RadioButtonGroup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div> 
            <ToggleButtonGroup type={this.props.type} name="selections" defaultValue={this.props.default} onChange={(e)=>this.props.handleClick(e)}>
                { this.props.selections.map((d, i) => { return <ToggleButton key={i} value={d}>{d}</ToggleButton> } ) } 
            </ToggleButtonGroup>
        </div>)
    }
}

export default RadioButtonGroup