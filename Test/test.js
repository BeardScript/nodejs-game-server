const should = require('chai').should();
const expect = require('chai').expect;
const io = require('socket.io-client');

const socketUrl = 'http://localhost:3000';

const options = {  
  transports: ['websocket'],
  'force new connection': true
};

const ngs = require('../userMock/main').ngs;

describe('Server', function () {
	let playerRef = {};
	let clientRef = {};

	it('should send handshake', function(done){  
		clientRef = io.connect(socketUrl, options);
		
		clientRef.on('connected', function(){
			done();
		});
  	});

	it('should create player on login', function(done){
		clientRef.emit('login');

		clientRef.on('loggedIn', function(data){
			playerRef = data;
			data.should.not.equal(undefined);
			done();
		});
  	});

	it('should add created player to lobby', function(done){
		ngs.getPlayers()[0].should.deep.equal(playerRef);
		done();
  	});

  	it('should have only one player', function(done){
		ngs.playersCount.should.equal(1);
		done();
  	});

	it('should remove player from lobby on disconnect', function(done){
		clientRef.disconnect();

		setTimeout(function () 
		{
			expect(ngs.getPlayers()[0]).to.equal(undefined);
			done();
		}, 20);
  	});

  	playerRef = {};
	clientRef = {};

  	it('should have no players', function(done){
		ngs.playersCount.should.equal(0);
		done();
  	});

	it('should add next player to empty position', function(done){  
		const client = io.connect(socketUrl, options);
		
		client.on('connected', function(){
			client.emit('login');
		});

		client.on('loggedIn', function(data){
			ngs.getPlayers()[0].should.deep.equal(data);
			done();
		});
  	});

  // 	it('should create user defined game', function(done){
		// done();
  // 	});

  // 	it('should have only one game', function(done){
		// done();
  // 	});

  // 	it('should delete user defined game if allowed', function(done){
		// done();
  // 	});

  // 	it('should have no games', function(done){
		// done();
  // 	});

  // 	it('should let player join game if allowed', function(done){
		// done();
  // 	});

  // 	it('should let player create matchmaking game', function(done){
		// done();
  // 	});

  // 	it('should let player join matchmaking game', function(done){
		// done();
  // 	});
});