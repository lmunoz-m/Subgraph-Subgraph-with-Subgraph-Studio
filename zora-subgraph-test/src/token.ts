import {
  TokenURIUpdated as TokenURIUpdatedEvent,
  Transfer as TransferEvent,
  Token as TokenContract
} from "../generated/Token/Token"
import {
  Token, User
} from '../generated/schema'

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString()); // get the token
 
  if (!token) { // if the token is not found, create a new token
    token = new Token(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;
    token.createdAtTimestamp = event.block.timestamp;

    let tokenContract = TokenContract.bind(event.address); // get the token contract
    token.contentURI = tokenContract.tokenURI(event.params.tokenId); // get the token's content URI
    token.metadataURI = tokenContract.tokenMetadataURI(event.params.tokenId); // get the token's metadata URI
  }
  token.owner = event.params.to.toHexString(); // set the new owner
  token.save(); // save the token

  let user = User.load(event.params.to.toHexString()); // get the user 
  if (!user) { // if the user is not found, create a new user
    user = new User(event.params.to.toHexString());
    user.save();
  }
}

export function handleTokenURIUpdated(event:TokenURIUpdatedEvent): void{
  let token = Token.load(event.params._tokenId.toString()); // get the token
  if (!token) { // if the token is not found, create a new token
    token = new Token(event.params._tokenId.toString());
    token.contentURI= event.params._uri; // set the new content URI
  }
  token.contentURI= event.params._uri; // set the new content URI
  token.save(); // save the token
 }
                    