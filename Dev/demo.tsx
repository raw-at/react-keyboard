import * as React from 'react';
import TextField from 'material-ui/TextField';
import { Keyboard, InputHandler } from './../src/index';
import { extendedKeyboard } from './../src/layouts';
import axios from 'axios';

export interface DemoState {
    value?: string;
};

export interface TextEnterTarget {
    value?: string;
};

export interface TextEnterEvent {
    target: TextEnterTarget;
};

export default class Demo extends React.Component<{}, DemoState> {
    private _onInput: InputHandler;
    private _onInputChange: InputHandler;

    private _handleInput(input: string): void {
        this.setState({ value: input });
    }

    private _handleInputChange(value: string): void {
        console.warn(`change: ${value}`);
    }

    public constructor() {
        super();
        this.state = { value: '' };
        this._onInput = this._handleInput.bind(this);
        this._onInputChange = this._handleInputChange.bind(this);
    }

    public componentDidMount(): void {
        setTimeout(() => this.setState({ value: '' }), 1000);
    }
    public componentDidUpdate():void {
      console.log(this.state.value)
      axios.post("https://usermessage-6fa04.firebaseio.com/messages.json",{"message":this.state.value}).then(response=>{
        console.log(response)
      })
    }

    public render(): JSX.Element {
        const { state, _onInput, _onInputChange } = this;
        const { value } = state;
        const textField: JSX.Element = (

            <TextField
                id="field"
                value={value}
                style={{ width: 200, height: 60 }}
                floatingLabelText="Click for a Keyboard" />
        );
        const heading:JSX.Element = (
          <h1>StressGo Keyboard</h1>
        )

        return (
                <div style={{"position":"relative","top":"200px","left":"50",}}>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css"/>
                    {heading}
                    <Keyboard
                        automatic
                        textField={textField}
                        onInput={_onInput}
                        onInputValueChange={_onInputChange}
                        keyboardKeyHeight={60}
                        keyboardKeySymbolSize={30}
                        layouts={[extendedKeyboard]}
                        disableEffects
                     />
                </div>
        );
    }
};
