// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTVerse is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("NFTVerse", "NFTV") Ownable() {}

    function mintNFT(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Required override for ERC721URIStorage
    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId;
    }
}