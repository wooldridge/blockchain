'use strict';

const blockchain = require('../blockchain'),
      should     = require('chai').should();

describe('new_transaction', function() {
  it('should create a new transaction', function() {
    let t = blockchain.new_transaction('alice', 'bob', 123);
    blockchain.current_transactions.length.should.equal(1);
    //console.log(blockchain);
  });
});

describe('new_block', function() {
  it('should create a new block', function() {
    let b = blockchain.new_block(321);
    blockchain.chain.length.should.equal(1);
    //console.log(blockchain);
  });
});

describe.skip('last_block', function() {
  it('should get the last block', function() {
    let lb = blockchain.last_block();
    //console.log(lb);
  });
});

describe('hash', function() {
  it('should perform a hash', function() {
    let h = blockchain.hash({foo: 'bar'});
    h.should.be.a('string');
    //console.log(h);
  });
});

describe('proof_of_work', function() {
  it('should perform a proof of work', function() {
    let p = blockchain.proof_of_work(999);
    p.should.be.a('number');
    //console.log(p);
  });
});
