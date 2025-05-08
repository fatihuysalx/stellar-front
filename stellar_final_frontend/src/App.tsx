import { useState } from 'react';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [transferTarget, setTransferTarget] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const [freezeTarget, setFreezeTarget] = useState('');
  const [frozenList, setFrozenList] = useState<string[]>([]);
  const [burnAmount, setBurnAmount] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  const [addressA, setAddressA] = useState('');
  const [addressB, setAddressB] = useState('');
  const [tokenA, setTokenA] = useState('');
  const [tokenB, setTokenB] = useState('');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [minAForB, setMinAForB] = useState('');
  const [minBForA, setMinBForA] = useState('');

  const dummyTxHistory = [
    "Swap: A <-> B (100 TOKEN-A <-> 250 TOKEN-B)",
    "Mint: +1000 TOKEN to A",
    "Burn: -100 TOKEN from A",
    "Freeze: Account B",
    "Transfer: A → C (50 TOKEN)"
  ];

  const connectWallet = () => {
    setWalletAddress('GDRXDUMMYWALLET123456789');
    setWalletConnected(true);
    setBalance(1000);
  };

  const simulateDelay = (callback: () => void) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, 1500);
  };

  const parseAmount = (value: string): number | null => {
    const number = parseFloat(value.replace(',', '.'));
    return isNaN(number) ? null : Math.floor(number);
  };

  const handleTransfer = () => {
    const amt = parseAmount(transferAmount);
    if (amt === null) return alert('Geçerli bir sayı giriniz.');
    if (balance !== null && amt > balance) {
      alert('Yetersiz bakiye!');
      return;
    }
    simulateDelay(() => {
      if (balance !== null) setBalance((prev) => (prev ?? 0) - amt);
      alert(`Başarıyla ${transferTarget} adresine ${amt} TOKEN gönderildi!`);
    });
  };

  const handleFreeze = () => {
    simulateDelay(() => {
      setFrozenList((prev) => [...prev, freezeTarget]);
      alert(`Freezing account: ${freezeTarget}`);
    });
  };

  const handleUnfreeze = () => {
    simulateDelay(() => {
      setFrozenList((prev) => prev.filter(addr => addr !== freezeTarget));
      alert(`Unfreezing account: ${freezeTarget}`);
    });
  };

  const handleBurn = () => {
    const amt = parseAmount(burnAmount);
    if (amt === null) return alert('Geçerli bir sayı giriniz.');
    if (balance !== null && amt > balance) {
      alert('Yetersiz bakiye!');
      return;
    }
    simulateDelay(() => {
      if (balance !== null) setBalance((prev) => (prev ?? 0) - amt);
      alert(`${amt} TOKEN yakıldı.`);
    });
  };

  const handleMint = () => {
    const amt = parseAmount(mintAmount);
    if (amt === null) return alert('Geçerli bir sayı giriniz.');
    simulateDelay(() => {
      if (balance !== null) setBalance((prev) => (prev ?? 0) + amt);
      alert(`${amt} TOKEN mintlendi.`);
    });
  };

  const handleSwap = () => {
    const a = parseAmount(amountA);
    const b = parseAmount(amountB);
    if (a === null || b === null) return alert('Tutarları düzgün giriniz.');
    simulateDelay(() => {
      alert(`Swapped:\n${a} ${tokenA} from ${addressA} → ${addressB}\n${b} ${tokenB} from ${addressB} → ${addressA}`);
    });
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Token dApp (Mock)</h1>
        {!walletConnected ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <span>Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        )}
      </div>

      {walletConnected && (
        <>
          <div className="card">
            <h2>Balance</h2>
            <p>{balance?.toLocaleString()} TOKEN</p>
          </div>

          <div className="card">
            <h2>Transfer</h2>
            <input placeholder="Recipient Address" value={transferTarget} onChange={(e) => setTransferTarget(e.target.value)} />
            <input placeholder="Amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
            <button onClick={handleTransfer} disabled={loading}>Transfer {loading && <span className="loader"></span>}</button>
          </div>

          <div className="card">
            <h2>Mint</h2>
            <input placeholder="Amount" value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} />
            <button onClick={handleMint} disabled={loading}>Mint {loading && <span className="loader"></span>}</button>
          </div>

          <div className="card">
            <h2>Burn</h2>
            <input placeholder="Amount" value={burnAmount} onChange={(e) => setBurnAmount(e.target.value)} />
            <button onClick={handleBurn} disabled={loading}>Burn {loading && <span className="loader"></span>}</button>
          </div>

          <div className="card">
            <h2>Freeze / Unfreeze</h2>
            <input placeholder="Target Address" value={freezeTarget} onChange={(e) => setFreezeTarget(e.target.value)} />
            <button onClick={handleFreeze} disabled={loading}>Freeze</button>
            <button onClick={handleUnfreeze} disabled={loading}>Unfreeze</button>
            {frozenList.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Frozen Accounts:</strong>
                <ul>
                  {frozenList.map((addr, idx) => <li key={idx}>{addr}</li>)}
                </ul>
              </div>
            )}
          </div>

          <div className="card">
            <h2>Atomic Swap</h2>
            <input placeholder="Address A" value={addressA} onChange={(e) => setAddressA(e.target.value)} />
            <input placeholder="Token A Address" value={tokenA} onChange={(e) => setTokenA(e.target.value)} />
            <input placeholder="Amount A" value={amountA} onChange={(e) => setAmountA(e.target.value)} />
            <input placeholder="Min B for A" value={minBForA} onChange={(e) => setMinBForA(e.target.value)} />
            <input placeholder="Address B" value={addressB} onChange={(e) => setAddressB(e.target.value)} />
            <input placeholder="Token B Address" value={tokenB} onChange={(e) => setTokenB(e.target.value)} />
            <input placeholder="Amount B" value={amountB} onChange={(e) => setAmountB(e.target.value)} />
            <input placeholder="Min A for B" value={minAForB} onChange={(e) => setMinAForB(e.target.value)} />
            <button onClick={handleSwap} disabled={loading}>Swap {loading && <span className="loader"></span>}</button>
          </div>

          <div className="card">
            <h2>Transaction History</h2>
            <ul>
              {dummyTxHistory.map((tx, idx) => <li key={idx}>• {tx}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
