import Link from 'next/link';

export default function Cancel() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Payment Cancelled</h1>
      <p>You can go back and try again anytime.</p>
      <Link href="/">
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Return to Shop
        </button>
      </Link>
    </div>
  );
}
