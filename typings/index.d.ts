interface NFTObject {
  image_url?: string;
  collection?: Collection;
  name?: string;
  token_id?: number;
  asset_contract?:AssetObject;
}

interface AssetObject {
  address: string;
}

interface Collection {
  name: string;
}
