import { AptosClient, Types } from 'aptos';

const aptosClient = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

export const getUserBalance = async (userAddress) => {
  const resource = await aptosClient.getAccountResource(
    userAddress,
    '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
  );
  const balance = resource.data.coin.value; // The balance value from the coin store
  return balance;
};
