import React, { Component } from 'react';
import './App.css';
import YouTube from 'react-youtube';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

class App extends Component {

  playBackHandler = (event, action) => {
      // access to player in all event handlers via event.target
      const socket = io.connect('http://localhost:8080');
      socket.on('play', () => {
        event.target.playVideo();
      });
      socket.on('pause', () => {
        event.target.pauseVideo();
      });

      if(action === 'play'){
        socket.emit('play');
      }
      if(action === 'pause'){
        socket.emit('pause');
      }
  }

  render() {
    console.log("hhhhh");
    const opts = {
      height: '390',
      width: '640'
    };
    return (
      <SocketProvider>
        <div className="App" onMouseOver={this.ninja}>
          <YouTube
            id="youtube-player"
            videoId="-VsmF9m_Nt8"
            opts={opts}
            onPlay={(e) => {this.playBackHandler(e, 'play')}}
            onPause={(e) => {this.playBackHandler(e, 'pause')}}
            onReady={this.playBackHandler}
          />
        </div>
      </SocketProvider>
    );
  }
}


export default App;
