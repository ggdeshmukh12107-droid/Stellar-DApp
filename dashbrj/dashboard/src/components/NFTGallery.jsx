import React from "react";

const nfts = [
  { id: 1, name: "Recycle Badge #001", img: "https://via.placeholder.com/120" },
  { id: 2, name: "Green Hero #045", img: "https://via.placeholder.com/120" },
];

function NFTGallery() {
  return (
    <section className="section-card">
      <h2>Earned NFTs / Certificates</h2>
      <div className="nft-gallery">
        {nfts.map((nft) => (
          <div className="nft-card" key={nft.id}>
            <img src={nft.img} alt={nft.name} />
            <p>{nft.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NFTGallery;
