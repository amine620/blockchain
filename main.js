const { SHA256 } = require("crypto-js")

class Block{
    constructor(index,timestamp,data,previousHash=""){
           this.index=index
           this.timestamp=timestamp
           this.data=data
           this.previousHash=previousHash
           this.hash=this.calculateHash()
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString()
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()]
    }

    createGenesisBlock(){
        return new Block(0,"04/02/2022","Genises block" , "0")
    }
    getLatestBlock(){
         return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
         newBlock.previousHash=this.getLatestBlock().hash
         newBlock.hash=newBlock.calculateHash()
         this.chain.push(newBlock)
    }
   
}

let AmineCoin=new Blockchain()

AmineCoin.addBlock(new Block(1,"03/03/2022",{amount:10}))
AmineCoin.addBlock(new Block(2,"04/03/2022",{amount:10}))
AmineCoin.addBlock(new Block(3,"05/03/2022",{amount:10}))

console.log(JSON.stringify(AmineCoin,null,4))

// console.log("is blockchain valid ?"+AmineCoin.isChainValid());