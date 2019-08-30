import React from 'react';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.generateMeme = this.generateMeme.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    generateMeme(event) {
        event.preventDefault();

        const randomIndex = Math.floor( Math.random() * this.state.allMemeImgs.length);
        const randomUrl = this.state.allMemeImgs[randomIndex].url;

        this.setState({
            randomImg: randomUrl
        });
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data;

                this.setState({
                    allMemeImgs: memes
                })
            });
    }

    render() {
        return (
            <div>
                <form 
                    className="meme-form"
                    onSubmit={this.generateMeme}
                >
                    <input 
                        type="text" 
                        name="topText"
                        value={this.state.topText}
                        placeholder="Top text"
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="bottomText"
                        value={this.state.bottomText}
                        placeholder="Bottom text"
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;