const bankOne = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Heater-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Heater-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Heater-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Heater-4',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Clap',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: "Kick-n'-Hat",
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
	},
];

const bankTwo = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Chord-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Chord-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Chord-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Shaker',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: 'Punchy-Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Side-Stick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Snare',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
	},
];

class DrumItem extends React.Component {
    constructor(props) {
        super(props);

        this.playSound = this.playSound.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillMount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.keyCode === this.props.keyCode) {
            this.playSound();
        }
    }

    playSound = () => {
        if (this.props.power) {
            const sound = document.getElementById(this.props.keyTrigger);
            sound.volume = this.props.volume / 100;
            sound.play();

            this.props.displayUpdate(this.props.id);
        }
    };

    render() { 
        return (
            <div className="drum-pad__btn"
                id={this.props.id}
                onClick={this.playSound}
            >
                {this.props.keyTrigger}
                <audio
                    src={this.props.url}
                    id={this.props.keyTrigger}
                />
            </div>
        );
    }
}

class Drums extends React.Component {
    render() {
        let sounds = this.props.bank;

        return (
            <div className="drum-btn-container">
                {sounds.map((x) => {
                    return (
                        <DrumItem
                            key={x.id}
                            id={x.id}
                            url={x.url}
                            keyCode={x.keyCode}
                            keyTrigger={x.keyTrigger}
                            power={this.props.power}
                            volume={this.props.volume}
                            displayUpdate={this.props.displayUpdate}
                        />
                    );
                })}
            </div>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            power: true,
            bank: bankOne,
            volume: 100,
            display: "Power: ON",
            bankText: 'Beats'
        };
    }

    displayUpdate = (e) => {
        this.setState({ display: e });
    }

    displayPower = () => {
        this.setState({ power: !this.state.power });

        if (this.state.power) {
            this.displayUpdate('Power: OFF');
        } else {
            this.displayUpdate('Power: ON');
        }
    };

    changeBank = () => {
        if (this.state.power) {
            if(this.state.bank === bankOne) {
                this.setState({ bank: bankTwo });
                this.setState({ bankText: 'Misc'});
            } else {
                this.setState({ bank: bankOne });
                this.setState({ bankText: 'Beats'});
            }
        }
    };

    handleVolume = (e) => {
        if (this.state.power) {
            this.setState({ volume: e.target.value });
        }
    };

    render() {
        return (
            <div className="App">
                <div className="drum-pad">
                    <div className="pad">
                        <Drums
                            bank={this.state.bank}
                            power={this.state.power}
                            volume={this.state.volume}
                            displayUpdate={this.displayUpdate}
                        />
                    </div>
                    <div className="display-buttons">
                        <div className="display">
                            {this.state.display}
                        </div>
                        <div className="bank-change-btn">
                            <button onClick={this.changeBank}>{this.state.bankText}</button>
                        </div>
                        <div className="power-btn">
                            <button onClick={this.displayPower}>ON / OFF</button>
                        </div>
                        <div className="volume-wrapper">
                            <input
                                className="volume-slider"
                                type="range"
                                min="0" max="100" step="1"
                                value={this.state.volume}
                                onChange={this.handleVolume}
                            />
                            <div className="volume-display">
                                {this.state.volume}
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Created By Almardan Isaev.</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));