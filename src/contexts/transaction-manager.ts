const TRANSACTION_STORAGE_KEY_PREFIX = 'deadbeef.txs';

interface Transaction {
    nonce: string;
    scope: string;
    audience: string;
    appState?: any;
    code_verifier: string;
    redirect_uri?: string;
    organizationId?: string;
    state?: string;
  }
  
  export class TransactionManager {
    private transaction: Transaction | undefined;
    private storageKey: string;
  
    constructor(private storage: Storage, private clientId: string) {
      this.storageKey = `${TRANSACTION_STORAGE_KEY_PREFIX}.${this.clientId}`;
      this.transaction = JSON.parse(this.storage.getItem(this.storageKey) || "{}");
    }
  
    public create(transaction: Transaction) {
      this.transaction = transaction;
  
      this.storage.setItem(this.storageKey, JSON.stringify(transaction));
    }
  
    public get(): Transaction | undefined {
      return this.transaction;
    }
  
    public remove() {
      delete this.transaction;
      this.storage.removeItem(this.storageKey);
    }
  }
  