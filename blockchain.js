'use strict';

const crypto = require('crypto');

function Blockchain() {
  if (!(this instanceof Blockchain)) {
    return new Blockchain();
  }
  this.chain = [];
  this.current_transactions = [];
}

/**
 *  Creates a new transaction to go into the next mined Block
 *  @param {string} sender - Address of the sender
 *  @param {string} recipient - Address of the recipient
 *  @param {number} amount - Amount
 *  @returns {number} The index of the Block that will hold this transaction
 */
Blockchain.prototype.new_transaction = function new_transaction(sender, recipient, amount) {
  this.current_transactions.push({
    sender: sender,
    recipient: recipient,
    amount: amount
  })
  // let lb = this.last_block();
  // return lb['index'] + 1;
};

/**
 *  Create a new block in the Blockchain
 *  @param {number} proof
 *  @param {string} [previous_hash]
 *  @returns {object} New block
 */
Blockchain.prototype.new_block = function new_block(proof, previous_hash) {
  let d = new Date();
  let block = {
      index: this.chain.length + 1,
      timestamp: d.getTime(),
      transactions: this.current_transactions,
      proof: proof//,
      //previous_hash: previous_hash || this.hash(this.chain[chain.length - 1])
  }
  this.current_transactions = [];
  this.chain.push(block);
  return block;
};

Blockchain.prototype.last_block = function last_block() {
  return this.chain[chain.length - 1];
};

/**
 *  Creates a SHA-256 hash of a block
 *  @param {object} block - Block
 *  @returns {string} The hash
 */
Blockchain.prototype.hash = function hash(block) {
  let block_string = JSON.stringify(block);
  return crypto.createHash('sha256').update(block_string).digest('hex');
};

/**
 *  Simple proof-of-work algorithm
 *  - Find a number p' such that hash(pp') contains leading 4 zeroes,
 *  where p is the previous p'
 *  - p is the previous proof, and p' is the new proof
 *  @param {integer} last_proof - Previous proof
 *  @returns {integer} The new proof
 */
Blockchain.prototype.proof_of_work = function proof_of_work(last_proof) {
  let proof = 0;
  while (this.valid_proof(last_proof, proof) === false) {
    proof += 1;
  }
  return proof;
};

/**
 *  Validates the Proof:
 *  Does hash(last_proof, proof) contain 4 leading zeroes?
 *  @param {integer} last_proof - Previous proof
 *  @param {integer} proof - Current proof
 *  @returns {boolean} True or False
 */
Blockchain.prototype.valid_proof = function valid_proof(last_proof, proof) {
  let guess = last_proof.toString().concat(proof.toString());
  let guess_hash = crypto.createHash('sha256').update(guess).digest('hex');
  return guess_hash.substring(0, 4) === '0000';
};

module.exports = new Blockchain();
