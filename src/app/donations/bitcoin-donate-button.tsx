"use client"

const BitcoinDonateButton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <a 
        href="" 
        className="blockoPayBtn" 
        data-toggle="modal" 
        data-uid="0762a7e0c36743e5"
      >
        <img 
          width="160" 
          src="https://www.blockonomics.co/img/pay_with_bitcoin_medium.png"
          alt="Pay with Bitcoin"
        />
      </a>
    </div>
  );
};

export default BitcoinDonateButton;
