"use client"

import Image from 'next/image';

const BitcoinDonateButton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <a 
        href="" 
        className="blockoPayBtn" 
        data-toggle="modal" 
        data-uid="0762a7e0c36743e5"
      >
        <Image 
          width={160}
          height={80}
          src="https://www.blockonomics.com/img/pay_with_bitcoin_medium.png"
          alt="Pay with Bitcoin"
        />
      </a>
    </div>
  );
};

export default BitcoinDonateButton;
