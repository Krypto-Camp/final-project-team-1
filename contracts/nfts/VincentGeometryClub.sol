// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VincentGeometryClub is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {

    using SafeMath for uint;
    using Counters for Counters.Counter;

    uint public MAX_SUPPLY; // 最大提供量：333
    uint public START_TIMESTAMP; // 開始發售時間：0（沒用到）
    uint public OWNER_HOLDING; // 項目方預先 Mint：15
    uint public MAX_HOLDING_BALANCE; // 每個地址的最大持有 Token 量：10
    uint public MINT_PRICE = 0.008 ether; // 0.008 ETH
    string private _baseTokenURI; // URI：ipfs://QmYhcfRgAbvuAMByxRXoTXyqebUdcsbY9xbLpqtfjWkjpa/
    
    // constant：宣告後就不能再更改
    uint public constant MAX_PURCHASE = 3;

    Counters.Counter private _tokenIds;

    constructor(
        uint _maxSupply, 
        uint _startTimeStamp, 
        uint _setHolding, 
        uint _maxHoldingBalance,
        string memory _setBaseTokenURI
    ) ERC721("Vincent Geometry Club", "VGClub") {

        MAX_SUPPLY = _maxSupply;
        START_TIMESTAMP = _startTimeStamp;
        OWNER_HOLDING = _setHolding;
        MAX_HOLDING_BALANCE = _maxHoldingBalance;

        // 取得目前 Token 提供量，mint 時帶入 token ID
        _baseTokenURI = _setBaseTokenURI;

        uint i;
        for (i = 0; i < OWNER_HOLDING; i++) {
            _tokenIds.increment();
            _safeMint(msg.sender, _tokenIds.current());
            _setTokenURI(
                _tokenIds.current(), string(abi.encodePacked(Strings.toString(_tokenIds.current()), ".json"))
            );
        }
    }

    // string(abi.encodePacked(_baseTokenURI, Strings.toString(_tokenIds.current()), ".json"))
    // 在 etherscan 輸入 price 和 _purchaseNumber
    function mintGeometry(
        uint _purchaseQuantity
    ) public payable {
        require(msg.sender != address(0), "Who are you !?");
        require(msg.value == MINT_PRICE * _purchaseQuantity, "Your cost was incorrect.");
        require(totalSupply() + _purchaseQuantity < MAX_SUPPLY, "Above the max supply.");
        require(_purchaseQuantity <= MAX_PURCHASE, "Above the max purchase quantity per tx.");
        require(balanceOf(msg.sender) < MAX_HOLDING_BALANCE + _purchaseQuantity, "Above the max holding quantity.");
        uint i;
        for (i = 0; i < _purchaseQuantity; i++) {
            _tokenIds.increment();
            _safeMint(msg.sender, _tokenIds.current());
            _setTokenURI(
                _tokenIds.current(), string(abi.encodePacked(Strings.toString(_tokenIds.current()), ".json"))
            );
        }
    }

    function _baseURI() internal view virtual override returns (string memory)  {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function setMintPrice(uint _mintPrice) external onlyOwner {
        MINT_PRICE = _mintPrice;
    }

    function setMaxSupply(uint _maxSupply) external onlyOwner {
        require(_maxSupply < MAX_SUPPLY, "No No No~");
        MAX_SUPPLY = _maxSupply;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from, 
        address to, 
        uint256 tokenId
    ) internal whenNotPaused override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
