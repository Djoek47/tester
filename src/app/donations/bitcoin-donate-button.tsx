"use client";

import Image from 'next/image';

const BitcoinDonateButton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <a 
        href="https://www.blockonomics.co/payment_request?uid=0762a7e0c36743e5"  // Add the proper donation link here
        className="blockoPayBtn" 
        data-toggle="modal" 
        data-uid="0762a7e0c36743e5"
      >
        <Image 
          width={160} 
          height={160} 
          src="https://www.blockonomics.co/img/pay_with_bitcoin_medium.png"
          alt="Pay with Bitcoin"
        />
      </a>
    </div>
  );
};

export default BitcoinDonateButton;
