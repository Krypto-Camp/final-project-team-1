// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Market is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    // uint256 listingPrice = 1 ether; // 上架費用

    struct MarketItem {
        uint256 itemId;
        address nftContract; // NFT合約地址
        uint256 tokenId; // NFT ID
        address payable lender; // 出租方
        address payable renter; // 租借方
        uint256 price; // 出租金額
        uint256 deposit; // 押金
        uint256 validTime; // 出租時間
    }

    // mapping(string => Item) items;
    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address lender,
        address renter,
        uint256 price,
        uint256 deposit,
        uint256 validTime
    );

    // 上架
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 deposit,
        uint256 validTime
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            deposit,
            validTime
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            deposit,
            validTime
        );
    }

    // 租
    function rentMarketItem(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 deposit = idToMarketItem[itemId].deposit;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == price + deposit,
            "Please submit the asking price in order to complete the purchase"
        );

        payable(owner).transfer(deposit);
        idToMarketItem[itemId].lender.transfer(price);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        idToMarketItem[itemId].renter = payable(msg.sender);
        _itemsSold.increment();
    }

    // 歸還
    // function returnMarketItem() public {}

    function getMarketItem(uint256 marketItemId)
        public
        view
        returns (MarketItem memory)
    {
        return idToMarketItem[marketItemId];
    }

    // 首頁所有可租賃商品
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].renter == address(0)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // 個人頁：上架商品
    function fetchMyMarketItems() public pure returns (string memory) {
        return "upcoming";
    }

    // 個人頁：租賃中商品
    function fetchMyRentingItems() public pure returns (string memory) {
        return "upcoming";
    }
}
