import {
  PublicKey,
  Keypair,
  Transaction
} from "@solana/web3.js";
import {Wallet} from "@project-serum/anchor";

export default class MyWallet implements Wallet {

  constructor(readonly payer: Keypair) {
      this.payer = payer
  }

  async signTransaction(tx: Transaction): Promise<Transaction> {
      tx.partialSign(this.payer);
      return tx;
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
      return txs.map((t) => {
          t.partialSign(this.payer);
          return t;
      });
  }

  get publicKey(): PublicKey {
      return this.payer.publicKey;
  }
}